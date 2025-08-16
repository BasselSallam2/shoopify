import { Schema, model, Document } from "mongoose";
import IProduct from "@/modules/Product/product.interface.js";

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceAfterDiscount: { type: Number, default: null },
    brand: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    thumbnail: { type: String, default: null },
    images: { type: [String], default: [] },
    reviews: [{
      rate: { type: Number },
      comment: { type: String},
      user: { type: Schema.Types.ObjectId, ref: "User" },
    }],
    stock: { type: Number, required: true },
    views: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    sold: { type: Number, default: 0 },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    seo: [{
      title: { type: String},
      description: { type: String},
    }],
    specifications: [{
      name: { type: String},
      value: { type: String },
    }],
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
