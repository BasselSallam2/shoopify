import e from "express";

export class ApiError extends Error {
    statusCode: number;
    status: 'fail' | 'error';
    isOperational: boolean;

    constructor(statusCode: number, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Object.setPrototypeOf(this, ApiError.prototype);
        this.name = this.constructor.name;
    }
}

export default ApiError ;
