import { Schema, model } from 'mongoose';
import { sslCommerzValidatorType } from './../../../validators/ssl-commerz';

const sslCommerzSchema: Schema<sslCommerzValidatorType> = new Schema({
    productId: [{
        _id: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
}, { timestamps: true });

const SslCommerz = model<sslCommerzValidatorType>('SslCommerz', sslCommerzSchema);
export default SslCommerz