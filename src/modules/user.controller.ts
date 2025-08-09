
import userModel from "../modules/user.model.js";
import { Request, Response, NextFunction } from "express";
import CoreController from "../shared/controllerCore.js";
import IUser from "../modules/user.interface.js";
import {Document} from "mongoose";
import bcrypt from "bcryptjs";

type UserDocument = Document & IUser ;

class UserController extends CoreController<UserDocument> {
    constructor() {
        super(userModel);
    }

     override async create (req: Request, res: Response, next: NextFunction) {
         try {
      const { name, email, password, gender, phoneNumber } = req.body;
      const existingUser = await userModel.findOne({$or: [{ email }, { phoneNumber }]});
      if (existingUser) {
         res.status(400).json({ message: "User already exists" });
         return;
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const data = await userModel.create({
        name,
        email,
        password: hashedPassword,
        gender,
        phoneNumber,
      });
      res.status(201).json({message: "Document created successfully" , id: data._id});
    } catch (error) {
      next(error);
    }
  }

    protected override getAllSanitize = (data: UserDocument[]) => {
    return data.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar
    }));
};

}


const userController = new UserController();


 export const getAllUsers = userController.getAll;
 export const getUserById = userController.getById;
 export const createUser = userController.create;
 export const updateUserById = userController.updateById;
 export const deleteUserById = userController.deleteById;
 export const deleteAllUsers = userController.deleteAll;

