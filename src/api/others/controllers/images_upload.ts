import { Request, Response } from "express";
import uploadImage from "../../../lib/utils/upload_image";

export const imagesUpload = async (req: Request, res: Response) => {
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }
    try {
        const buildImage = await uploadImage(file, 'single');
        res.send({
            status: "SUCCESS",
            imageName: buildImage
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "ERROR",
            message: "An error occurred while uploading the image."
        });
    }
}

// export const imagesUpload = async (req: Request, res: Response) => {
//     try {
//         // Use uploadMultiple middleware for multiple images
//         uploadMultiple(req, res, async (err: any) => {
//             if (err) {
//                 return res.status(400).json({ message: "Error uploading images", error: err });
//             }

//             const files: any = req.files; // Contains array of uploaded files
//             if (!files || files.length === 0) {
//                 return res.status(400).json({ message: "No images uploaded" });
//             }

//             // Process uploaded files...
//             const downloadURLs = [];
//             for (const file of files) {
//                 const buildImage = await uploadImage(file, "multiple"); // Assuming uploadImage function handles single image upload
//                 downloadURLs.push(buildImage);
//             }

//             res.status(200).json({ status: "SUCCESS", downloadURLs });
//         });
//     } catch (err) {
//         console.error("Error uploading images:", err);
//         res.status(500).json({ status: "ERROR", message: "An error occurred while uploading the images." });
//     }
// };