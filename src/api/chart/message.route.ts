import { Router } from "express";
import getMessage from "./controllers/message";

const messageRouter = Router();

messageRouter.get("/", getMessage);

export default messageRouter