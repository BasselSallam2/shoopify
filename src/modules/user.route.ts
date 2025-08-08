import express from "express";
import { createUserValidator } from "./user.validation.js";
import validateResult from "../middlewares/ValidationRequest.js";
import { getAllUsers , getUserById  , createUser , updateUserById , deleteUserById  , deleteAllUsers } from "./user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUserValidator, validateResult, createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.delete("/", deleteAllUsers);



export default router;
