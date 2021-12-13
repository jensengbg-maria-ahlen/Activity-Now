import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { projectStorage } from "../firebase-config";


const UpdateProfile = (file) => {
    const [imgUrl, setImgUrl] = useState(null);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (file) {
            const storageRef = ref(projectStorage, file.name);
            const uploadImages = uploadBytesResumable(storageRef, file);

            uploadImages.on('state_changed', (snapshot) => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            }, (err) => {
                setError(err);
            }, async () => {
                await getDownloadURL(uploadImages.snapshot.ref).then((downloadUrl) => {
                    setImgUrl(downloadUrl);
                });
            })
        }
    }, [file])

    return { progress, error, imgUrl }
}

export default UpdateProfile