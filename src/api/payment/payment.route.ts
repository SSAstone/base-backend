import { Router } from "express";
import { validateRequest } from "../../middleware/validation";
import sslCommerzPayment, { sslCommerzSuccess } from "./controllers/ssl_commerz_payment";
import { sslCommerzValidator } from "../../validators/ssl-commerz";
import { verifyAccessToken } from "../../middleware/auth";

const paymentRoute = Router();

paymentRoute.post("/ssl-commerz", validateRequest(sslCommerzValidator), verifyAccessToken, sslCommerzPayment)
paymentRoute.post("/success/:id", sslCommerzSuccess)

export default paymentRoute