import prisma from "../config/db";

class AboutService {
  /* =========================
     GET ALL ABOUT CONTENT
  ========================= */
  async getAll() {
    return prisma.aboutContent.findMany({
      orderBy: { sort_order: "asc" },
    });
  }

  /* =========================
     UPSERT SECTION
  ========================= */
  async upsert(
    section: string,
    data: {
      title?: string;
      content?: string;
      image?: string;
    }
  ) {
    return prisma.aboutContent.upsert({
      where: { section: section as any },
      update: {
        title: data.title,
        content: data.content,
        image: data.image,
      },
      create: {
        section: section as any,
        title: data.title,
        content: data.content,
        image: data.image,
      },
    });
  }
}

export const aboutService = new AboutService();
