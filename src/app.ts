import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import useMiddleware from './middleware'
import * as middleware from './middleware'
import useRoutes from './routers'
import { upload } from './middleware/multer'
import uploadImage from './lib/utils/upload_image'
const app: express.Application = express()

useMiddleware(app)

useRoutes(app)

app.use(middleware.notFound)
app.use(middleware.errorHandler)


export default app