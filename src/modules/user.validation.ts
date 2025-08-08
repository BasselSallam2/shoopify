import Validator from '../utils/validator.js';

export const createUserValidator = [
  Validator.text('name' , 3) ,
  Validator.email('email'),
  Validator.gender('gender'),
  Validator.phoneNumber('phoneNumber' , 9),
  Validator.password('password' , 6),
  Validator.password('confirmPassword' , 6),
];

