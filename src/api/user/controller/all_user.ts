import { Request, Response } from "express"
import mongoose from "mongoose"
import User, { UserDocument } from "../model/user"

export const allUsers = async (req: Request | any, res: Response) => {
    console.log("🚀 ~ allUsers ~ req:", req?.user)
    try {
        let users: UserDocument[] = await User.find()
        res.status(200).json(users)
    } catch (error: any) {
        console.log(error)
    }
}