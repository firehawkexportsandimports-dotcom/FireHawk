import { Request, Response } from "express";
import * as categoryService from "../services/categories.service";

/* ======================================================
   GET ALL
====================================================== */
export const getAll = async (_: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/* ======================================================
   GET BY SLUG
====================================================== */
export const getBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    const category = await categoryService.getCategoryBySlug(slug);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

/* ======================================================
   CREATE CATEGORY
====================================================== */
export const create = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file?.path;

    const category = await categoryService.createCategory({
      name: req.body.name,
      description: req.body.description,
      image: imageUrl,
    });

    res.status(201).json(category);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Failed to create category",
    });
  }
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const imageUrl = req.file?.path;

    const category = await categoryService.updateCategory(id, {
      name: req.body.name,
      description: req.body.description,
      image: imageUrl || req.body.image,
    });

    res.json(category);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Failed to update category",
    });
  }
};

/* ======================================================
   DELETE CATEGORY
====================================================== */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await categoryService.deleteCategory(id);

    res.json({ success: true });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message:
        error.message ||
        "Cannot delete category with existing products",
    });
  }
};
