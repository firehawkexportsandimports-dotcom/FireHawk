import {prisma} from "../config/db";

/* ======================================================
   GET ALL PRODUCTS
====================================================== */
export const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: { created_at: "desc" },
    include: {
      category: true,
      images: {
        orderBy: { sort_order: "asc" },
      },
    },
  });
};

/* ======================================================
   GET PRODUCT BY SLUG
====================================================== */
export const getProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: { sort_order: "asc" },
      },
    },
  });
};

/* ======================================================
   GET FEATURED PRODUCTS
====================================================== */
export const getFeaturedProducts = async () => {
  return prisma.product.findMany({
    where: { is_featured: true },
    include: {
      category: true,
      images: {
        orderBy: { sort_order: "asc" },
      },
    },
  });
};

/* ======================================================
   GET PRODUCTS BY CATEGORY
====================================================== */
export const getProductsByCategory = async (slug: string) => {
  return prisma.product.findMany({
    where: {
      category: { slug },
    },
    include: {
      category: true,
      images: {
        orderBy: { sort_order: "asc" },
      },
    },
  });
};

/* ======================================================
   CREATE PRODUCT
====================================================== */
export const createProduct = async (data: {
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  category_id?: string | null;
  origin?: string;
  packaging?: string[];
  price_range?: string;
  is_featured?: boolean;
  is_export_ready?: boolean;
  images?: {
    url: string;
    alt?: string;
    is_primary?: boolean;
    sort_order?: number;
  }[];
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      short_description: data.short_description,
      category_id: data.category_id || null,
      origin: data.origin,
      packaging: data.packaging ?? [],
      price_range: data.price_range,
      is_featured: data.is_featured ?? false,
      is_export_ready: data.is_export_ready ?? true,
      images: data.images?.length
        ? {
            create: data.images,
          }
        : undefined,
    },
    include: {
      category: true,
      images: true,
    },
  });
};

/* ======================================================
   UPDATE PRODUCT (WITH IMAGE MANAGEMENT)
====================================================== */
export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    short_description?: string;
    category_id?: string | null;
    origin?: string;
    packaging?: string[];
    price_range?: string;
    is_featured?: boolean;
    is_export_ready?: boolean;
    deleteImages?: string[]; // Array of image IDs to delete
    existingImages?: { id: string; is_primary: boolean }[]; // Existing images with primary flag
    newImages?: {
      url: string;
      alt?: string;
      is_primary?: boolean;
      sort_order?: number;
    }[]; // New images to add
  }
) => {
  return prisma.$transaction(async (prisma) => {
    // 1. Delete images marked for deletion
    if (data.deleteImages && data.deleteImages.length > 0) {
      await prisma.productImage.deleteMany({
        where: {
          id: { in: data.deleteImages },
          product_id: id,
        },
      });
    }

    // 2. Update existing images' primary status
    if (data.existingImages && data.existingImages.length > 0) {
      for (const img of data.existingImages) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: { is_primary: img.is_primary },
        });
      }
    }

    // 3. Add new images
    if (data.newImages && data.newImages.length > 0) {
      await prisma.productImage.createMany({
        data: data.newImages.map(img => ({
          ...img,
          product_id: id,
        })),
      });
    }

    // 4. Ensure only one primary image exists
    // If multiple images are set as primary, keep only the last one
    const primaryImages = await prisma.productImage.findMany({
      where: {
        product_id: id,
        is_primary: true,
      },
    });

    if (primaryImages.length > 1) {
      // Keep the first one as primary, set others to false
      const [keepPrimary, ...others] = primaryImages;
      await prisma.productImage.updateMany({
        where: {
          id: { in: others.map(img => img.id) },
        },
        data: { is_primary: false },
      });
    }

    // 5. If no primary image exists, set the first image as primary
    if (primaryImages.length === 0) {
      const firstImage = await prisma.productImage.findFirst({
        where: { product_id: id },
        orderBy: { sort_order: "asc" },
      });
      
      if (firstImage) {
        await prisma.productImage.update({
          where: { id: firstImage.id },
          data: { is_primary: true },
        });
      }
    }

    // 6. Update product details
    const updateData: any = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      short_description: data.short_description,
      category_id: data.category_id || null,
      origin: data.origin,
      packaging: data.packaging ?? [],
      price_range: data.price_range,
      is_featured: data.is_featured,
      is_export_ready: data.is_export_ready,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    return prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: {
          orderBy: { sort_order: "asc" },
        },
      },
    });
  });
};

/* ======================================================
   DELETE PRODUCT
====================================================== */
export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};