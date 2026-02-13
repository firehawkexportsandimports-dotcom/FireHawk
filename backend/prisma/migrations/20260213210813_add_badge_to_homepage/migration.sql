/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductsSection" AS ENUM ('hero');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AboutSection" ADD VALUE 'hero';
ALTER TYPE "AboutSection" ADD VALUE 'cta';

-- AlterEnum
ALTER TYPE "HomepageSection" ADD VALUE 'products_intro';

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'super_admin';

-- AlterTable
ALTER TABLE "about_content" ADD COLUMN     "badge" TEXT,
ADD COLUMN     "countries" TEXT[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "subtitle" TEXT;

-- AlterTable
ALTER TABLE "contact_info" ADD COLUMN     "badge" TEXT,
ADD COLUMN     "company_description" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "homepage_content" ADD COLUMN     "badge" TEXT,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'editor',
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_content" (
    "id" TEXT NOT NULL,
    "section" "ProductsSection" NOT NULL,
    "title" TEXT,
    "subtitle" TEXT,
    "badge" TEXT,
    "content" TEXT,
    "image" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_content_section_key" ON "products_content"("section");
