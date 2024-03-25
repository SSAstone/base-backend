import { z } from "zod";

export const categoryValidator = z.object({
    name: z.string().min(3),
    _id: z.string().optional()
});

export type categoryValidatorType = z.infer<typeof categoryValidator>;