import GenericController from "@shared/genericController.js";
import storeService from "@/modules/Store/store.services.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import apiResponse from "@utils/apiResponse.js";

class Storeontroller extends GenericController<any> {
  constructor() {
    super(storeService);
  }

  public override createOne = asyncHandler(
    async (req: Request, res: Response) => {
      const t = req.t;
      const { body } = req;
      const { ownerId } = req.params;
      const document = await this.service.createOne(body, ownerId);
      apiResponse.success(res, t, 201, `Created_Successfully`, {
        id: document._id,
      });
      return;
    }
  );
}

export default new Storeontroller();
