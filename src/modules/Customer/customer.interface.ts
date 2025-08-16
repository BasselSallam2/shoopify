import { Document, Schema } from "mongoose";

interface User extends Document {
  id: string;
  name: string;
  email?: string;
  gender: string;
  phoneNumber: string;
  password: string;
  passwordResetCode: string;
  passwordResetExpires: Date;
  passwordResetVerified: boolean;
  active: boolean;
  avatar: string;
  deleted: boolean;
  phoneVerified: boolean;
  store: Schema.Types.ObjectId;
  otp: string;
  otpResetExpires: Date;
  otpResetVerified: boolean;
}

export default User;
