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
   UPDATE PRODUCT
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
    images?: {
      url: string;
      alt?: string;
      is_primary?: boolean;
      sort_order?: number;
    }[];
  }
) => {
  /* --------------------------------------------
     Build safe update object
  -------------------------------------------- */
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

  /* --------------------------------------------
     If new images uploaded:
     delete old images and insert new ones
  -------------------------------------------- */
  if (data.images && data.images.length > 0) {
    updateData.images = {
      deleteMany: {},
      create: data.images,
    };
  }

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
};

/* ======================================================
   DELETE PRODUCT
====================================================== */
export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
