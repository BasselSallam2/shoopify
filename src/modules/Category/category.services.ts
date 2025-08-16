import GenericServices from "@/services/genericServices.js";
import { Model } from "mongoose";
import Category from "@/modules/Category/category.interface.js";
import CategoryModel from "@/modules/Category/category.model.js";
class categoryService extends GenericServices<Category> {
  constructor(model: Model<Category>) {
    super(model);
  }


    public override createOne(body: any , image: string) {
    body = { ...body, image };
    const query = this.model.create(body);
    return query;
  }


  


}

export default new categoryService(CategoryModel);
