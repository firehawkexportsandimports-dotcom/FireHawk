import { Router } from "express";
import {
  getTestimonials,
  getFeaturedTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller";

const router = Router();

router.get("/", getTestimonials);
router.get("/featured", getFeaturedTestimonials);

router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
