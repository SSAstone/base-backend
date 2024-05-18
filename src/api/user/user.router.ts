import { Router } from "express";
const userRouter = Router();
import { allUsers } from "./controllers/all_user";
import { createUser } from "./controllers/create_user";
import { loginUser } from "./controllers/login_user";
import { verifyAccessToken } from "../../middleware/auth";
import { fetchUser } from "./controllers/user";
import { validateRequest } from "../../middleware/validation";
import { OtpValidator } from "../../validators/otp";
import { emailValidator, loginValidator, passwordValidator, userValidator } from "../../validators/user";
import { resetPassword, sendOtp, verifiedUser } from "./controllers/verified_user";

userRouter.get('/', allUsers)
userRouter.post('/', validateRequest(userValidator), createUser)
userRouter.get('/me', verifyAccessToken, fetchUser)
userRouter.post('/login', validateRequest(loginValidator), loginUser)
userRouter.post('/send_otp', validateRequest(OtpValidator), sendOtp)
userRouter.post('/verified', validateRequest(emailValidator), verifiedUser)
userRouter.post('/reset_password', validateRequest(passwordValidator), resetPassword)
 
export default userRouter