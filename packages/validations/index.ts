import z, { email } from 'zod'

export const EmailValidationsSchema = z.object({
    email: z
        .email()
})

export const VerifyEmailValidationSchema = z.object({
    otp: z
        .string()
        .length(6)
        .regex(/^[0-9]{6}$/),
    email:z.email()    
})