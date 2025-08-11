import { Router, Request, Response } from "express";
import { createUserValidator } from "@/modules/Customer/customer.validation.js";
import validateResult from "@/middlewares/ValidationRequest.js";
import {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@modules/Customer/customer.controller.js";
const router = Router();

router
  .route("/")
  .get(getAllCustomer)
  .post(createUserValidator, validateResult, createCustomer);

router
  .route("/:id")
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);

export default router;
