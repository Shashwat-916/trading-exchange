import dotenv from "dotenv"
dotenv.config()

export const OTP_EXPIRY     = 300
export const BACKEND_URL    =process.env.BACKEND_URL
export const DATABASE_URL   =process.env.DATABASE_URL
export const REDIS_URL      =process.env.REDIS_URL
export const JWT_SECRET     =process.env.JWT_SECRET
export const SMTP_HOST      =process.env.SMTP_HOST
export const SMTP_USER      =process.env.SMTP_USER
export const SMTP_PASS      =process.env.SMTP_PASS
export const SMTP_PORT      =process.env.SMTP_PORT
