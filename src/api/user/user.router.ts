import { Router } from "express";
const userRouter = Router();
import { allUsers } from "./controller/all_user";
import { createUser } from "./controller/create_user";
import { userVerified } from "./controller/otp_verified";
import { loginUser } from "./controller/login_user";
import { resetPassword } from "./controller/reset_password";
import { forgetUser } from "./controller/forget_user";
import { verifyAccessToken } from "../../middleware/auth";
import { fetchUser } from "./controller/user";

userRouter.get('/', verifyAccessToken, allUsers)
userRouter.post('/', createUser)
userRouter.get('/me', verifyAccessToken, fetchUser)
userRouter.post('/login', loginUser)
userRouter.post('/verified', userVerified)
userRouter.post('/forget_password', forgetUser)
userRouter.post('/reset_password', resetPassword)

export default userRouter