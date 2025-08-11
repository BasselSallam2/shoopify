import { UserVlidator } from "@/shared/commonValidator.js";
import {ValidationChain } from "express-validator";

class CustomerVlidator extends UserVlidator {
  constructor() {
    super();
  }

  static gender(field: any): ValidationChain {
    let chain = field
      .notEmpty()
      .withMessage("Gender is required")
      .isIn(["Male", "Female"])
      .withMessage("Gender must be Male or Female");
    return chain;
  }
}

export default CustomerVlidator;
