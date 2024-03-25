import { z } from "zod";

export const productsValidator = z.object({
    name: z.string().min(3),
    description: z.string().min(3).optional(),
    price: z.string().optional(),
    quantity: z.number().optional(),
    image: z.any().optional(),
    category: z.any(),
})

export type productsValidatorType = z.infer<typeof productsValidator>
