import { Schema, model } from "mongoose";
import { categoryValidatorType } from "../../../validators/category";

const categorySchema: Schema<categoryValidatorType>  = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })  

const Category = model<categoryValidatorType>('Categorie', categorySchema)

export default Category