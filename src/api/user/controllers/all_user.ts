import { Request, Response } from "express"
import mongoose from "mongoose"
import User from "../models/user"
import { UserValidatorType } from "../../../validators/user"

export const allUsers = async (req: Request | any, res: Response) => {
    try {
        let users: UserValidatorType[] = await User.find().select("-password -assessToken -refreshToken")
        res.status(200).json(users)
    } catch (error: any) {
        console.log(error)
    }
}