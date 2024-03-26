import { Router } from "express";
import { upload } from "../../middleware/multer";
import { imagesUpload } from "./controllers/images_upload";

const othersRouter = Router();

othersRouter.post('/upload-image', upload, imagesUpload)

export default othersRouter
