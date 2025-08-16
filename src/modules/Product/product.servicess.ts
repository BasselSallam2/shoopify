import GenericServices from "@services/genericServices.js";
import { Model } from "mongoose";
import Prodcut from "@modules/Product/product.interface.js";
import ProductModel from "@modules/Product/product.model.js";
class productService extends GenericServices<Prodcut> {
  constructor(model: Model<Prodcut>) {
    super(model);
  }
    public override createOne(body: any , images: string[]) {
      console.log("fgg" , images);
    body = { ...body, images };
    const query = this.model.create(body);
    return query;
  }


}

export default new productService(ProductModel);
