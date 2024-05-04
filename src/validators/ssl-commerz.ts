import { z } from "zod";

export const sslCommerzValidator = z.object({
    // store_id: z.string().optional(),
    // store_passwd: z.string().optional(),
    // total_amount: z.string().optional(),
    // currency: z.string().optional(),
    // tran_id: z.string().optional(),
    // success_url: z.string().optional(),
    // fail_url: z.string().optional(),
    // cancel_url: z.string().optional(),
    // ipn_url: z.string().optional(),
    // shipping_method: z.string().optional(),
    // product_name: z.string().optional(),
    // product_category: z.string().optional(),
    // product_profile: z.string().optional(),
    // cus_name: z.string().optional(),
    // cus_email: z.string().optional(),
    // cus_add1: z.string().optional(),
    // cus_add2: z.string().optional(),
    // cus_city: z.string().optional(),
    // cus_state: z.string().optional(),
    // cus_postcode: z.string().optional(),
    // cus_country: z.string().optional(),
    // cus_phone: z.string().optional(),
    // cus_fax: z.string().optional(),
    // ship_name: z.string().optional(),
    // ship_add1: z.string().optional(),
    // ship_add2: z.string().optional(),
    // ship_city: z.string().optional(),
    // ship_state: z.string().optional(),
    // ship_postcode: z.string().optional(),
    // ship_country: z.string().optional(),
    // multi_card_name: z.string().optional(),
    // value_a: z.string().optional(),
    // value_b: z.string().optional(),
    // value_c: z.string().optional(),
    // value_d: z.string().optional(),
    // hmac: z.string().optional()
    productId: z.array(
        z.object(
            { _id: z.string(), quantity: z.number() }
        )
    ),

})

export type sslCommerzValidatorType = z.infer<typeof sslCommerzValidator>