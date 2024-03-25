import { z } from "zod";

export const serviceValidator = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  code: z.string().optional(),
  service: z.string().min(1, { message: "Service is required." }),
  amount: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  
});

export type serviceValidatorType = z.infer<typeof serviceValidator>;