import GenericController from "@shared/genericController.js";
import categoryService from "@/modules/Category/category.services.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import apiResponse from "@utils/apiResponse.js";

class CategoryController extends GenericController<any> {
  constructor() {
    super(categoryService);
  }

  public override createOne = asyncHandler(async (req: Request, res: Response) => {
      console.log("file" , req.file);
      console.log("body:" , req.body);
      const t = req.t;
      const image = req.file?.path ;
      const {body} = req;
      const document = await this.service.createOne(body , image);
      apiResponse.success(res , t , 201 , `Created_Successfully` ,{ id: document._id});
      return;
    });

  
}

export default new CategoryController();
