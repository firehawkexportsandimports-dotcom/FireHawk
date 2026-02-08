import prisma from "../config/db";

export const homepageService = {
  /* =====================================
     GET ALL HOMEPAGE CONTENT
  ===================================== */
  async getAll() {
    return prisma.homepageContent.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });
  },

  /* =====================================
     GET SINGLE SECTION
  ===================================== */
  async getBySection(section: string) {
    return prisma.homepageContent.findUnique({
      where: { section: section as any },
    });
  },

  /* =====================================
     CREATE OR UPDATE (ADMIN)
  ===================================== */
  async upsert(section: string, data: any) {
    return prisma.homepageContent.upsert({
      where: { section: section as any },
      update: data,
      create: {
        section: section as any,
        ...data,
      },
    });
  },
};
