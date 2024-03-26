import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { z } from "zod";
import { ApiResponse } from "../lib/api_response/response";


// export function validateRequest(validators: any) {
//     return async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         if (validators.params) {
//           req.params = await validators.params.parseAsync(req.params);
//         }
//         if (validators.body) {
//           req.body = await validators.body.parseAsync(req.body);
//         }
//         if (validators.query) {
//           req.query = await validators.query.parseAsync(req.query);
//         }
//         next();
//       } catch (error) {
//         if (error instanceof ZodError) {
//           res.status(422);
//         }
//         next(error);
//       }
//     };
//   }


export function validateRequest(val: any) {
    return async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            console.log('req.body validation', req.body)
            const inputData: z.infer<typeof val> = val.safeParse(req.body);
            console.log("🚀 ~ return ~ inputData:", inputData)
            if (!inputData.success) {
                return res.status(400).json(ApiResponse.response(400, 'Validation error', inputData.error, false));
            }
            req.validatedData = inputData;
            next();
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
}