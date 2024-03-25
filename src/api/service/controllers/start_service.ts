import { Request, Response } from "express"
import Service from "../models/service"
import { ApiResponse } from "../../../lib/api_response/response"

export const startService = async (req: Request | any , res: Response) => {
    try {
        const { role } = req?.user
        console.log("🚀 ~ startService ~ role:", role)
        const { name } = req?.body
        const service = await Service.create({ name })
        res.status(200).json(ApiResponse.response(200, 'Service started', service))
    } catch (error: any) {
        console.log(error)
    }
}