import type { Request, Response, NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/config'

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string
                id: string
            }
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header is missing",
            success: false
        })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: "Token is missing",
            success: false
        })
    }

    try {
        const secret = JWT_SECRET || process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                message: "JWT secret is not configured",
                success: false
            })
        }

        const decoded = jwt.verify(token, secret) as JwtPayload & { id?: string; email?: string }
        if (!decoded || typeof decoded === 'string' || !decoded.id || !decoded.email) {
            return res.status(401).json({
                message: "Invalid token payload",
                success: false
            })
        }

        req.user = {
            id: decoded.id,
            email: decoded.email
        }

        next()
    } catch (e) {
        console.error("userMiddleware auth error:", e)
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        })
    }
}