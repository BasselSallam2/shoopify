
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { GenericServices } from "@services/genericServices.js";
import apiResponse from "@/utils/apiResponse.js";
export class GenericController<T> {
   service: GenericServices<T>;
   public sanitizeOption?: string[];
  constructor(service: GenericServices<T>) {
    this.service = service;
  }

  public getAll = asyncHandler( async(req: Request , res: Response) => {
    const query = req.query;
    const { documents , paginationResult} = await this.service.getAll(query , undefined , this.sanitizeOption);
    if(!Array.isArray(documents) || documents.length === 0) {
       apiResponse.empty(res);
       return;
    }
    apiResponse.getMany(res , documents , paginationResult);
    return;
  });

  public getOne = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {id} = req.params;
    const document = await this.service.getOne(id as string , undefined , this.sanitizeOption);
    if (!document) {
       apiResponse.notFound(res, t);
       return;
    }
    apiResponse.getOne(res , document);
    return;
  });


  public deleteById = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {id} = req.params;
    const document = await this.service.deleteById(id as string);
    if (!document) {
       apiResponse.notFound(res , t);
       return;
    }
    apiResponse.deleteOne(res , t , id as string );
    return;
  });

  public softDeleteById = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {id} = req.params;
    const document = await this.service.softDeleteById(id as string);
    if (!document) {
       apiResponse.notFound(res ,t);
       return;
    }
    apiResponse.deleteOne(res , t , id as string);
    return;
  });

  public deleteMany = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {body} = req;
    const document = await this.service.deleteMany(body);
    if (!document) {
       apiResponse.notFound(res , t);
       return;
    }
    apiResponse.deleteMany(res , t , document);
    return;
  });

  public updateById = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {id} = req.params;
    const {body} = req;
    const document = await this.service.updateById(id as string , body);
    if (!document) {
       apiResponse.notFound(res , t);
       return;
    }
    apiResponse.updateOne(res , t, document);
    return;
  });

  public updateMany = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {body , filter} = req.body;
    console.log(body);
    const document = await this.service.updateMany(filter , body);
    if (document.matchedCount === 0) {
       apiResponse.updateManyNoMatch(res , t);
       return;
    }
    apiResponse.updateMany(res , t , document);
    return;
  });

  public createOne = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {body} = req;
    const document = await this.service.createOne(body);
    apiResponse.success(res , t , 201 , `Created_Successfully` ,{ id: document._id});
    return;
  });

  public createMany = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const {body} = req;
    const document = await this.service.createMany(body);
    apiResponse.success(res , t , 201 , "Created_Successfully" , document);
    return;
  });

  
}

export default GenericController;
