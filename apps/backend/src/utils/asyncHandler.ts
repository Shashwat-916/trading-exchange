import type { Request, Response, NextFunction, RequestHandler } from 'express'

interface ExpressRequest {
    req: Request,
    res: Response,
    next: NextFunction
}

export const AsynHandler = (
    handler: RequestHandler
): RequestHandler => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        Promise
            .resolve(handler(req, res, next))
            .catch(next)
    }
}