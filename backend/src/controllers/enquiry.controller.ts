import { Request, Response } from "express";
import { enquiryService } from "../services/enquiry.service";

/* =====================================
   CREATE ENQUIRY (CONTACT FORM)
===================================== */
export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await enquiryService.create(req.body);

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create enquiry",
    });
  }
};

/* =====================================
   GET ALL ENQUIRIES (ADMIN PAGE)
===================================== */
export const getAllEnquiries = async (_req: Request, res: Response) => {
  try {
    const enquiries = await enquiryService.getAll();
    res.json(enquiries);
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    res.status(500).json({
      message: "Failed to fetch enquiries",
    });
  }
};

export const markEnquiryRead = async (req: Request, res: Response) => {
  try {
    const updated = await enquiryService.markAsRead(
      req.params.id as string
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update enquiry",
    });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    await enquiryService.delete(req.params.id as string);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete enquiry",
    });
  }
};
