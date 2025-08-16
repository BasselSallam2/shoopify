import { CommonValidator } from "@/shared/commonValidator.js";
import {ValidationChain } from "express-validator";


class StoreValidator extends CommonValidator {
  constructor() {
    super();
  }

  static email(field: any): ValidationChain {
      let chain = field.isEmail().withMessage("Must be a valid email");
      return chain ;
    }


}

export default StoreValidator;
