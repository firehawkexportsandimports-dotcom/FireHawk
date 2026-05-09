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

      // Save enquiry in database
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

      const mailUser = process.env.MAIL_USER;
      const adminMail = process.env.ADMIN_MAIL;

      if (!mailUser || !adminMail) {
        console.error("Enquiry email skipped: MAIL_USER or ADMIN_MAIL is missing.");
        return enquiry;
      }

      /* =====================================
         SEND EMAILS
      ===================================== */

      const [adminEmailResult, customerEmailResult] = await Promise.allSettled([
        transporter.sendMail({
          from: `"Firehawk Website" <${mailUser}>`,
          to: adminMail,
          replyTo: enquiry.email,
          subject: `New Enquiry from ${enquiry.name}`,
          html: enquiryEmailTemplate(enquiry),
        }),
        transporter.sendMail({
          from: `"Firehawk Imports & Exports" <${mailUser}>`,
          to: enquiry.email,
          subject: "Thank you for contacting Firehawk Imports & Exports",
          html: customerThankyouTemplate(enquiry),
        }),
      ]);

      if (adminEmailResult.status === "rejected") {
        console.error("Admin email failed:", adminEmailResult.reason);
      }

      if (customerEmailResult.status === "rejected") {
        console.error("Customer email failed:", customerEmailResult.reason);
      }

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
