import { Request, Response } from "express";
import { ApiResponse } from "../../../lib/api_response/response";
import uploadImage from "../../../lib/utils/upload_image";

export const imagesUpload = async (req: Request, res: Response) => {
    try {
        const file = {
            type: req?.file?.mimetype,
            buffer: req?.file?.buffer
        }
        const buildImage = await uploadImage(file, 'single');
        res.status(201).json(ApiResponse.response(201, 'Image uploaded', buildImage));
    } catch (err) {
        console.log(err);
        res.status(500).send(ApiResponse.errorResponse(500, 'An error occurred while uploading the image.'));
    }
}