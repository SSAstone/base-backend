import { ObjectId } from 'mongodb';
import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts"
import { ApiResponse } from "../../../lib/api_response/response";
import Product from '../../product/models/product';

const sslCommerzPayment = async (req: Request | any, res: Response) => {

    try {
        const { productId } = req.body
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
                        totalPrice: { $multiply: [{ $toDouble: "$price" }, product.quantity] }
                    }
                }
            ];
            const result = await Product.aggregate(pipeline);
            totalPrice += result[0].totalPrice;
        }

        const data = {
            total_amount: totalPrice,
            currency: 'BDT',
            tran_id: new ObjectId().toHexString(),
            success_url: 'http://localhost:3000/',
            fail_url: 'http://localhost:3000/payment/fail',
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

        const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false);
        sslcz.init(data).then((apiResponse: any) => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            console.log('Redirecting to: ', GatewayPageURL)
            res.send(ApiResponse.response(200, 'Success', GatewayPageURL))
        });
        
    } catch (error) {
        console.log("🚀 ~ sslCommerzPayment ~ error:", error)
        return res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'))
    }

}

export default sslCommerzPayment;