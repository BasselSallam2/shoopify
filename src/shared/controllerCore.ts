import { Request, Response, NextFunction } from "express";
import { Model, Document, FilterQuery, DeleteResult } from "mongoose";

class CoreController<T extends Document> {
  constructor(private model: Model<T>) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.find();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.model.findById(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.model.findByIdAndDelete(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };


  deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.deleteMany({});
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.model.findByIdAndUpdate(id, req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default CoreController;

