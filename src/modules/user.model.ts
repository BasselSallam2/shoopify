// src/models/User.ts
import { Schema, model , Document} from 'mongoose';
import {otpExpiry , otpDigits} from "./user.config.js";


// interface

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
//   store: string;
  otp: string;
  otpResetExpires: Date;
  otpResetVerified: boolean;
}

////////////////////////////////////

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, lowercase: true, trim: true, default: null },
    gender: { type: String, required: true , enum: ['male', 'female']},
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    passwordResetCode: { type: String, required: true , default: null },
    passwordResetExpires: { type: Date, required: true , default: null },
    passwordResetVerified: { type: Boolean, required: true, default: false },
    active: { type: Boolean, required: true, default: true },
    avatar: { type: String, required: true },
    deleted: { type: Boolean, required: true, default: false },
    phoneVerified: { type: Boolean, required: true, default: false },
    // store: { type: String, required: true },
    otp: { type: String, required: true },
    otpResetExpires: { type: Date, required: true ,  default: () => new Date(Date.now() + otpExpiry) },
    otpResetVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
   this.otp = Math.floor(Math.pow(10, otpDigits - 1) + Math.random() * 9 * Math.pow(10, otpDigits - 1)).toString();
  }
  next();
});

const User = model<User>('User', userSchema);

export default User;
