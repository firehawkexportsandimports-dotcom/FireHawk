import prisma from "../config/db";
import { enquiryEmailTemplate } from "../utils/enquiryTemplate";
import { customerThankyouTemplate } from "../utils/customerThankyouTemplate";
import { transporter } from "../utils/mailer"; // ✅ IMPORT THIS

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

    //  Save enquiry in DB
    const enquiry = await prisma.enquiry.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        product_id: data.product_id || null,
      },
      include: {
        product: true,
      },
    });

    // Send Email AFTER saving
    await transporter.sendMail({
      from: `"Firehawk Website" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_MAIL,
      replyTo: enquiry.email,
      subject: `New Enquiry from ${enquiry.name}`,
      html: enquiryEmailTemplate(enquiry),
    });

    //  CUSTOMER THANK YOU EMAIL
    await transporter.sendMail({
      from: `"Firehawk Imports & Exports" <${process.env.MAIL_USER}>`,
      to: enquiry.email,
      subject: "Thank you for contacting Firehawk Imports & Exports",
      html: customerThankyouTemplate(enquiry),
    });

    // ✅ 3. Return enquiry
    return enquiry;
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
