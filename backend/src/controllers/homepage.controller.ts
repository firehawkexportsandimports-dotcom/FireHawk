import { Request, Response } from "express";
import { homepageService } from "../services/homepage.service";

/* =====================================
   GET HOMEPAGE CONTENT
===================================== */
export const getHomepage = async (_req: Request, res: Response) => {
  try {
    const data = await homepageService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch homepage content" });
  }
};

/* =====================================
   UPDATE SECTION (ADMIN)
===================================== */
export const updateSection = async (req: Request, res: Response) => {
  try {
    const section = req.params.section as string;

    const data: any = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      button_text: req.body.button_text,
      button_link: req.body.button_link,
    };

    // ✅ IMPORTANT — cloudinary image url
    if (req.file) {
      data.image = (req.file as any).path; // cloudinary url
    }

    const updated = await homepageService.upsert(section, data);

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update section" });
  }
};

