import { Request, Response } from "express"
import Product from "../models/product"
import { ApiResponse } from "../../../lib/api_response/response"
import { productsValidatorType } from "../../../validators/products"
import uploadImage from "../../../lib/utils/upload_image"

const createProduct = async (req: Request | any, res: Response) => {
    try {
        const { name, description, price, quantity, category } = req.body

        // const file = {
        //     type: req.file.mimetype,
        //     buffer: req.file.buffer
        // }
        // const buildImage = await uploadImage(file, 'single');
        const product = await Product.create({ name, description, price, quantity, category, image: [] })
        res.status(201).json(ApiResponse.response(201, 'Product created', product))
    } catch (error: any) {
        console.log(error)
    }
}

export default createProduct


export const allProducts = async (req: Request, res: Response) => {
    try {
        // const products: productsValidatorType[] = await Product.find();

        const productData = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categories_data"
                }
            },
            {
                $addFields: {
                    category: {
                        $arrayElemAt: ["$categories_data", 0]
                    }
                }
            },
            {
                $project: {
                    categories_data: 0,
                    image: 0,
                    description: 0
                }
            }
        ])

        res.status(200).json(ApiResponse.paginateResponse(200, 'products', productData))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}