import { body, query } from "express-validator";
import CustomerVlidator from "@/modules/Customer/customer.validatonRules.js";


export const createUserValidator = [
  CustomerVlidator.text(body("name"), 3),
  CustomerVlidator.email(body("email")),
  CustomerVlidator.gender(body("gender")),
  CustomerVlidator.Number(body("phoneNumber"), 10),
  CustomerVlidator.text(body("password"), 6),
  CustomerVlidator.text(body("confirmPassword"), 6),
  CustomerVlidator.confirmPassword(body("password"), "confirmPassword"),
];
