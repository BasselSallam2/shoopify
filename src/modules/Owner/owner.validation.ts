import { body, query } from "express-validator";
import CustomerVlidator from "@/modules/Owner/owner.validatonRules.js";


export const createOwnerValidator = [
  CustomerVlidator.text(body("name"), 3),
  CustomerVlidator.Number(body("phoneNumber"), 10),
  CustomerVlidator.text(body("password"), 6),
  CustomerVlidator.text(body("confirmPassword"), 6),
  CustomerVlidator.confirmPassword(body("password"), "confirmPassword"),
];
