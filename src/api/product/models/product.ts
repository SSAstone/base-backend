import { Schema, model, Types } from "mongoose";
import { productsValidatorType } from "../../../validators/products";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema: Schema<productsValidatorType> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: String,
    quantity: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    image: {
        type: String || Object || Array,
    }
}, { timestamps: true });

productSchema.plugin(mongooseAggregatePaginate);

const Product = model<productsValidatorType>('Product', productSchema);
export default Product;
