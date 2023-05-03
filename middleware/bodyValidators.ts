import * as z from 'zod'


export const taskBodySchema = z.object({
    title: z.string().max(128).min(1),
    description: z.string().max(526).optional(),
    isDone: z.boolean(),
    user_id: z.string()
})

export const userBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

