import { Request, Response } from "express"
import Product from "../models/product"
import { ApiResponse } from "../../../lib/api_response/response"

const createProduct = async (req: Request | any, res: Response) => {
    try {
        const { name, description, price, quantity, categoryId, image, _id } = req.body;
        if (_id !== "add") {
            const product = await Product.findByIdAndUpdate(_id, { name, description, price, quantity, categoryId, image })
            return res.status(201).json(ApiResponse.response(201, 'Product created', product))
        }

        const product = await Product.create({ name, description, price, quantity, categoryId, image })
        res.status(201).json(ApiResponse.response(201, 'Product created', product))
    } catch (error: any) {
        console.log(error)
    }
}

export default createProduct


export const allProducts = async (req: Request, res: Response) => {
    try {
        if (req?.params?.id) {
            const findById = await Product.findById(req?.params?.id)
            return res.status(200).json(ApiResponse.response(200, 'product', findById))
        }

        if(req?.query?.ids) {
            const ids = req?.query?.ids as string
            const products = await Product.find({ _id: { $in: ids.split('/') } })
            return res.status(200).json(ApiResponse.response(200, 'products', products))
        }

        const productData = await Product.aggregate([
            {
                $addFields: {
                    "searchId": { $toObjectId: "$categoryId" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "searchId",
                    foreignField: "_id",
                    as: "categoriesData"
                }
            },
            {
                $addFields: {
                    category: { $first: "$categoriesData" },
                }
            },
            {
                $unset: ["searchId", "categoriesData"]
            }
        ])
        res.status(200).json(ApiResponse.paginateResponse(200, 'products', productData))
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }
}