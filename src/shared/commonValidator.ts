import {ValidationChain } from "express-validator";
import { Request } from "express";

class CommonValidator {
  static text(
    field: any,
    minLength: number = 3,
    maxLength?: number
  ): ValidationChain {
    let chain = field
      .notEmpty()
      .withMessage(`field is required`)
      .isString()
      .withMessage(`field must be a string`)
      .isLength({ min: minLength })
      .withMessage(`field must be at least ${minLength} characters long`);

    if (maxLength) {
      chain = chain
        .isLength({ min: minLength, max: maxLength })
        .withMessage(
          `field must be between ${minLength} and ${maxLength} characters long`
        );
    }

    return chain;
  }


  static Number(field: any, minimum: number , maximum?: number): ValidationChain {
    let chain = field
      .notEmpty()
      .withMessage(`field is required`)
      .isString()
      .withMessage(`field} must be a string`)
      .matches(/^[0-9]+$/)
      .withMessage(`field} must contain digits only`)
      .isLength({ min: minimum })
      .withMessage(`field must be at least ${minimum} digits long`);
      return chain ;
  }
}

class UserVlidator extends CommonValidator {
    constructor() {
        super();
    }

      static email(field: any): ValidationChain {
    let chain = field.isEmail().withMessage("Must be a valid email");
    return chain ;
  }

static confirmPassword(passwordField: any, confirmFieldName: string): ValidationChain {
  return passwordField
    .custom((value: string, context: { req: Request }) => {
      const req = context.req;
      if (value !== req.body[confirmFieldName]) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    });
}





}

export   { UserVlidator , CommonValidator};
