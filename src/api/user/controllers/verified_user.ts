import { Request, Response } from "express";
import User from "../models/user";
import { ApiResponse } from "../../../lib/api_response/response";
import Otp from "../models/otp";

export const verifiedUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'there is no user with this email'))
        }
        // findUser.isVerified = false;
        // findUser.save();
        const otp = await Otp.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
        setTimeout(async () => {
            await Otp.deleteOne({ email });
            console.log('OTP deleted after one minutes');
        }, 1 * 60 * 1000);
        res.status(201).json(ApiResponse.response(201, 'send otp', otp))
    } catch (error: any) {
        console.log(error)
    }
}

export const sendOtp = async (req: Request, res: Response) => {
    try {
        const { otp } = req.body;
        const findOtp = await Otp.findOne({ otp })
        if(!findOtp) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'Invalid otp'))
        }
        const user = await User.findOne({ email: findOtp?.email })
        user.isVerified = true;
        user.save();
        res.status(201).json(ApiResponse.response(201, 'User verified', user.email))
    } catch (error: any) {
        console.log(error)
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { password, confirmPassword, email } = req.body;
        if(password !== confirmPassword) {
            res.status(400).json(ApiResponse.errorResponse(400, 'Password and confirm password does not match'));
        };
        const findUser = await User.findOne({ email });
        if(!findUser) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'User not found'));
        };
        if(!findUser.isVerified) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'User not verified'));
        };
        findUser.password = password;
        await findUser.save();
        res.status(201).json(ApiResponse.response(201, 'Password reset successfully'));
    } catch (error: any) {
        console.log(error)
    }
}