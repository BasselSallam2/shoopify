import IUser from "@modules/Customer/customer.interface.js";

 const getAllSanitize: (keyof IUser)[] = [
  "password",
  "passwordResetCode",
  "passwordResetExpires",
  "deleted",
  "otp",
  "otpResetExpires",
];

export default getAllSanitize;