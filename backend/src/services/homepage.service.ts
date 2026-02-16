import {prisma} from "../config/db";


async function reorderItems(
  model: any,
  id: string,
  direction: "up" | "down"
) {
  const items = await model.findMany({
    where: { is_active: true },
    orderBy: { sort_order: "asc" },
  });

  if (!items.length) return;

  const index = items.findIndex((i: any) => i.id === id);
  if (index === -1) return;

  let swapIndex;

  if (direction === "up") {
    swapIndex = index === 0 ? items.length - 1 : index - 1;
  } else {
    swapIndex = index === items.length - 1 ? 0 : index + 1;
  }

  const current = items[index];
  const swap = items[swapIndex];

  // IMPORTANT: swap using actual values from DB order
  await prisma.$transaction([
    model.update({
      where: { id: current.id },
      data: { sort_order: swap.sort_order },
    }),
    model.update({
      where: { id: swap.id },
      data: { sort_order: current.sort_order },
    }),
  ]);
}


/* ======================================================
   HOMEPAGE SERVICE
   Firehawk Imports & Exports
====================================================== */

export const homepageService = {

  /* ======================================================
     HOMEPAGE SECTIONS (HERO / INTRO / QUALITY / WHY / CTA)
  ====================================================== */

  async getAllSections() {
    const sections = await prisma.homepageContent.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });

    return sections.map(section => ({
      ...section,
      badge: section.badge || "",
      subtitle: section.subtitle || "",
      title: section.title || "",
      content: section.content || "",
    }));
  },


  async getBySection(section: string) {
    return prisma.homepageContent.findUnique({
      where: { section: section as any },
    });
  },

  async upsertSection(section: string, data: any) {
    // Convert sort_order to number if it exists
    const processedData = { ...data };
    if (processedData.sort_order !== undefined) {
      processedData.sort_order = parseInt(processedData.sort_order) || 0;
    }
    
    return prisma.homepageContent.upsert({
      where: { section: section as any },
      update: processedData,
      create: {
        section: section as any,
        ...processedData,
        is_active: true,
      },
    });
  },


  
  /* ======================================================
     FEATURES (Why Firehawk small cards)
  ====================================================== */

  async getFeatures() {
    return prisma.homepageFeature.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createFeature(data: any) {
    const last = await prisma.homepageFeature.findFirst({
      orderBy: { sort_order: "desc" },
    });

    return prisma.homepageFeature.create({
      data: {
        ...data,
        sort_order: (last?.sort_order || 0) + 1,
        is_active: true,
      },
    });
  },

  async updateFeature(id: string, data: any) {
    // Convert sort_order to number if it exists
    const processedData = { ...data };
    if (processedData.sort_order !== undefined) {
      processedData.sort_order = parseInt(processedData.sort_order) || 0;
    }
    
    return prisma.homepageFeature.update({
      where: { id },
      data: processedData,
    });
  },

  async deleteFeature(id: string) {
    return prisma.homepageFeature.delete({
      where: { id },
    });
  },

  async reorderFeature(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageFeature, id, direction);
    return this.getFeatures();
  },


  /* ======================================================
     JOURNEY STEPS (Farm → Processing → Packaging → Export)
  ====================================================== */

  async getJourney() {
    return prisma.homepageJourney.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createJourney(data: any) {
    // Convert sort_order to number
    const processedData = {
      title: data.title,
      description: data.description,
      icon: data.icon,
      sort_order: parseInt(data.sort_order) || 0,
      // Use image if provided, otherwise use default
      image: data.image || data.image_url || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400",
      is_active: true,
    };
    
    return prisma.homepageJourney.create({
      data: processedData,
    });
  },

  async updateJourney(id: string, data: any) {
    // Convert sort_order to number if it exists
    const processedData: any = {
      title: data.title,
      description: data.description,
      icon: data.icon,
      image: data.image,
    };
    
    if (data.sort_order !== undefined) {
      processedData.sort_order = parseInt(data.sort_order) || 0;
    }
    
    return prisma.homepageJourney.update({
      where: { id },
      data: processedData,
    });
  },

  async deleteJourney(id: string) {
    return prisma.homepageJourney.delete({
      where: { id },
    });
  },

  async reorderJourney(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageJourney, id, direction);
    return this.getJourney();
  },

  /* ======================================================
     ORIGINS (Kerala / Karnataka cards)
  ====================================================== */

  async getOrigins() {
    return prisma.homepageOrigin.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createOrigin(data: any) {
    // Convert sort_order to number
    const processedData = {
      ...data,
      sort_order: parseInt(data.sort_order) || 0,
      spices: data.spices || [],
      is_active: true,
    };
    
    return prisma.homepageOrigin.create({
      data: processedData,
    });
  },

  async updateOrigin(id: string, data: any) {
    // Convert sort_order to number if it exists
    const processedData: any = {
      name: data.name,
      region: data.region,
      description: data.description,
      spices: data.spices || [],
    };
    
    if (data.sort_order !== undefined) {
      processedData.sort_order = parseInt(data.sort_order) || 0;
    }
    
    return prisma.homepageOrigin.update({
      where: { id },
      data: processedData,
    });
  },

  async deleteOrigin(id: string) {
    await prisma.homepageOrigin.deleteMany({
      where: { id },
    });

    return { success: true };
  },

  async reorderOrigin(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageOrigin, id, direction);
    return this.getOrigins();
  },


  /* ======================================================
     CERTIFICATIONS (EU / FDA / ISO etc)
  ====================================================== */

  async getCertifications() {
    return prisma.homepageCertification.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  async createCertification(data: any) {

    const last = await prisma.homepageCertification.findFirst({
      orderBy: { sort_order: "desc" },
    });

    return prisma.homepageCertification.create({
      data: {
        ...data,
        sort_order: (last?.sort_order || 0) + 1,
        is_active: true,
      },
    });
  },


  async updateCertification(id: string, data: any) {
    // Convert sort_order to number if it exists
    const processedData: any = {
      name: data.name,
    };
    
    if (data.sort_order !== undefined) {
      processedData.sort_order = parseInt(data.sort_order) || 0;
    }
    
    return prisma.homepageCertification.update({
      where: { id },
      data: processedData,
    });
  },

  async deleteCertification(id: string) {
    return prisma.homepageCertification.delete({
      where: { id },
    });
  },

  async reorderCertification(id: string, direction: "up" | "down") {
    await reorderItems(prisma.homepageCertification, id, direction);
    return this.getCertifications();
  },

  async updateStat(id: string, data: any) {
    return prisma.homepageStat.update({
      where: { id },
      data,
    });
  },

  /* ======================================================
    HERO STATS (15+ Countries / 25+ Years / 500+ Farmers)
  ====================================================== */

  async getStats(page?: string) {
    return prisma.homepageStat.findMany({
      where: {
        is_active: true,
        ...(page ? { page } : {}),
      },
      orderBy: { sort_order: "asc" },
    });
  },

async createStat(data: any) {
  const last = await prisma.homepageStat.findFirst({
    where: { page: data.page },
    orderBy: { sort_order: "desc" },
  });

  return prisma.homepageStat.create({
    data: {
      value: data.value,
      label: data.label,
      page: data.page,   
      sort_order: (last?.sort_order || 0) + 1,
      is_active: true,
    },
  });
},


  async deleteStat(id: string) {
    return prisma.homepageStat.delete({
      where: { id },
    });
  },

  async reorderStat(id: string, direction: "up" | "down") {
    const current = await prisma.homepageStat.findUnique({
      where: { id },
    });

    if (!current) return;

    const swap = await prisma.homepageStat.findFirst({
      where:
        direction === "up"
          ? { sort_order: { lt: current.sort_order } }
          : { sort_order: { gt: current.sort_order } },
      orderBy: {
        sort_order: direction === "up" ? "desc" : "asc",
      },
    });

    if (!swap) return;

    await prisma.$transaction([
      prisma.homepageStat.update({
        where: { id: current.id },
        data: { sort_order: swap.sort_order },
      }),
      prisma.homepageStat.update({
        where: { id: swap.id },
        data: { sort_order: current.sort_order },
      }),
    ]);
  }


  
};


