import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/erros'

export const ErrorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log(err)

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })

}