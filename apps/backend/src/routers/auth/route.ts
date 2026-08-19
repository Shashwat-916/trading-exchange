import { Router } from 'express'

export const authRouter = Router()

authRouter.post("/signup")
authRouter.post("/verify-otp")
authRouter.post("/resend-otp")
authRouter.get("/me")
