import IOwner from "@modules/Owner/owner.interface.js";

const getAllSanitize: (keyof IOwner)[] = [
  "password",
  "passwordResetCode",
  "passwordResetExpires",
  "passwordResetVerified",
];

export default getAllSanitize;
