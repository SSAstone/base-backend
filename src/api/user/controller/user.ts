import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express"
import User from '../model/user';
import ErrorResponse from '../../../lib/api_response/error_response';
import DataResponse from '../../../lib/api_response/data_response';

export const fetchUser = async (req: Request | any, res: Response) => {
    try {
        const decodedToken = req?.user

        const user = await User.findById(decodedToken?._id).select("-password -assessToken -refreshToken")

        if (!user) {
            return res.status(401).json(new ErrorResponse(401, "Invalid access token"))
        }
        return res.status(201).json(new DataResponse(201, "User", user))
    } catch (error) {
        console.log(error)
    }
}