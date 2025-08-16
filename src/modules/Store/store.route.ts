import { Router } from "express";
import { createStoreValidator } from "@/modules/Store/store.validation.js";
import validateResult from "@/middlewares/ValidationRequest.js";
import storeController from "@/modules/Store/store.controller.js";

const router = Router();

router.route("/").get(storeController.getAll);

router
  .route("/:ownerId")
  .post(createStoreValidator, validateResult, storeController.createOne);

router
  .route("/:id")
  .get(storeController.getOne)
  .delete(storeController.softDeleteById)
  .put(createStoreValidator, validateResult, storeController.updateById);

export default router;
