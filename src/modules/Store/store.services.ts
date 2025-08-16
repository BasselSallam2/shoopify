import GenericServices from "@/services/genericServices.js";
import { Model } from "mongoose";
import Store from "@/modules/Store/store.interface.js";
import StoreModel from "@/modules/Store/store.model.js";
class storeService extends GenericServices<Store> {
  constructor(model: Model<Store>) {
    super(model);
  }

  public override createOne(body: any, ownerId: string) {
    body = { ...body, owner: ownerId };
    const query = this.model.create(body);
    return query;
  }
}

export default new storeService(StoreModel);
