import { Router } from "express";
import {
  getHomepage,
  updateSection,
} from "../controllers/homepage.controller";
import { upload } from "../middleware/upload";

const router = Router();

/* PUBLIC */
router.get("/homepage", getHomepage);

/* ADMIN */
router.put("/homepage/:section", upload.single("image"), updateSection);

export default router;
