import { z } from "zod";

export const userValidator = z.object({
    email: z.string().email({ message: "Invalid email format." }),
    username: z.string().min(3),
    password: z.string().min(6),
    role: z.string().optional(),
    isVerified: z.boolean().optional(),
    refreshToken: z.string().optional(),
    assessToken: z.string().optional(),
    isPasswordCorrect: z.function().args(z.string()).returns(z.boolean()),
    generateRefreshToken: z.function().returns(z.string()),
    generateAccessToken: z.function().returns(z.string()),
    createdAt: z.date(),
})

export type UserValidatorType = z.infer<typeof userValidator>

export type ModifiedUserValidatorType = UserValidatorType & { isModified: (field: string) => boolean };

export const emailValidator = z.object({
    email: z.string().email({ message: "Invalid email format." })
})

export const passwordValidator = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6).optional(),
    email: z.string().email({ message: "Invalid email format." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
})

export const loginValidator = z.object({
    username_email: z.string(),
    password: z.string().min(6),
})


