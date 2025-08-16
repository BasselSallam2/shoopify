import GenericController from "@shared/genericController.js";
import customerService from "./customer.services.js";
import CustomerSanitizer from "@modules/Customer/customer.sanitize.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import apiResponse from "@utils/apiResponse.js";

class CustomerController extends GenericController<any> {
  constructor() {
    super(customerService);
    this.sanitizeOption = CustomerSanitizer;
  }

  public override getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    const { sotreId } = req.params;
    const { documents, paginationResult } = await this.service.getAll(
      query,
      undefined,
      this.sanitizeOption,
      sotreId
    );
    if (!documents) {
      apiResponse.empty(res);
      return;
    }
    apiResponse.getMany(res, documents, paginationResult);
    return;
  });

  public override createOne = asyncHandler(
    async (req: Request, res: Response) => {
      const t = req.t;
      const { storeId } = req.params;
      const { body } = req;
      const document = await this.service.createOne(body, storeId);
      apiResponse.success(res, t, 201, `Created_Successfully`, {
        id: document._id,
      });
      return;
    }
  );
}

export default new CustomerController();
