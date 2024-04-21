import { Router } from "express";
import createProduct, { allProducts } from "./controllers/create_product";
import { validateRequest } from "../../middleware/validation";
import { verifyAccessToken } from "../../middleware/auth";
import { fileData, upload } from "../../middleware/multer";
import { productsValidator } from "../../validators/products";
import editProduct, { deleteProduct } from "./controllers/edit_product";

const productRouter = Router();
//upload.single("image"),
productRouter.get( "/:id?", verifyAccessToken, allProducts)
productRouter.post("/:id?", verifyAccessToken, validateRequest(productsValidator),  createProduct)
// productRouter.post("/:id", verifyAccessToken,   editProduct)
productRouter.delete("/:id", verifyAccessToken, deleteProduct)

export default productRouter
