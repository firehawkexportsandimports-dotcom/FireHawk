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
        subtitle?: string;
        badge?: string;
        content?: string;
        description?: string;
        image?: string;
        countries?: string[];
    }
  ) {
    return prisma.aboutContent.upsert({
      where: { section: section as any },
      update: {
        title: data.title,
        subtitle: data.subtitle,
        badge: data.badge,
        content: data.content,
        description: data.description,
        image: data.image,
        countries: data.countries,
      },
      create: {
        section: section as any,
        title: data.title,
        subtitle: data.subtitle,
        badge: data.badge,
        content: data.content,
        description: data.description,
        image: data.image,
        countries: data.countries,
      },
    });
  }
}

export const aboutService = new AboutService();
