import { z } from 'zod'

export const EmailValidationsSchema = z.object({
    email: z.email()
})

export const VerifyEmailValidationSchema = z.object({
    otp: z.coerce.string(),
    email: z.email()
})

export const ResendOtpSchema = z.object({
    email:z.email()
})