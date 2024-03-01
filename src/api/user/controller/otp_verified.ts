import { Request, Response } from "express"
import DataResponse from "../../../lib/api_response/data_response";
import ErrorResponse from "../../../lib/api_response/error_response";
import User, { UserDocument } from "../model/user";
import Otp from "../model/otp";

export const userVerified = async (req: Request, res: Response) => {
    try {
        const { otp } = req.body;
        const findOtp = await Otp.findOne({ otp })
        console.log("🚀 ~ userVerified ~ findOtp:", findOtp)
        if(!findOtp) {
            return res.status(400).json(new ErrorResponse(400, 'Invalid otp'))
        }
        const user = await User.findOne({ email: findOtp?.email })
        console.log("🚀 ~ userVerified ~ user:", user)
        user.isVerified = true;
        user.save();
        res.status(201).json(new DataResponse(201, 'User verified', user.email))
    } catch (error: any) {
        console.log(error)
    }
}