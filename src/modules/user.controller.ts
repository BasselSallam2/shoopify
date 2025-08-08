
import userModel from "../modules/user.model.js";
import { Request, Response, NextFunction } from "express";
import CoreController from "../shared/controllerCore.js";

 const coreUserController = new CoreController(userModel);

 export const getAllUsers = coreUserController.getAll;
 export const getUserById = coreUserController.getById;
 export const createUser = coreUserController.create;
 export const updateUserById = coreUserController.updateById;
 export const deleteUserById = coreUserController.deleteById;
 export const deleteAllUsers = coreUserController.deleteAll;

