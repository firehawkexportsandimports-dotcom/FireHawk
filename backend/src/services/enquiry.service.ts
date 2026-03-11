import { prisma } from "../config/db";
import { enquiryEmailTemplate } from "../utils/enquiryTemplate";
import { customerThankyouTemplate } from "../utils/customerThankyouTemplate";
import { transporter } from "../utils/mailer";

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

    try {

      // 1️⃣ Save enquiry in database
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

      /* =====================================
         SEND ADMIN EMAIL (BACKGROUND)
      ===================================== */

      transporter.sendMail({
        from: `"Firehawk Website" <${process.env.MAIL_USER}>`,
        to: process.env.ADMIN_MAIL,
        replyTo: enquiry.email,
        subject: `New Enquiry from ${enquiry.name}`,
        html: enquiryEmailTemplate(enquiry),
      }).catch((err) => {
        console.error("Admin email failed:", err);
      });

      /* =====================================
         SEND CUSTOMER THANK YOU EMAIL
      ===================================== */

      transporter.sendMail({
        from: `"Firehawk Imports & Exports" <${process.env.MAIL_USER}>`,
        to: enquiry.email,
        subject: "Thank you for contacting Firehawk Imports & Exports",
        html: customerThankyouTemplate(enquiry),
      }).catch((err) => {
        console.error("Customer email failed:", err);
      });

      // 3️⃣ Return enquiry immediately
      return enquiry;

    } catch (error) {
      console.error("Create enquiry error:", error);
      throw error;
    }
  },

  /* =====================================
     GET ALL ENQUIRIES (ADMIN)
  ===================================== */
  async getAll() {
    try {
      return await prisma.enquiry.findMany({
        orderBy: {
          created_at: "desc",
        },
        include: {
          product: true,
        },
      });
    } catch (error) {
      console.error("Fetch enquiries error:", error);
      throw error;
    }
  },

  /* =====================================
     MARK AS READ
  ===================================== */
  async markAsRead(id: string) {
    try {
      return await prisma.enquiry.update({
        where: { id },
        data: {
          status: "read",
        },
      });
    } catch (error) {
      console.error("Mark enquiry read error:", error);
      throw error;
    }
  },

  /* =====================================
     DELETE ENQUIRY
  ===================================== */
  async delete(id: string) {
    try {
      return await prisma.enquiry.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Delete enquiry error:", error);
      throw error;
    }
  },
};