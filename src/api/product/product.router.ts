import { Router } from "express";
import createProduct, { allProducts } from "./controllers/create_product";
import { validateRequest } from "../../middleware/validation";
import { verifyAccessToken } from "../../middleware/auth";
import { deleteProduct } from "./controllers/edit_product";
import { fileData, upload } from "../../middleware/multer";
import { productsValidator } from "../../validators/products";

const productRouter = Router();
//upload.single("image"),
productRouter.get( "/", verifyAccessToken, allProducts)
productRouter.post("/", verifyAccessToken, validateRequest(productsValidator),  createProduct)
productRouter.delete("/:id", verifyAccessToken, deleteProduct)

export default productRouter
