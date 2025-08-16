import { Model, PopulateOptions } from "mongoose";
import ApiFeature from "@/utils/apiFeatures.js";

export class GenericServices<T> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  public deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  public softDeleteById(id: string) {
    let query = this.model.findByIdAndUpdate(id, {
      deleted: true,
    });
    return query;
  }

  public deleteMany(fillter: any) {
    const query = this.model.deleteMany(fillter);
    return query;
  }

  public updateById(id: string, body: any) {
    const query = this.model.findByIdAndUpdate(id, body);
    return query;
  }

  public updateMany(filter: any, body: any) {
    const query = this.model.updateMany(filter, body);
    return query;
  }

  public createOne(body: any , ...args: any[]) {
    const query = this.model.create(body);
    return query;
  }

  public createMany(body: any) {
    return this.model.create(body);
  }

  public getOne(id: string, populateOption?: PopulateOptions , sanitizeOption?: string[]) {
    let query = this.model.findById(id);
    if (populateOption) {
      return (query = query.populate(populateOption));
    }
    if (sanitizeOption) {
      let sanatizeStr = sanitizeOption.map(f => `-${f}`).join(" ") + " -__v";
      return (query = query.select(sanatizeStr));
    }
    return query;
  }

  public async getAll  (reqQuery:any , populateOption?: PopulateOptions, sanitizeOption?: string[] , args?: any) {
        const documentsCount = await this.model.countDocuments().cache();
        let query = this.model.find();
        if (populateOption) {
          query = query.populate(populateOption);
        }
        const { MongooseQuery, paginationResult } = new ApiFeature(
          query,
          reqQuery
        )
          .filter()
          .sort()
          .sanitize(sanitizeOption)
          .select()
          .paginate(documentsCount);

        let documents =  await MongooseQuery.lean().cache().exec();
        return {  documents, paginationResult }; ;
  }
}

export default GenericServices;
