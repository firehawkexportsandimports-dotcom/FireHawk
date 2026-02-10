import { Router } from "express";
import {
  getAboutContent,
  updateAboutSection,
} from "../controllers/about.controller";
import {upload} from "../middleware/upload"; 

const router = Router();

router.get("/about", getAboutContent);

router.put(
  "/about/:section",
  upload.single("image"),
  updateAboutSection
);

export default router;
