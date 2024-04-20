import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "./firebase.config";

async function uploadImage(file: any, quantity: string) {
    const storageFB = getStorage(firebaseApp);

    if (quantity === 'single') {
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`
        const storageRef = ref(storageFB, fileName)
        const metadata = {
            contentType: file.type,
        }
        await uploadBytesResumable(storageRef, file.buffer, metadata);

        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL
    }

    if (quantity === 'multiple') {
        const downloadURLs = [];

        for (let i = 0; i < file.images.length; i++) {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`;
            const storageRef = ref(storageFB, fileName);
            const metadata = {
                contentType: file.images[i].mimetype,
            };

            await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

            const downloadURL = await getDownloadURL(storageRef);
            downloadURLs.push(downloadURL);
        }
        
        return downloadURLs;
    }

}

export default uploadImage