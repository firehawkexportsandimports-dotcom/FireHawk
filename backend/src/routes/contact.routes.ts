import express from "express";
import multer from "multer";

import {
  getContactInfo,
  updateContactInfo,
} from "../controllers/contact.controller";

const router = express.Router();
const upload = multer();

router.get("/", getContactInfo);
router.put("/", upload.none(), updateContactInfo);

export default router;
