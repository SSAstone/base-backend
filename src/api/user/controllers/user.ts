import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express"
import User from '../models/user';
import { ApiResponse } from '../../../lib/api_response/response';

export const fetchUser = async (req: Request | any, res: Response) => {
    try {
        const decodedToken = req?.user

        const user = await User.findById(decodedToken?._id).select("-password -assessToken -refreshToken")

        if (!user) {
            return res.status(401).json(ApiResponse.errorResponse(401, "Invalid access token"))
        }
        return res.status(200).json(ApiResponse.response(200, "User successfully fetched", user))
    } catch (error) {
        console.log(error)
    }
}