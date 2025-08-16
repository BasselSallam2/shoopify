import { Router } from "express";
import { createOwnerValidator } from "@/modules/Owner/owner.validation.js";
import validateResult from "@/middlewares/ValidationRequest.js";
import ownerController from "@modules/Owner/owner.controller.js";

const router = Router();

router
  .route("/")
  .get(ownerController.getAll)
  .post(createOwnerValidator, validateResult, ownerController.createOne);
router
  .route("/:id")
  .get(ownerController.getOne)
  .delete(ownerController.softDeleteById)
  .put(createOwnerValidator, validateResult, ownerController.updateById);

export default router;
