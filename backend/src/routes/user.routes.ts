import { Router } from "express";
import {
  getUsers,
  approveUser,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller";

import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/",
  requireAuth,
  requireRole("super_admin"),
  getUsers
);

router.patch(
  "/:id/approve",
  requireAuth,
  requireRole("super_admin"),
  approveUser
);

router.patch(
  "/:id/role",
  requireAuth,
  requireRole("super_admin"),
  updateUserRole
);


router.delete(
  "/:id",
  requireAuth,
  requireRole("super_admin"),
  deleteUser
);


export default router;
