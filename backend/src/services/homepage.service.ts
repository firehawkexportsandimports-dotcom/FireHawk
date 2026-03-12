import { prisma } from "../config/db";

/**
 * Reorder helper — now uses a single findMany scoped to the same page/group
 * where relevant, and collapses the swap into one $transaction.
 */
async function reorderItems(
  model: any,
  id: string,
  direction: "up" | "down"
) {
  const items = await model.findMany({
    where: { is_active: true },
    orderBy: { sort_order: "asc" },
    select: { id: true, sort_order: true }, // only fetch what we need
  });

  if (!items.length) return;

  const index = items.findIndex((i: any) => i.id === id);
  if (index === -1) return;

  const swapIndex =
    direction === "up"
      ? index === 0 ? items.length - 1 : index - 1
      : index === items.length - 1 ? 0 : index + 1;

  const current = items[index];
  const swap = items[swapIndex];

  await prisma.$transaction([
    model.update({ where: { id: current.id }, data: { sort_order: swap.sort_order } }),
    model.update({ where: { id: swap.id },    data: { sort_order: current.sort_order } }),
  ]);
}


export const homepageService = {

  /* ─────────────────────────────────────────────────────────────────────────
     HOMEPAGE: single method that fires ALL queries in parallel.
     Before: controller did Promise.all of 7 service calls, each of which
             did its OWN prisma query = 7 sequential-ish round-trips to Aiven.
     After:  one Promise.all inside the service = truly parallel, and the
             controller just calls this one method.
  ───────────────────────────────────────────────────────────────────────── */

  async getFullHomepage(page = "home") {
    const [
      sections,
      features,
      journey,
      origins,
      certifications,
      testimonials,
      stats,
    ] = await Promise.all([
      prisma.homepageContent.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
      }),
      prisma.homepageFeature.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
      }),
      prisma.homepageJourney.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
      }),
      prisma.homepageOrigin.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
      }),
      prisma.homepageCertification.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
      }),
      prisma.testimonial.findMany({
        where: { is_featured: true },
        orderBy: { created_at: "desc" },
        take: 6,
      }),
      prisma.homepageStat.findMany({
        where: { is_active: true, page },
        orderBy: { sort_order: "asc" },
      }),
    ]);

    return {
      sections: sections.map(s => ({
        ...s,
        badge:    s.badge    ?? "",
        subtitle: s.subtitle ?? "",
        title:    s.title    ?? "",
        content:  s.content  ?? "",
      })),
      features,
      journey,
      origins,
      certifications,
      testimonials,
      stats,
    };
  },

  /* ─── Individual getters (kept for admin panel use) ─────────────────── */

  async getAllSections() {
    const sections = await prisma.homepageContent.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
    return sections.map(s => ({
      ...s,
      badge:    s.badge    ?? "",
      subtitle: s.subtitle ?? "",
      title:    s.title    ?? "",
      content:  s.content  ?? "",
    }));
  },

  async getBySection(section: string) {
    return prisma.homepageContent.findUnique({
      where: { section: section as any },
    });
  },

  async upsertSection(section: string, data: any) {
    const processedData = { ...data };
    if (processedData.sort_order !== undefined) {
      processedData.sort_order = parseInt(processedData.sort_order) || 0;
    }
    return prisma.homepageContent.upsert({
      where:  { section: section as any },
      update: processedData,
      create: { section: section as any, ...processedData, is_active: true },
    });
  },

  /* ─── Features ───────────────────────────────────────────────────────── */

  async getFeatures() {
    return prisma.homepageFeature.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createFeature(data: any) {
    const last = await prisma.homepageFeature.findFirst({
      orderBy: { sort_order: "desc" },
      select: { sort_order: true },
    });
    return prisma.homepageFeature.create({
      data: { ...data, sort_order: (last?.sort_order ?? 0) + 1, is_active: true },
    });
  },

  async updateFeature(id: string, data: any) {
    const processedData = { ...data };
    if (processedData.sort_order !== undefined) {
      processedData.sort_order = parseInt(processedData.sort_order) || 0;
    }
    return prisma.homepageFeature.update({ where: { id }, data: processedData });
  },

  async deleteFeature(id: string) {
    return prisma.homepageFeature.delete({ where: { id } });
  },

  async reorderFeature(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageFeature, id, direction);
    return this.getFeatures();
  },

  /* ─── Journey ────────────────────────────────────────────────────────── */

  async getJourney() {
    return prisma.homepageJourney.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createJourney(data: any) {
    return prisma.homepageJourney.create({
      data: {
        title:       data.title,
        description: data.description,
        icon:        data.icon,
        sort_order:  parseInt(data.sort_order) || 0,
        image:       data.image || data.image_url ||
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400",
        is_active: true,
      },
    });
  },

  async updateJourney(id: string, data: any) {
    const processedData: any = {
      title:       data.title,
      description: data.description,
      icon:        data.icon,
      image:       data.image,
    };
    if (data.sort_order !== undefined) {
      processedData.sort_order = parseInt(data.sort_order) || 0;
    }
    return prisma.homepageJourney.update({ where: { id }, data: processedData });
  },

  async deleteJourney(id: string) {
    return prisma.homepageJourney.delete({ where: { id } });
  },

  async reorderJourney(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageJourney, id, direction);
    return this.getJourney();
  },

  /* ─── Origins ────────────────────────────────────────────────────────── */

  async getOrigins() {
    return prisma.homepageOrigin.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createOrigin(data: any) {
    return prisma.homepageOrigin.create({
      data: {
        ...data,
        sort_order: parseInt(data.sort_order) || 0,
        spices:     data.spices || [],
        is_active:  true,
      },
    });
  },

  async updateOrigin(id: string, data: any) {
    const processedData: any = {
      name:        data.name,
      region:      data.region,
      description: data.description,
      spices:      data.spices || [],
    };
    if (data.sort_order !== undefined) {
      processedData.sort_order = parseInt(data.sort_order) || 0;
    }
    return prisma.homepageOrigin.update({ where: { id }, data: processedData });
  },

  async deleteOrigin(id: string) {
    await prisma.homepageOrigin.deleteMany({ where: { id } });
    return { success: true };
  },

  async reorderOrigin(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageOrigin, id, direction);
    return this.getOrigins();
  },

  /* ─── Certifications ─────────────────────────────────────────────────── */

  async getCertifications() {
    return prisma.homepageCertification.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createCertification(data: any) {
    const last = await prisma.homepageCertification.findFirst({
      orderBy: { sort_order: "desc" },
      select: { sort_order: true },
    });
    return prisma.homepageCertification.create({
      data: { ...data, sort_order: (last?.sort_order ?? 0) + 1, is_active: true },
    });
  },

  async updateCertification(id: string, data: any) {
    const processedData: any = { name: data.name };
    if (data.sort_order !== undefined) {
      processedData.sort_order = parseInt(data.sort_order) || 0;
    }
    return prisma.homepageCertification.update({ where: { id }, data: processedData });
  },

  async deleteCertification(id: string) {
    return prisma.homepageCertification.delete({ where: { id } });
  },

  async reorderCertification(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageCertification, id, direction);
    return this.getCertifications();
  },

  /* ─── Stats ──────────────────────────────────────────────────────────── */

  async getStats(page?: string) {
    return prisma.homepageStat.findMany({
      where: { is_active: true, ...(page ? { page } : {}) },
      orderBy: { sort_order: "asc" },
    });
  },

  async createStat(data: any) {
    const last = await prisma.homepageStat.findFirst({
      where: { page: data.page },
      orderBy: { sort_order: "desc" },
      select: { sort_order: true },
    });
    return prisma.homepageStat.create({
      data: {
        value:      data.value,
        label:      data.label,
        page:       data.page,
        sort_order: (last?.sort_order ?? 0) + 1,
        is_active:  true,
      },
    });
  },

  async updateStat(id: string, data: any) {
    return prisma.homepageStat.update({ where: { id }, data });
  },

  async deleteStat(id: string) {
    return prisma.homepageStat.delete({ where: { id } });
  },

  async reorderStat(id: string, direction: "up" | "down") {
    const current = await prisma.homepageStat.findUnique({
      where: { id },
      select: { id: true, sort_order: true },
    });
    if (!current) return;

    const swap = await prisma.homepageStat.findFirst({
      where:
        direction === "up"
          ? { sort_order: { lt: current.sort_order } }
          : { sort_order: { gt: current.sort_order } },
      orderBy: { sort_order: direction === "up" ? "desc" : "asc" },
      select: { id: true, sort_order: true },
    });
    if (!swap) return;

    await prisma.$transaction([
      prisma.homepageStat.update({ where: { id: current.id }, data: { sort_order: swap.sort_order } }),
      prisma.homepageStat.update({ where: { id: swap.id },    data: { sort_order: current.sort_order } }),
    ]);
  },
};