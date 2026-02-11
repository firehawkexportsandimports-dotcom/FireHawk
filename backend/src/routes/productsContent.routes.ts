import express from "express";
import multer from "multer";

import {
  getProductsContent,
  updateProductsSection,
} from "../controllers/productsContent.controller";

const router = express.Router();

const upload = multer(); // memory storage

// GET
router.get("/", getProductsContent);

// PUT (IMPORTANT)
router.put(
  "/:section",
  upload.none(),   // ✅ THIS LINE FIXES EVERYTHING
  updateProductsSection
);

export default router;
