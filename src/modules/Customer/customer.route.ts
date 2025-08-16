import { Router } from "express";
import { createUserValidator } from "@/modules/Customer/customer.validation.js";
import validateResult from "@/middlewares/ValidationRequest.js";
import customerController from "@modules/Customer/customer.controller.js";

const router = Router();

router
  .route("/:storeId")
  .get(customerController.getAll)
  .post(createUserValidator, validateResult, customerController.createOne);
router
  .route("/:id")
  .get(customerController.getOne)
  .delete(customerController.softDeleteById)
  .put(createUserValidator, validateResult, customerController.updateById);

export default router;
