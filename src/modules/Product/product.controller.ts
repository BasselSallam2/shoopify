import GenericController from "@shared/genericController.js";
import prdocutService from "@/modules/Product/product.servicess.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import apiResponse from "@utils/apiResponse.js";

class ProductController extends GenericController<any> {
  constructor() {
    super(prdocutService);
  }

    public override createOne = asyncHandler(async (req: Request, res: Response) => {
        const t = req.t;
        const images = (req.files as Express.Multer.File[]).map(file => file.path);
        console.log("file" , images);
        const {body} = req;
        const document = await this.service.createOne(body , images);
        apiResponse.success(res , t , 201 , `Created_Successfully` ,{ id: document._id});
        return;
      });




}

export default new ProductController();
