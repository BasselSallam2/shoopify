// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import { otpExpiry, otpDigits } from "@modules/Customer/customer.config.js";
import IUser from "@/modules/Customer/customer.interface.js";
import { hashPasswordPlugin } from "@/shared/commonPlugins.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true, trim: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetCode: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
    passwordResetVerified: { type: Boolean, default: false },
    active: { type: Boolean, required: true, default: true },
    avatar: { type: String, default: null },
    deleted: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    otp: { type: String },
    otpResetExpires: {
      type: Date,
      default: () => new Date(Date.now() + otpExpiry),
    },
    otpResetVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(hashPasswordPlugin);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.otp = Math.floor(
      Math.pow(10, otpDigits - 1) +
        Math.random() * 9 * Math.pow(10, otpDigits - 1)
    ).toString();
  }
  next();
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
