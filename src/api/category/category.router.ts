import { Router } from "express";
import { allCategory, createCategory } from "./controllers/create_category";
import { validateRequest } from "../../middleware/validation";
import { categoryValidator } from "../../validators/category";
import { deleteCategory, editCategory } from "./controllers/edit_category";
import { verifyAccessToken } from "../../middleware/auth";

const categoryRouter = Router();

categoryRouter.get("/", allCategory)
categoryRouter.post("/", verifyAccessToken, validateRequest(categoryValidator), createCategory)
categoryRouter.put("/:id", editCategory)
categoryRouter.delete("/:id", deleteCategory)


export default categoryRouter