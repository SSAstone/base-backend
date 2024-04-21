import { Request, Response } from "express"
import Product from "../models/product"
import { ApiResponse } from "../../../lib/api_response/response"

const editProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, quantity, categoryId, image } = req.body
        const { id } = req.params
        console.log("🚀 ~ editProduct ~ id:", id)
        // const product = await Product.findByIdAndUpdate(id, { name, description, price, quantity, categoryId, image })
        // res.status(201).json(ApiResponse.response(201, 'Product updated', product))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}

export default editProduct

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json(ApiResponse.errorResponse(404, 'Product not found'))
        }
        res.status(200).json(ApiResponse.response(200, 'Product deleted', product))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}