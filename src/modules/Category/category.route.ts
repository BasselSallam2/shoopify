import { Router } from "express";
import { createCategoryValidator } from "@/modules/Category/category.validation.js";
import validateResult from "@/middlewares/ValidationRequest.js";
import categoryController from "@/modules/Category/category.controller.js";
import upload from "@utils/cloudnairy.js";

const router = Router();

router
  .route("/")
  .post(
    upload.single("image"),
    categoryController.createOne
  );

export default router;
