import mongoose, { Schema, model } from "mongoose";

export interface OtpDocument extends Document {
    email: string
    otp: string
    createdAt: Date
    updatedAt: Date
}

const otpSchema: Schema<OtpDocument> = new mongoose.Schema({
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

const Otp = model<OtpDocument>('Otp', otpSchema)

export default Otp