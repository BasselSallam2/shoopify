import GenericServices from "@/services/genericServices.js";
import { Model } from "mongoose";
class customerService extends GenericServices {
    constructor(model: Model<any>) {
        super(model);
    }
}

export default customerService;