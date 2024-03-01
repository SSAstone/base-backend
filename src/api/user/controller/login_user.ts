import { Request, Response } from "express"
import ErrorResponse from "../../../lib/api_response/error_response";
import User from "../model/user";
import DataResponse from "../../../lib/api_response/data_response";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username_email, password } = req.body;
        const emailIs = username_email.includes('@') ? username_email : undefined;
        const email = emailIs.includes('gmail') ? emailIs : undefined;
        const username = username_email.includes('@') ? !email ? username_email : undefined : username_email;

        if(!password || (!username && !email)) {
            return res.status(400).json(new ErrorResponse(400, 'Username or email or password is required'))
        }
        const findUser = await User.findOne({ $or: [{ username }, { email }]});
        if(!findUser) {
            return res.status(400).json(new ErrorResponse(400, 'User not found'))
        }
        const userPasswordCorrect = await findUser.isPasswordCorrect(password);
        if(!userPasswordCorrect) {
            return res.status(400).json(new ErrorResponse(400, 'Invalid credentials'))
        }
        if(!findUser.isVerified) {
            return res.status(400).json(new ErrorResponse(400, 'User not verified'))
        }
        findUser.refreshToken = findUser.generateRefreshToken();
        findUser.assessToken = findUser.generateAccessToken();
        await findUser.save({ validateBeforeSave: false });
        
        res.status(201)
        .cookie('accessToken', findUser.assessToken)
        .cookie('refreshToken', findUser.refreshToken)
        .json(new DataResponse(201, 'Login successfully', {
            _id: findUser._id,
            createAt: findUser.createdAt,
            accessToken: findUser.generateAccessToken()
        }))

    } catch (error) {
       res.status(400).json(new ErrorResponse(400, 'Invalid credentials')) 
    }
}