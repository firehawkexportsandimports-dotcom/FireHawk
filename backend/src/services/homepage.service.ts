import prisma from "../config/db";

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
    // Convert sort_order to number
    const processedData = {
      ...data,
      sort_order: parseInt(data.sort_order) || 0,
      is_active: true,
    };
    
    return prisma.homepageFeature.create({
      data: processedData,
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

  async reorderFeature(id: string, direction: 'up' | 'down') {
    const feature = await prisma.homepageFeature.findUnique({ where: { id } });
    if (!feature) throw new Error('Feature not found');

    const currentOrder = feature.sort_order;
    const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;

    // Find the feature that currently has the target order
    const swapFeature = await prisma.homepageFeature.findFirst({
      where: { sort_order: newOrder },
    });

    if (swapFeature) {
      // Swap orders
      await prisma.$transaction([
        prisma.homepageFeature.update({
          where: { id: feature.id },
          data: { sort_order: newOrder },
        }),
        prisma.homepageFeature.update({
          where: { id: swapFeature.id },
          data: { sort_order: currentOrder },
        }),
      ]);
    } else {
      // Just update the current feature
      await prisma.homepageFeature.update({
        where: { id },
        data: { sort_order: newOrder },
      });
    }

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

  async reorderJourney(id: string, direction: 'up' | 'down') {
    const journey = await prisma.homepageJourney.findUnique({ where: { id } });
    if (!journey) throw new Error('Journey step not found');

    const currentOrder = journey.sort_order;
    const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;

    // Find the journey step that currently has the target order
    const swapJourney = await prisma.homepageJourney.findFirst({
      where: { sort_order: newOrder },
    });

    if (swapJourney) {
      // Swap orders
      await prisma.$transaction([
        prisma.homepageJourney.update({
          where: { id: journey.id },
          data: { sort_order: newOrder },
        }),
        prisma.homepageJourney.update({
          where: { id: swapJourney.id },
          data: { sort_order: currentOrder },
        }),
      ]);
    } else {
      // Just update the current journey step
      await prisma.homepageJourney.update({
        where: { id },
        data: { sort_order: newOrder },
      });
    }

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
    return prisma.homepageOrigin.delete({
      where: { id },
    });
  },

  async reorderOrigin(id: string, direction: 'up' | 'down') {
    const origin = await prisma.homepageOrigin.findUnique({
      where: { id },
    });

    if (!origin) throw new Error('Origin not found');

    const swapOrigin = await prisma.homepageOrigin.findFirst({
      where: {
        is_active: true,
        sort_order:
          direction === 'up'
            ? { lt: origin.sort_order }
            : { gt: origin.sort_order },
      },
      orderBy: {
        sort_order: direction === 'up' ? 'desc' : 'asc',
      },
    });

    if (!swapOrigin) return this.getOrigins();

    await prisma.$transaction([
      prisma.homepageOrigin.update({
        where: { id: origin.id },
        data: { sort_order: swapOrigin.sort_order },
      }),
      prisma.homepageOrigin.update({
        where: { id: swapOrigin.id },
        data: { sort_order: origin.sort_order },
      }),
    ]);

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

  async reorderCertification(id: string, direction: 'up' | 'down') {
    const certification =
      await prisma.homepageCertification.findUnique({
        where: { id },
      });

    if (!certification)
      throw new Error('Certification not found');

    const swapCert =
      await prisma.homepageCertification.findFirst({
        where: {
          is_active: true,
          sort_order:
            direction === 'up'
              ? { lt: certification.sort_order }
              : { gt: certification.sort_order },
        },
        orderBy: {
          sort_order: direction === 'up' ? 'desc' : 'asc',
        },
      });

    if (!swapCert) return this.getCertifications();

    await prisma.$transaction([
      prisma.homepageCertification.update({
        where: { id: certification.id },
        data: { sort_order: swapCert.sort_order },
      }),
      prisma.homepageCertification.update({
        where: { id: swapCert.id },
        data: { sort_order: certification.sort_order },
      }),
    ]);

    return this.getCertifications();
  },

};