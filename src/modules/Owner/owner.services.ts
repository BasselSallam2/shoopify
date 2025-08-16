import GenericServices from "@/services/genericServices.js";
import { Model } from "mongoose";
import Owner from "@modules/Owner/owner.interface.js";
import OwnerModel from "@modules/Owner/owner.model.js";
class ownerService extends GenericServices<Owner> {
  constructor(model: Model<Owner>) {
    super(model);
  }
}

export default new ownerService(OwnerModel);
