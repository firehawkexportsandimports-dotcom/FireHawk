import { Request, Response } from "express";
import * as productService from "../services/products.service";

/* ================= GET ALL ================= */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ================= GET BY SLUG ================= */
export const getBySlug = async (
  req: Request<{ slug: string }>,
  res: Response
) => {
  try {
    const product = await productService.getProductBySlug(
      req.params.slug
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/* ================= FEATURED ================= */
export const getFeatured = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getFeaturedProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch featured products" });
  }
};

/* ================= BY CATEGORY ================= */
export const getByCategory = async (
  req: Request<{ slug: string }>,
  res: Response
) => {
  try {
    const products = await productService.getProductsByCategory(
      req.params.slug
    );
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch category products" });
  }
};

/* ================= CREATE PRODUCT ================= */
export const create = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    /* packaging */
    let packaging: string[] = [];
    if (req.body.packaging) {
      packaging = Array.isArray(req.body.packaging)
        ? req.body.packaging
        : [req.body.packaging];
    }

    /* images from cloudinary */
    const images =
      files?.map((file, index) => ({
        url: (file as any).path,
        alt: req.body.name,
        is_primary: index === 0, // First image is primary by default
        sort_order: index,
      })) || [];

    const product = await productService.createProduct({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      short_description: req.body.short_description,
      category_id: req.body.category_id || null,
      origin: req.body.origin,
      packaging,
      price_range: req.body.price_range,
      is_featured: req.body.is_featured === "true",
      is_export_ready: req.body.is_export_ready !== "false",
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

/* ================= UPDATE PRODUCT ================= */
export const update = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const files = req.files as Express.Multer.File[];

    /* ---------- packaging ---------- */
    let packaging: string[] = [];
    if (req.body?.packaging) {
      packaging = Array.isArray(req.body.packaging)
        ? req.body.packaging
        : [req.body.packaging];
    }

    /* ---------- Parse image data from form ---------- */
    // Images to delete (array of IDs)
    let deleteImages: string[] = [];
    if (req.body.delete_images) {
      deleteImages = Array.isArray(req.body.delete_images)
        ? req.body.delete_images
        : [req.body.delete_images];
    }

    // Existing images with primary flag
    let existingImages: { id: string; is_primary: boolean }[] = [];
    if (req.body.existing_images) {
      try {
        existingImages = JSON.parse(req.body.existing_images);
      } catch (e) {
        console.error("Failed to parse existing_images:", e);
      }
    }

    // New images from uploaded files
    const newImages = files?.map((file, index) => {
      const isPrimary = req.body.new_primary_image_index && 
                       parseInt(req.body.new_primary_image_index) === index;
      
      return {
        url: (file as any).path,
        alt: req.body.name,
        is_primary: isPrimary || false,
        sort_order: (existingImages?.length || 0) + index,
      };
    }) || [];

    const product = await productService.updateProduct(
      req.params.id,
      {
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        short_description: req.body.short_description,
        category_id: req.body.category_id || null,
        origin: req.body.origin,
        packaging,
        price_range: req.body.price_range,
        is_featured: req.body.is_featured === "true",
        is_export_ready: req.body.is_export_ready !== "false",
        deleteImages,
        existingImages,
        newImages: newImages.length ? newImages : undefined,
      }
    );

    res.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* ================= DELETE ================= */
export const remove = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};