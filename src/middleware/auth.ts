
import { NextFunction, Request, Response } from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import { ApiResponse } from "../lib/api_response/response"


export const verifyAccessToken = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(ApiResponse.errorResponse(401, "Invalid access token"));
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).json(ApiResponse.errorResponse(401, "Token expired"));
                }
                return res.status(401).json(ApiResponse.errorResponse(401, "Invalid access token"));
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json(ApiResponse.errorResponse(401, "Server Internal Error"));
    }
};