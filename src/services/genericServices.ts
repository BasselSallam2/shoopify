import { Model, PopulateOptions } from "mongoose";
import  { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ApiError from "@/utils/apiError.js";
import ApiFeature from "@/utils/apiFeatures.js";



export class GenericServices {
  model: Model<any>;
  constructor(model: Model<any>) {
    this.model = model;
  }

  static deleteById(model: Model<any>) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const document = await model.findByIdAndDelete(id);
        if (!document) {
          next(new ApiError(404, "Document not found"));
          return;
        }
        res.status(200).json({ message: "Document deleted successfully" });
      }
    );
  }

  static softDeleteById(model: Model<any>) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const document = await model.findByIdAndUpdate(id, { deleted: true });
        if (!document) {
          next(new ApiError(404, "Document not found"));
          return;
        }
        res.status(200).json({ message: "Document deleted successfully" });
      }
    );
  }

  static deleteMany(model: Model<any>, fillter: any) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const documents = await model.deleteMany(fillter);
        if (!documents) {
          next(new ApiError(404, "Documents not found"));
          return;
        }
        res.status(200).json({ message: "Documents deleted successfully" });
      }
    );
  }

  static updateById(model: Model<any>) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const document = await model.findByIdAndUpdate(id, req.body);
        if (!document) {
          next(new ApiError(404, "Document not found"));
          return;
        }
        res.status(200).json({ message: "Document updated successfully" });
      }
    );
  }

  static updateMany(model: Model<any>, fillter: any) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const documents = await model.updateMany(fillter, req.body);
        if (!documents) {
          next(new ApiError(404, "Documents not found"));
          return;
        }
        res.status(200).json({ message: "Documents updated successfully" });
      }
    );
  }

  static createOne(model: Model<any>) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const document = await model.create(req.body);
        res
          .status(201)
          .json({ message: "Document created successfully", id: document._id });
      }
    );
  }

  static createMany(model: Model<any>) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        if (Array.isArray(body) === false) {
          next(new ApiError(400, "Body must be an array"));
          return;
        }
        const documents = await model.create(req.body);
        res
          .status(201)
          .json({
            message: "Documents created successfully",
            id: documents._id,
          });
      }
    );
  }

  static getOne(model: Model<any>, populateOption?: PopulateOptions) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let query = model.findById(id)
        if (populateOption) {
          query = query.populate(populateOption);
        }
        const document = await query;
        if (!document) {
          next(new ApiError(404, "Document not found"));
          return;
        }
        res.status(200).json(document);
      }
    );
  }

  static getAll(model: Model<any>, populateOption?: PopulateOptions , sanitizeOption?: string[]) {
    return asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const documentsCount = await model.countDocuments();
        let query = model.find()
        if (populateOption) {
          query = query.populate(populateOption);
        }
        const apiFeatures = new ApiFeature(query, req.query)
          .filter()
          .sort()
          .sanitize(sanitizeOption)
          .select()
          .paginate(documentsCount);

        const documents = await apiFeatures.MongooseQuery;

        if (!documents) {
          next(new ApiError(404, "Documents not found"));
          return;
        }
        if(req.query.limit){
          const paginationResult = apiFeatures.paginationResult ;
           res.status(200).json({documents, paginationResult});
           return;
        }

        res.status(200).json(documents);
      }
    );
  }
}


export default GenericServices ;