import {prisma} from "../config/db";

class ProductsContentService {
  /* =========================
     GET ALL PRODUCTS CONTENT
  ========================= */
  async getAll() {
    return prisma.productsContent.findMany();
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
      image?: string;
    }
  ) {
    return prisma.productsContent.upsert({
      where: { section: section as any },
      update: {
        title: data.title,
        subtitle: data.subtitle,
        badge: data.badge,
        content: data.content,
        image: data.image,
      },
      create: {
        section: section as any,
        title: data.title,
        subtitle: data.subtitle,
        badge: data.badge,
        content: data.content,
        image: data.image,
      },
    });
  }
}

export const productsContentService = new ProductsContentService();
