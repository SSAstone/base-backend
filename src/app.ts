import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import useMiddleware from './middleware'
import * as middleware from './middleware'
import useRoutes from './routers'
const app: express.Application = express()

useMiddleware(app)

useRoutes(app)

app.use(middleware.notFound)
app.use(middleware.errorHandler)


export default app