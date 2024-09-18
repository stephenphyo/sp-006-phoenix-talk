import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// export const uploadMultipleFilesUUID = async (storageRef, files) => {
//     const filePromises = files.map(file => {
//         const fileExtension = file.name.split('.').pop();
//         const fileName = uuidv4() + '.' + fileExtension;

//         return uploadFile(storageRef(fileName), file);
//     });

//     const fileURLs = await Promise.all(filePromises);
//     return fileURLs;
// }

export const uploadFiles = async (bucket, path, files, setFileURLs, setUploadProgress, setError) => {
    if (!bucket || !path || !files) {
        throw new Error('Missing Mandatory Parameters');
    }

    const uploadedURLs = [];

    const uploadFilePromises = Array.from(files).map((file) => {
        const [fileName, fileExt] = file.name.split('.');
        const newFileName = `${fileName}_${Date.now()}.${fileExt}`;

        const storageRef = ref(bucket, `${path}${newFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (setUploadProgress) {
                        setUploadProgress((prevProgress) => ({
                            ...prevProgress,
                            [newFileName]: progress,
                        }));
                    }
                },
                (err) => {
                    reject(err);
                },
                async () => {
                    try {
                        const downloadedURL = await getDownloadURL(uploadTask.snapshot.ref);
                        uploadedURLs.push({ name: newFileName, url: downloadedURL });
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            )
        });
    });

    try {
        await Promise.all(uploadFilePromises);
        if (setFileURLs) {
            setFileURLs(uploadedURLs);
        }
    }
    catch (err) {
        if (setError) {
            setError(err);
        }
    }
}