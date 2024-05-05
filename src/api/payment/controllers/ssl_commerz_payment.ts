import { ObjectId } from 'mongodb';
import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts"
import { ApiResponse } from "../../../lib/api_response/response";
import Product from '../../product/models/product';


const sslCommerzPayment = async (req: Request | any, res: Response) => {

    try {
        const { productId } = req.body

        const productData = []
        let totalPrice = 0;
        for (const product of productId) {
            const pipeline = [
                {
                    $match: {
                        _id: ObjectId.createFromHexString(product._id.toString())
                    }
                },
                {
                    $project: {
                        totalPrice: { $multiply: [{ $toDouble: "$price" }, product.quantity] },
                        name: 1,
                        image: 1,
                        _id: 1,
                        price: 1,
                        categoryId: 1,
                        description: 1,
                        quantity: product.quantity
                    }
                }
            ];
            const result = await Product.aggregate(pipeline);
            totalPrice += result[0].totalPrice;
            productData.push(result[0])
        }
        
        console.log("🚀 ~ sslCommerzPayment ~ productData:", productData)
        const tranId = new ObjectId().toHexString()
        
        const data = {
            total_amount: totalPrice,
            currency: 'BDT',
            tran_id: tranId,
            success_url: `http://localhost:5550/payment/success/${tranId}`,
            fail_url: 'http://localhost:3030/payment/fail',
            cancel_url: 'http://localhost:3000/cancel',
            ipn_url: 'http://localhost:3000/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        } as any;

        const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, process.env.NODE_ENV !== 'production');
        sslcz.init(data).then((apiResponse: any) => {
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send(ApiResponse.response(200, 'Success', GatewayPageURL))
        });
    } catch (error) {
        return res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }

}

export default sslCommerzPayment;

export const sslCommerzSuccess = async (req: Request | any, res: Response) => {
    try {

        const { id } = req.params
        console.log("🚀 ~ sslCommerzSuccess ~ tran_id:", id)
        res.redirect(`${'http://localhost:3000/payment/success'}`)

    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
        
    }
}