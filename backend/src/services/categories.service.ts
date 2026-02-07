import prisma from "../config/db";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { created_at: "desc" },
  });
};

export const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
  });
};

export const createCategory = async (data: {
  name: string;
  description?: string;
  image?: string;
}) => {
  const slug = slugify(data.name);

  return prisma.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      image: data.image,
    },
  });
};

export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    image?: string;
  }
) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

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
