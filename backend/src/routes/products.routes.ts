import { Router } from "express";
import * as controller from "../controllers/products.controller";
import{ upload }from "../middleware/upload"; // your multer config

const router = Router();

router.get("/", controller.getAll);
router.get("/featured", controller.getFeatured);
router.get("/category/:slug", controller.getByCategory);
router.get("/:slug", controller.getBySlug);

router.post("/", upload.array("images"), controller.create);

/* ✅ IMPORTANT FIX */
router.put("/:id", upload.array("images"), controller.update);

router.delete("/:id", controller.remove);

export default router;
