import {prisma} from "../config/db";

/* ======================================================
   HELPERS
====================================================== */

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ======================================================
   GET ALL CATEGORIES
====================================================== */

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { created_at: "desc" },
  });
};

/* ======================================================
   GET FEATURED CATEGORIES (Homepage)
====================================================== */

export const getFeaturedCategories = async () => {
  return prisma.category.findMany({
    where: {
      is_featured: true,
    },
    orderBy: { created_at: "desc" },
  });
};

/* ======================================================
   GET CATEGORY BY SLUG
====================================================== */

export const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          images: true,
        },
      },
    },
  });
};

/* ======================================================
   CREATE CATEGORY
====================================================== */

export const createCategory = async (data: {
  name: string;
  description?: string;
  image?: string;
  is_featured?: boolean;
}) => {
  const slug = slugify(data.name);

  return prisma.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      image: data.image,
      is_featured: data.is_featured ?? false,
    },
  });
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */

export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    image?: string;
    is_featured?: boolean;
  }
) => {
  const updateData: any = { ...data };

  // regenerate slug if name changes
  if (data.name) {
    updateData.slug = slugify(data.name);
  }

  return prisma.category.update({
    where: { id },
    data: updateData,
  });
};

/* ======================================================
   DELETE CATEGORY
====================================================== */

export const deleteCategory = async (id: string) => {
  const productCount = await prisma.product.count({
    where: { category_id: id },
  });

  if (productCount > 0) {
    throw new Error(
      "Cannot delete category with existing products"
    );
  }

  return prisma.category.delete({
    where: { id },
  });
};
