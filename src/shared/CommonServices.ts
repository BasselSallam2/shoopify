
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import ApiError from "@utils/apiError.js";
import { Request, Response, NextFunction } from "express";


export const hashPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password) return next(new ApiError(400, "Password is required"));
    const hashedPassword = await bcrypt.hash(password, 12);
    req.body.password = hashedPassword;
    next();
});
