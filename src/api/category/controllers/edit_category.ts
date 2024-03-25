import { Request, Response } from "express";
import { ApiResponse } from "../../../lib/api_response/response";
import Category from "../models/category";

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const { _id } = req.params
        const categories = await Category.findByIdAndUpdate(_id, { name })
        res.status(201).json(ApiResponse.response(201, 'Category updated', categories))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            return res.status(404).json(ApiResponse.errorResponse(404, 'Category not found'))
        }
        res.status(200).json(ApiResponse.response(200, 'Category deleted', category))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}