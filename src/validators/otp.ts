import { z } from "zod";

export const OtpValidator = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  otp: z.string().min(4, { message: "Otp must be at least 6 characters long." }),
});

export type OtpValidatorType = z.infer<typeof OtpValidator>;