import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateRequest<T extends z.ZodType<any, any>>(val: T) {
    return async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            // console.log('req.body validation', req.body)
            const inputData: z.infer<T> = val.safeParse(req.body);

            if (!inputData.success) {
                const errorMessages = inputData.error.issues.map((issue: { message: any; }) => issue.message);
                return res.status(400).json({ success: false, message: "Validation error", errors: errorMessages });
            }
            req.validatedData = inputData;
            next();
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
}