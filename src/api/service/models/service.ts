import { Document, Schema, model } from "mongoose";

export interface ServiceDocument extends Document {
    name: string
}

const serviceSchema: Schema<ServiceDocument> = new Schema({
    name: {
        type: String
    }
})

const Service = model<ServiceDocument>('Service', serviceSchema)

export default Service