import { z } from 'zod'

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const EmailValidationsSchema = z.object({
    email: z.string().regex(EMAIL_REGEX, { message: "Please enter a valid @gmail.com email address" })
})

export const VerifyEmailValidationSchema = z.object({
    otp: z.coerce.string(),
    email: z.string().regex(EMAIL_REGEX, { message: "Please enter a valid @gmail.com email address" })
})

export const ResendOtpSchema = z.object({
    email: z.string().regex(EMAIL_REGEX, { message: "Please enter a valid @gmail.com email address" })
})
