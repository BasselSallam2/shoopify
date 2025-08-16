import { Router } from "express";
import { createProductValidator } from "@/modules/Product/product.validation.js";
import validateResult from "@/middlewares/ValidationRequest.js";
import productController from "@/modules/Product/product.controller.js";
import upload from "@utils/cloudnairy.js";

const router = Router();

router.route("/").post(
  upload.array("images", 10),
  createProductValidator,
  validateResult,
  productController.createOne
).get(productController.getAll);

export default router;
