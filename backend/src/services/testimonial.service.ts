import prisma from "../config/db";

export const testimonialService = {
  async getAll() {
    return prisma.testimonial.findMany({
      orderBy: { created_at: "desc" },
    });
  },

  async getFeatured() {
    return prisma.testimonial.findMany({
      where: { is_featured: true },
      orderBy: { created_at: "desc" },
    });
  },

  async create(data: any) {
    return prisma.testimonial.create({
      data: {
        name: data.name,
        company: data.company,
        country: data.country,
        content: data.content,
        avatar: data.avatar,
        rating: Number(data.rating || 5),
        is_featured: data.is_featured ?? true,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.testimonial.update({
      where: { id },
      data: {
        name: data.name,
        company: data.company,
        country: data.country,
        content: data.content,
        avatar: data.avatar,
        rating: Number(data.rating),
        is_featured: data.is_featured,
      },
    });
  },

  async delete(id: string) {
    return prisma.testimonial.delete({
      where: { id },
    });
  },
};
