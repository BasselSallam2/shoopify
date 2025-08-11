// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import ApiError from "@/utils/apiError.js";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err); 

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0] as string;
        const value = err.keyValue[field];
        return res.status(400).json({
            status: "fail",
            message: `${field}: ${value} is already taken`
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    res.status(500).json({
        status: "error",
        message: "Something went wrong"
    });
};
