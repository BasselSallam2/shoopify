// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import IOwner from "@/modules/Owner/owner.interface.js";
import { hashPasswordPlugin } from "@/shared/commonPlugins.js";

const ownerSchema = new Schema<IOwner>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    passwordResetCode: { type: String , default: null},
    passwordResetExpires: { type: Date , default: null},
    passwordResetVerified: { type: Boolean , default: false},
    active: { type: Boolean , default: true},
    avatar: { type: String , default: null},
    deleted: { type: Boolean , default: false},
    phoneVerified: { type: Boolean , default: false},
  },
  {
    timestamps: true,
  }
);

ownerSchema.plugin(hashPasswordPlugin);



const UserModel = model<IOwner>("Owner", ownerSchema);


export default UserModel;
