import { Router } from 'express'
import { Auth_Controller } from './controller'
import { AsynHandler } from '../../utils/asyncHandler'

export const authRouter = Router()



authRouter.post("/signup", AsynHandler(Auth_Controller.SignUpController))
authRouter.post("/verify-otp", AsynHandler(Auth_Controller.VerifyEmailController))
authRouter.post("/resend-otp", AsynHandler(Auth_Controller.ResendOtpController))
authRouter.get("/me", AsynHandler(Auth_Controller.MeController))
