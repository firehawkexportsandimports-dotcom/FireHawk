import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "firehawk/products",
    allowed_formats: ["jpg", "png", "webp"],
  }) as any,  
});

export const upload = multer({ storage });
