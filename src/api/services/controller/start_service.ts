import { Request, Response } from "express"
import Service from "../model/service"
import DataResponse from "../../../lib/api_response/data_response"

export const startService = async (req: Request | any , res: Response) => {
    try {
        const { role } = req?.user
        console.log("🚀 ~ startService ~ role:", role)
        const { name } = req?.body
        const service = await Service.create({ name })
        console.log("🚀 ~ startService ~ service:", service)
        res.status(200).json(new DataResponse(200, 'Service started', service))
    } catch (error: any) {
        console.log(error)
    }
}