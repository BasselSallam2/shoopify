import { body } from "express-validator";
import StoreVlidator from "@/modules/Store/store.validatonRules.js";

export const createStoreValidator = [
  StoreVlidator.text(body("name"), 3),
  StoreVlidator.text(body("subdomain"), 3),
  StoreVlidator.text(body("customdomain"), 3),
  StoreVlidator.text(body("description"), 10),
  StoreVlidator.Number(body("contactPhone"), 10),
  StoreVlidator.email(body("contactMail")),
];
