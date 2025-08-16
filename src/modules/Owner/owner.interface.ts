import { Document } from "mongoose";

interface Owner extends Document {
  id: string; // pk
  name: string;
  password: string;
  phoneNumber: string;
  passwordResetCode: string;
  passwordResetExpires: Date; // Datetime
  passwordResetVerified: boolean; // Boolean
  active: boolean; // Boolean
  avatar: string;
  deleted: boolean; // Boolean
  phoneVerified: boolean; // Boolean
}

export default Owner;
