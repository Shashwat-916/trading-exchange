import { JWT_SECRET, OTP_EXPIRY } from "@repo/config"
import { prisma } from "@repo/db"
import { redis } from "@repo/redis"
import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { EmailType } from "./helper"


export class Auth_Respository {

    static async FindUser(email: string) {

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        return user

    }

    static Generate_Jwt_Token(id: string, email: string) {

        const token = jwt.sign({
            id: id,
            email: email
        }, JWT_SECRET as unknown as string)

        return token

    }

    static async CreateUser(email: string) {

        const newUser = await prisma.user.create({
            data: {
                email: email
            }
        })

        return newUser
    }

    static async SetEmailQueue(key: string, otp: string) {
        await redis.set(
            key,
            otp,
            {
                "EX": OTP_EXPIRY
            })
    }

    static async PushJobToQueue(to: string, subject: string, type: EmailType, otp: string ) {
        const job = { to, subject, type, otp }
        await redis.lPush("email-queue", JSON.stringify(job))
        console.log(`Job added to the queue ${to},${subject},${type},${JSON.stringify(otp)}`)
        return
    }

    static async GetOtpFromRedis(email:string){
        const storedOtp = await redis.get(`otp:${email}`)
        return Number(storedOtp)
    }

    static async createVerifiedUser(email:string){
        const user = await prisma.user.update({
            where:{
                email:email
            },
            data:{verified:true}
        })
        return user
    }

    static async DeleteKeyInRedis(key:string){
        await redis.del(key)
        return
    }



}