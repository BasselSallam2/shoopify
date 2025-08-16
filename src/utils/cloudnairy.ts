import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "@config/cloudnairy.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shopify",
    allowedFormats: ["jpg", "png", "jpeg"],
  } as any,
});

const upload = multer({ storage });

export default upload;
