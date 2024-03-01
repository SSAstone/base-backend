
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import ErrorResponse from "../lib/api_response/error_response"
import User from "../api/user/model/user"

export const verifyAccessToken =  async(req: Request | any, res: Response, next : NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            return res.status(401).json( new ErrorResponse(401, "Invalid access token"))
        }
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
            if (err) {
                return res.status(401).json( new ErrorResponse(401, "Invalid access token"))
            }
            req.user = user;
            next()
        })
    
        // const user: any = await User.findById(decodedToken?._id)
    
        // if (!user) {
        //     return res.status(401).json( new ErrorResponse(401, "Invalid access token"))
        // }
    
        // req.user = user;
        // next()
    } catch (error) {
        res.status(401).json( new ErrorResponse(401, "Server Internal Error"))
    }
    
}