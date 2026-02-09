import { Request, Response } from "express";
import { testimonialService } from "../services/testimonial.service";

/* =====================================================
   GET ALL TESTIMONIALS
===================================================== */
export const getTestimonials = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await testimonialService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch testimonials",
    });
  }
};

/* =====================================================
   GET FEATURED TESTIMONIALS
===================================================== */
export const getFeaturedTestimonials = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await testimonialService.getFeatured();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch featured testimonials",
    });
  }
};

/* =====================================================
   CREATE TESTIMONIAL
===================================================== */
export const createTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await testimonialService.create(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create testimonial",
    });
  }
};

/* =====================================================
   UPDATE TESTIMONIAL
===================================================== */
export const updateTestimonial = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const updated = await testimonialService.update(
      id,
      req.body
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update testimonial",
    });
  }
};

/* =====================================================
   DELETE TESTIMONIAL
===================================================== */
export const deleteTestimonial = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = req.params.id;

    await testimonialService.delete(id);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete testimonial",
    });
  }
};
