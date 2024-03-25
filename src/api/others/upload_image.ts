import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../../lib/utils/firebase.config";

async function uploadImage(file: any, quantity: string) {
    const storageFB = getStorage(firebaseApp);

    // await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

    if (quantity === 'single') {
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`
        const storageRef = ref(storageFB, fileName)
        console.log("🚀 ~ uploadImage ~ fileName:", fileName)
        const metadata = {
            contentType: file.type,
        }
        await uploadBytesResumable(storageRef, file.buffer, metadata);

        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL
    }

    // if (quantity === 'multiple') {
    //     for (let i = 0; i < file.images.length; i++) {
    //         const dateTime = Date.now();
    //         const fileName = `images/${dateTime}`
    //         const storageRef = ref(storageFB, fileName)
    //         const metadata = {
    //             contentType: file.images[i].mimetype,
    //         }

    //         const saveImage = await Image.create({ imageUrl: fileName });
    //         file.item.imageId.push({ _id: saveImage._id });
    //         await file.item.save();

    //         await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

    //     }
    //     return
    // }

}

export default uploadImage

// export const uploadImageProduct = (req: Request, res: Response) => {
//     try {
//         const file = {
//             type: req.file.mimetype,
//             buffer: req.file.buffer
//         }
//     } catch (error) {

//     }
// }


// app.post('/test-upload', upload, async (req, res) => {
//     const file = {
//         type: req.file.mimetype,
//         buffer: req.file.buffer
//     }
//     try {
//         const buildImage = await uploadImage(file, 'single');
//         res.send({
//             status: "SUCCESS",
//             imageName: buildImage
//         })
//     } catch(err) {
//         console.log(err);
//     }
// })