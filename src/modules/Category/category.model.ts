import { Schema, model, Document } from "mongoose";
import ICategory from "@/modules/Category/category.interface.js";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category" , default: null},
    ancestors: [{ id: { type: Schema.Types.ObjectId, default: null }, name: { type: String, default: null } } ],
    image: { type: String, default: null },
    showInHome: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
  },
  {
    timestamps: true,
  }
);

const categoryModel = model<ICategory>("Category", categorySchema);

export default categoryModel;
