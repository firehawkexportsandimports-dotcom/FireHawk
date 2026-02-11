import { Request, Response } from "express";
import { productsContentService } from "../services/productsContent.service";

/* =========================
   GET PRODUCTS CONTENT
========================= */
export const getProductsContent = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await productsContentService.getAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch products content",
    });
  }
};

/* =========================
   UPDATE SECTION
========================= */
export const updateProductsSection = async (
  req: Request,
  res: Response
) => {
  try {
    const { section } = req.params as { section: string };

    const updated = await productsContentService.upsert(section, {
      title: req.body.title,
      subtitle: req.body.subtitle,
      badge: req.body.badge,
      content: req.body.content,
      image: req.file?.path || req.body.image,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update section",
    });
  }
};
