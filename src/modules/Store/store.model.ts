import { Schema, model, Document } from "mongoose";
import IStore from "@/modules/Store/store.interface.js";

const storeSchema = new Schema<IStore>(
  {
    name: { type: String, required: true },
    subdomain: { type: String, unique: true },
    customDomain: { type: String, unique: true },
    description: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactMail: { type: String, required: true },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "Store", required: true },
  },
  {
    timestamps: true,
  }
);

const StoreModel = model<IStore>("Store", storeSchema);

export default StoreModel;
