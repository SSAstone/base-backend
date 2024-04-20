import { z } from "zod";

export const categoryValidator = z.object({
    name: z.string().min(3),
    image: z.any(),
});

export type categoryValidatorType = z.infer<typeof categoryValidator>;