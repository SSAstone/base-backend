import { verifyAccessToken } from "../../middleware/auth"
import { startService } from "./controller/start_service"

const serviceRouter = require('express').Router()

serviceRouter.post('/e-commerce', verifyAccessToken, startService)

export default serviceRouter