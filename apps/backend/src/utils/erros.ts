
/**
 * message,
 * statusCode
 * success/failure (boolean)
 */

export class AppError extends Error {

    public statusCode: number;
    public isOperation: boolean;

    constructor(message: string, statusCode: number = 500, isOperation: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperation = isOperation;

        // setPrototypeOf - this must be done to properly inherit class features
        // captureStackTrace - location of the error for debug
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

}

