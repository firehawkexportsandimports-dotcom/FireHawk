import { Router } from "express";
import * as controller from "../controllers/categories.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", controller.getAll);
router.get("/:slug", controller.getBySlug);

router.post("/", upload.single("image"), controller.create);
router.put("/:id", upload.single("image"), controller.update);

router.delete("/:id", controller.remove);

export default router;
