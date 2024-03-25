import { Request, Response } from "express";
import category from "../models/category";
import { ApiResponse } from "../../../lib/api_response/response";
import { categoryValidatorType } from "../../../validators/category";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, _id } = req.body
        console.log("🚀 ~ createCategory ~ name:", name)
        if (_id) {
            console.log("🚀 ~ createCategory ~ _id:", _id)
            const categories = await category.findByIdAndUpdate(_id, { name })
            res.status(201).json(ApiResponse.response(201, 'Category updated', categories))
        } else {
            const categories = await category.create({ name })
            res.status(201).json(ApiResponse.response(201, 'Category created', categories))
        }
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}

export const allCategory = async (req: Request, res: Response) => {
    try {
        const categories: categoryValidatorType[] = await category.find();
        res.status(200).json(ApiResponse.response(200, 'Categories', categories))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}