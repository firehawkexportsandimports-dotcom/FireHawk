import { Request, Response } from "express";
import * as categoryService from "../services/categories.service";

/* ======================================================
   GET ALL CATEGORIES (ADMIN + PUBLIC)
====================================================== */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};

/* ======================================================
   GET FEATURED CATEGORIES (HOMEPAGE)
====================================================== */
export const getFeatured = async (_req: Request, res: Response) => {
  try {
    const categories =
      await categoryService.getFeaturedCategories();

    res.json(categories);
  } catch (error) {
    console.error("GET FEATURED CATEGORIES ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch featured categories",
    });
  }
};

/* ======================================================
   GET CATEGORY BY SLUG
====================================================== */
export const getBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    const category =
      await categoryService.getCategoryBySlug(slug);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch category",
    });
  }
};

/* ======================================================
   CREATE CATEGORY (ADMIN)
====================================================== */
export const create = async (req: Request, res: Response) => {
  try {
    const imageUrl =
      (req.file as Express.Multer.File | undefined)?.path;

    const category =
      await categoryService.createCategory({
        name: req.body.name,
        description: req.body.description,
        image: imageUrl,
        is_featured: req.body.is_featured === "true",
      });

    res.status(201).json(category);
  } catch (error: any) {
    console.error("CREATE CATEGORY ERROR:", error);

    res.status(500).json({
      message:
        error.message || "Failed to create category",
    });
  }
};

/* ======================================================
   UPDATE CATEGORY (ADMIN)
====================================================== */
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const imageUrl =
      (req.file as Express.Multer.File | undefined)?.path;

    const category =
      await categoryService.updateCategory(id, {
        name: req.body.name,
        description: req.body.description,
        image: imageUrl || req.body.image,
        is_featured:
          req.body.is_featured !== undefined
            ? req.body.is_featured === "true"
            : undefined,
      });

    res.json(category);
  } catch (error: any) {
    console.error("UPDATE CATEGORY ERROR:", error);

    res.status(500).json({
      message:
        error.message || "Failed to update category",
    });
  }
};

/* ======================================================
   DELETE CATEGORY (ADMIN)
====================================================== */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await categoryService.deleteCategory(id);

    res.json({ success: true });
  } catch (error: any) {
    console.error("DELETE CATEGORY ERROR:", error);

    res.status(400).json({
      message:
        error.message ||
        "Cannot delete category with existing products",
    });
  }
};
