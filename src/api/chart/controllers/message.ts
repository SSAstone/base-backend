import { Request, Response } from "express"
import Message from "../models/message_schema";

const getMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId } = req?.query
        if (!senderId || !receiverId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort('timestamp');
        console.log("🚀 ~ getMessage ~ messages:", messages)
        res.json(messages);
    } catch (err) {
        res.status(500).send(err);
    }
}

export default getMessage