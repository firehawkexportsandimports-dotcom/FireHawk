import prisma from "../config/db";

export const enquiryService = {
  /* =====================================
     CREATE ENQUIRY
  ===================================== */
  async create(data: {
    type: "product" | "general";
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    product_id?: string;
  }) {
    return prisma.enquiry.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        product_id: data.product_id || null,
      },
    });
  },

  /* =====================================
     GET ALL ENQUIRIES (ADMIN)
  ===================================== */
  async getAll() {
    return prisma.enquiry.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        product: true,
      },
    });
  },

  /* =====================================
     MARK AS READ
  ===================================== */
  async markAsRead(id: string) {
    return prisma.enquiry.update({
      where: { id },
      data: {
        status: "read",
      },
    });
  },

  /* =====================================
     DELETE ENQUIRY
  ===================================== */
  async delete(id: string) {
    return prisma.enquiry.delete({
      where: { id },
    });
  },
};
