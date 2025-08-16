import { body } from "express-validator";
import CategoryValidator from "@/modules/Category/category.validatonRules.js";

export const createCategoryValidator = [
  CategoryValidator.text(body("name"), 4),
  CategoryValidator.text(body("slug"), 4),
  CategoryValidator.boolean(body("showInHome")),
];
