import { Request, Response } from "express"
import User from "../models/user";
import { ApiResponse } from "../../../lib/api_response/response";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username_email, password } = req.body;
        console.log("🚀 ~ loginUser ~ username_email:", username_email)
        const emailIs = username_email.includes('@') ? username_email : undefined;
        const email = emailIs.includes('gmail') ? emailIs : undefined;
        const username = username_email.includes('@') ? !email ? username_email : undefined : username_email;

        if(!password || (!username && !email)) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'Username or email or password is required'))
        }
        const findUser = await User.findOne({ $or: [{ username }, { email }]});
        if(!findUser) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'User not found'))
        }
        const userPasswordCorrect = findUser.isPasswordCorrect(password);
        if(!userPasswordCorrect) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'Invalid credentials'))
        }
        if(!findUser.isVerified) {
            return res.status(400).json(ApiResponse.errorResponse(400, 'User not verified'))
        }
        findUser.refreshToken = findUser.generateRefreshToken();
        findUser.assessToken = findUser.generateAccessToken();
        await findUser.save({ validateBeforeSave: false });
        
        res.status(201)
        .cookie('accessToken', findUser.assessToken)
        .cookie('refreshToken', findUser.refreshToken)
        .json(ApiResponse.response(201, 'Login successfully', {
            _id: findUser._id,
            createAt: findUser.createdAt,
            accessToken: findUser.generateAccessToken()
        }))

    } catch (error) {
       res.status(400).json(ApiResponse.errorResponse(400, 'Invalid credentials')) 
    }
}