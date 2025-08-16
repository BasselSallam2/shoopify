import { CommonValidator } from "@/shared/commonValidator.js";
import {ValidationChain } from "express-validator";


class StoreValidator extends CommonValidator {
  constructor() {
    super();
  }

      static boolean(field: any): ValidationChain {
    let chain = field
      .isBoolean()
      .withMessage("field must be a boolean");
      return chain ;
  }

}

export default StoreValidator;
