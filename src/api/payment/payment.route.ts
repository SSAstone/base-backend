import { Router } from "express";
import { validateRequest } from "../../middleware/validation";
import sslCommerzPayment from "./controllers/ssl_commerz_payment";
import { sslCommerzValidator } from "../../validators/ssl-commerz";

const paymentRoute = Router();

paymentRoute.post("/ssl-commerz", validateRequest(sslCommerzValidator), sslCommerzPayment)

export default paymentRoute