import { body } from "express-validator";
import productVlidator from "@/modules/Product/product.validatonRules.js";

export const createProductValidator = [
  productVlidator.text(body("title"), 4),
  productVlidator.text(body("slug"), 4),
  productVlidator.text(body("description"), 10),
  productVlidator.Number(body("price"), 1),
  productVlidator.Number(body("priceAfterDiscount").optional(), 0),
  productVlidator.text(body("brand"), 3),
  productVlidator.text(body("category"), 9),
  productVlidator.Number(body("stock"), 0),
];
