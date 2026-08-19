import z from 'zod'

export const EmailValidationsSchema = z.object({
    email: z.email()
})