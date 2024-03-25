import mongoose, { Schema, model } from "mongoose";
import { OtpValidatorType } from "../../../validators/otp";

const otpSchema: Schema<OtpValidatorType> = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: [true, 'Otp is required.'],
    }
}, { timestamps: true })

const Otp = model<OtpValidatorType>('Otp', otpSchema)

export default Otp