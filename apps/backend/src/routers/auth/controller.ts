import type { Request, Response } from 'express'
import { EmailValidationsSchema, ResendOtpSchema, VerifyEmailValidationSchema } from '@repo/validations'
import { AppError } from '../../utils/erros'
import { Auth_Respository } from './respository'
import { GenerateOtp } from './helper'


export class Auth_Controller {

    static async SignUpController(req: Request, res: Response) {

        const { data, success, error } = EmailValidationsSchema.safeParse(req.body)
        if (!success) {
            throw new AppError(`Invalid Schema: ${error?.issues?.map(i => `${i.path.join('.')}: ${i.message}`).join(", ") || "Validation error"}`, 400)
        }

        let user = await Auth_Respository.FindUser(data.email)

        if (user && user?.verified) {
            const token = Auth_Respository.Generate_Jwt_Token(user.id, user.email)
            return res.status(200).json({
                success: true,
                isExistingUser: true,
                message: "User ALready Exists! Logged in Successfully",
                token: token
            })
        }

        if (!user) {
            user = await Auth_Respository.CreateUser(data.email)
        }


       
        const otp = GenerateOtp()
        console.log("GeneratedOtp String", otp)

       
        await Auth_Respository.SetEmailQueue(`otp:${user.email}`, otp)
        console.log("key", `otp:${user.email}`, "otp", otp)

        
        await Auth_Respository.PushJobToQueue(user.email, "Verification mail", "OTP", otp)


        return res.status(200).json({
            success: true,
            isExistingUser: false,
            message: "OTP Sent to your Email Address"
        })

    }

    static async VerifyEmailController(req: Request, res: Response) {

        const { data, success, error } = VerifyEmailValidationSchema.safeParse(req.body)
        if (!success) {
            throw new AppError(`Invalid Schema: ${error?.issues?.map(i => `${i.path.join('.')}: ${i.message}`).join(", ") || "Validation error"}`, 400)
        }

        const storedOtp = await Auth_Respository.GetOtpFromRedis(data.email)
        if (!storedOtp) {
            throw new AppError("OTP has expired or doesnt Exists", 400)
        }
        console.log("Type of data.otp in verification Schema", typeof (data.otp))

        if (storedOtp !== data.otp) {
            throw new AppError("Invalid OTP", 400)
        }

        const user = await Auth_Respository.createVerifiedUser(data.email)
        const key = `otp:${data.email}`
        await Auth_Respository.DeleteKeyInRedis(key)
        

        const token = Auth_Respository.Generate_Jwt_Token(user.id, user.email)
        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully",
            token: token,
            data:{
                email:user.email,
                id:user.id
            }
        })


    }

    static async ResendOtpController(req: Request, res: Response) {

        const { data , success } = ResendOtpSchema.safeParse(req.body)
        if(!success){
            throw new AppError("Invalid Schema",400)
        }
        
        let user = await Auth_Respository.FindUser(data.email)
        if(!user){
            throw new AppError("User not found or not verified",404)
        }

        if(user.verified){
            return res.status(200).json({
                success:true,
                messsage:"User already verified"       
            })
        }

        const otp = GenerateOtp()
        await Auth_Respository.SetEmailQueue(`otp:${user.email}`, otp)
        await Auth_Respository.PushJobToQueue(user.email, "Verification mail", "OTP", otp)
        
         return res.status(200).json({
            message:"OTP Resend Successfully",
            success:true
        })

    }

    static async MeController(req: Request, res: Response) {
        
        
        const user = Auth_Respository.FindUser(req.user?.email as string)
        const foundUser = await user;
        if(!foundUser || !foundUser.verified){
            return res.status(401).json({
                success:false,
                message:"User not found or not verified"
            })
        }
        return res.status(200).json({
            success:true,
            data:{
                email:foundUser.email,
                id:foundUser.id
            }
        })
    }
}