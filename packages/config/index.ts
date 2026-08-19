import dotenv from "dotenv"
dotenv.config()


export const BACKEND_URL = process.env.BACKEND_URL
export const DATABASE_URL = process.env.DATABASE_URL
export const REDIS_URL = process.env.REDIS_URL
export const JWT_SECRET = process.env.JWT_SECRET

