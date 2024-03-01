import { Request, Response } from "express"
import DataResponse from "../../../lib/api_response/data_response";
import ErrorResponse from "../../../lib/api_response/error_response";
import User, { UserDocument } from "../model/user";
import Otp from "../model/otp";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json(new ErrorResponse(400, 'Email and username and password is required'))
        }
        const findUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (findUser) {
            if (!findUser.isVerified) {
                const otp = await Otp.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
                setTimeout(async () => {
                    await Otp.deleteOne({ email });
                    console.log('OTP deleted after one minutes');
                }, 1 * 60 * 1000);
                return res.status(201).json(new DataResponse(201, 'User is not verified send otp'))
            }
            return res.status(400).json(new ErrorResponse(400, 'User already exists'))
        }
        const user: UserDocument = await User.create({
            email, password, username
        })
        if (!user) {
            return res.status(400).json(new ErrorResponse(400, 'User not created'))
        }
        const otp = await Otp.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
        setTimeout(async () => {
            await Otp.deleteOne({ email });
            console.log('OTP deleted after one minutes');
        }, 1 * 60 * 1000);
        return res.status(201).json(new DataResponse(201, 'User created otp send'))
    } catch (error: any) {
        console.log(error)
    }
}