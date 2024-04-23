import { z } from "zod";
import { ObjectId } from "mongodb";

export const productsValidator = z.object({
    name: z.string().min(3),
    description: z.string().min(3).optional(),
    price: z.string().optional(),
    quantity: z.number().optional(),
    image: z.any().optional(),
    // category: z.string({ required_error: "Category is required."}).transform(value => new ObjectId(value)),
    categoryId: z.string({ required_error: "Category is required."}).transform(value => new ObjectId(value)),
    _id: z.string().optional()
});

export type productsValidatorType = z.infer<typeof productsValidator>;
