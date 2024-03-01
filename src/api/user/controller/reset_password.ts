import { Request, Response } from "express"
import DataResponse from "../../../lib/api_response/data_response";
import ErrorResponse from "../../../lib/api_response/error_response";
import User, { UserDocument } from "../model/user";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { password, confirmPassword, email } = req.body;
        if(password !== confirmPassword) {
            res.status(400).json(new ErrorResponse(400, 'Password and confirm password does not match'));
        };
        const findUser = await User.findOne({ email });
        if(!findUser) {
            return res.status(400).json(new ErrorResponse(400, 'User not found'));
        };
        if(!findUser.isVerified) {
            return res.status(400).json(new ErrorResponse(400, 'User not verified'));
        };
        findUser.password = password;
        await findUser.save();
        res.status(201).json(new DataResponse(201, 'Password reset successfully'));
    } catch (error: any) {
        console.log(error)
    }
}

