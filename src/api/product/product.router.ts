import { Router } from "express";
import createProduct, { allProducts } from "./controllers/create_product";
import { validateRequest } from "../../middleware/validation";
import { productsValidator } from "../../validators/products";
import { verifyAccessToken } from "../../middleware/auth";
import { deleteProduct } from "./controllers/edit_product";

const productRouter = Router();

productRouter.get( "/", verifyAccessToken, allProducts)
productRouter.post("/", verifyAccessToken, validateRequest(productsValidator), createProduct)
productRouter.delete("/:id", verifyAccessToken, deleteProduct)

export default productRouter
