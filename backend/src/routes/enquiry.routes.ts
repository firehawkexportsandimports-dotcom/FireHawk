import { Router } from "express";
import {
  createEnquiry,
  getAllEnquiries,
  markEnquiryRead,
  deleteEnquiry,
} from "../controllers/enquiry.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { updateUserRole } from "../controllers/user.controller";

const router = Router();

/* ================================
   PUBLIC (CONTACT FORM)
================================ */
router.post("/", createEnquiry);

/* ================================
   ADMIN ONLY
================================ */
router.get(
  "/",
  requireAuth,
  requireRole("admin", "super_admin"),
  getAllEnquiries
);

router.patch(
  "/:id/read",
  requireAuth,
  requireRole("admin", "super_admin"),
  markEnquiryRead
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin", "super_admin"),
  deleteEnquiry
);

router.patch(
  "/:id/role",
  requireAuth,
  requireRole("super_admin"),
  updateUserRole
);


export default router;
