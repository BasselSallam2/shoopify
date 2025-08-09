
import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

class CoreController<T extends Document> {
  constructor(private model: Model<T>) {}

  protected getAllSanitize = (data: T[]) => {};
  protected getOneSanitize = (data: T) => {};



  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.find();
      const sanitizedData = this.getAllSanitize(data);
      res.status(200).json(sanitizedData);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const document = await this.model.findById(id);
      if(!document) {
        return res.status(404).json({message: "Document not found"});
      }
      const sanitizedData = this.getOneSanitize(document);
      res.status(200).json(sanitizedData);
    } catch (error) {
      next(error);
    }
  };

 async create (req: Request, res: Response, next: NextFunction)   {
    try {
      const data = await this.model.create(req.body);
      res.status(201).json({message: "Document created successfully" , id: data._id});
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const document = await this.model.findById(id);
      if(!document) {
        return res.status(404).json({message: "Document not found"});
      }
      res.status(200).json({message: "Document deleted successfully" , id: id});
    } catch (error) {
      next(error);
    }
  };


  deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.deleteMany({});
      res.status(200).json({message: "All documents deleted successfully" , count: data.deletedCount});
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const document = await this.model.findById(id);
      if(!document) {
        return res.status(404).json({message: "Document not found"});
      }
      const data = await this.model.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "Document updated successfully" , id: id});
    } catch (error) {
      next(error);
    }
  };
}

export default CoreController;

