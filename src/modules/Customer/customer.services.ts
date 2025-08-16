import GenericServices from "@/services/genericServices.js";
import { Model, PopulateOptions } from "mongoose";
import User from "./customer.interface.js";
import UserModel from "./customer.model.js";
import ApiFeature from "@/utils/apiFeatures.js";
class customerService extends GenericServices<User> {
  constructor(model: Model<User>) {
    super(model);
  }

  public override async getAll(
    reqQuery: any,
    populateOption?: PopulateOptions,
    sanitizeOption?: string[],
    storeId?: string
  ) {
    const documentsCount = await this.model.countDocuments().cache();
    let query = this.model.find();
    reqQuery.store = storeId;
    if (populateOption) {
      query = query.populate(populateOption);
    }
    const { MongooseQuery, paginationResult } = new ApiFeature(query, reqQuery)
      .filter()
      .sort()
      .sanitize(sanitizeOption)
      .select()
      .paginate(documentsCount);

    let documents = await MongooseQuery.lean().cache().exec();
    return { documents, paginationResult };
  }

  public override createOne(body: any, storeId: string) {
    body = { ...body, store: storeId };
    const query = this.model.create(body);
    return query;
  }
}

export default new customerService(UserModel);
