import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import useMiddleware from './middleware'
import * as middleware from './middleware'
import useRoutes from './routers'
import { upload } from './middleware/multer'
import uploadImage from './api/others/upload_image'
const app: express.Application = express()

useMiddleware(app)

useRoutes(app)
app.post('/upload-image', upload, async (req, res) => {
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }
    console.log("🚀 ~ app.post ~ file:", file)
    try {
        const buildImage = await uploadImage(file, 'single');
        res.send({
            status: "SUCCESS",
            imageName: buildImage
        })
    } catch (err) {
        console.log(err);
    }
})

app.use(middleware.notFound)
app.use(middleware.errorHandler)


export default app