import { Router } from "express";
import {
  createEnquiry,
  getAllEnquiries,
  markEnquiryRead,
  deleteEnquiry,
} from "../controllers/enquiry.controller";

const router = Router();

router.post("/", createEnquiry);
router.get("/", getAllEnquiries);
router.patch("/:id/read", markEnquiryRead);
router.delete("/:id", deleteEnquiry);

export default router;
