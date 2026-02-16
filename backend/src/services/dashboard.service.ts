import {prisma} from "../config/db";

export const dashboardService = {
  async getStats() {
    const [
      total_products,
      total_categories,
      total_enquiries,
      unread_enquiries,
      featured_products,
      recent_enquiries,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({
        where: { status: "unread" },
      }),
      prisma.product.count({
        where: { is_featured: true },
      }),
      prisma.enquiry.findMany({
        orderBy: { created_at: "desc" },
        take: 5,
        include: {
          product: true,
        },
      }),
    ]);

    return {
      total_products,
      total_categories,
      total_enquiries,
      unread_enquiries,
      featured_products,
      recent_enquiries,
    };
  },
};
