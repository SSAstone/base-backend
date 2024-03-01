import { Request, Response } from 'express';
import User, { UserDocument } from '../model/user';
import Otp from '../model/otp';
import ErrorResponse from '../../../lib/api_response/error_response';
import DataResponse from '../../../lib/api_response/data_response';
export const forgetUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json(new ErrorResponse(400, 'there is no user with this email'))
        }
        // findUser.isVerified = false;
        // findUser.save();
        const otp = await Otp.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
        setTimeout(async () => {
            await Otp.deleteOne({ email });
            console.log('OTP deleted after one minutes');
        }, 1 * 60 * 1000);
        res.status(201).json(new DataResponse(201, 'otp send', otp))
    } catch (error: any) {
        console.log(error)
    }
}