
import axios from "axios";
import api from "./api";

const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MiB


// 1. Get upload signature from our backend
async function getUploadSignature(folder, resourceType, title) {
    const response = await api.post("/uploads/signature", {
        folder: folder,
        resourceType: resourceType,
        title: title
    });

    return response.data;
}


// 2. Create FormData for Cloudinary
function createFormData(file, credentials) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", credentials.api_key);
    formData.append("timestamp", credentials.timestamp);
    formData.append("signature", credentials.signature);
    formData.append("asset_folder", credentials.asset_folder);
    formData.append("context", credentials.context);
    formData.append(
    "notification_url",
    credentials.notification_url
    );

    return formData;
}


// 3. Upload a request with retry support
async function uploadWithRetry(url, formData, config) {

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            return await axios.post(url, formData, config);

        } catch (error) {

            const status = error.response?.status;

            const shouldRetry =
                !error.response ||
                status === 429 ||
                status >= 500;

            if (!shouldRetry || attempt === 3) {
                throw error;
            }

            // Wait before trying again
            await new Promise((resolve) => {
                setTimeout(resolve, attempt * 1000);
            });
        }
    }
}


// 4. Upload an image in a single request
export async function uploadImage(file, folder, title, onProgress) {

    const credentials = await getUploadSignature(folder, "image", title);

    const url =
        `https://api.cloudinary.com/v1_1/${credentials.cloud_name}/image/upload`;

    const formData = createFormData(file, credentials);

    const response = await axios.post(url, formData, {

        onUploadProgress: (event) => {

            if (event.total) {
                const percentage = Math.round(
                    (event.loaded / event.total) * 100
                );

                onProgress(percentage);
            }
        }
    });

    return response.data;
}


// 5. Upload a video in chunks
export async function uploadVideo(file, folder, title, onProgress) {

    const credentials = await getUploadSignature(folder, "video", title);

    const url =
        `https://api.cloudinary.com/v1_1/${credentials.cloud_name}/video/upload`;

    // Same upload ID must be used for every chunk
    const uploadId = crypto.randomUUID();

    let start = 0;
    let finalResult = null;

    while (start < file.size) {

        // Calculate the end position of current chunk
        const end = Math.min(
            start + CHUNK_SIZE,
            file.size
        );

        // Extract current chunk from original file
        const chunk = file.slice(start, end);

        const formData = createFormData(chunk, credentials);

        // Upload current chunk
        const response = await uploadWithRetry(
            url,
            formData,
            {
                headers: {
                    "X-Unique-Upload-Id": uploadId,
                    "Content-Range":
                        `bytes ${start}-${end - 1}/${file.size}`
                },

                onUploadProgress: (event) => {

                    if (!event.total) {
                        return;
                    }

                    // Size of current chunk
                    const currentChunkSize = end - start;

                    // Approximate file bytes sent in current chunk
                    const currentChunkUploaded = Math.min(
                        event.loaded,
                        currentChunkSize
                    );

                    // Previous chunks + current chunk progress
                    const totalUploaded =
                        start + currentChunkUploaded;

                    const percentage = Math.round(
                        (totalUploaded / file.size) * 100
                    );

                    onProgress(percentage);
                }
            }
        );

        // Cloudinary confirms completed upload
        if (response.data.done === true) {
            finalResult = response.data;
        }

        // If this wasn't the final chunk, Cloudinary
        // should confirm that more chunks are expected
        if (end < file.size && response.data.done !== false) {
            throw new Error(
                "Unexpected response from Cloudinary"
            );
        }

        // Move to the next chunk
        start = end;
    }

    if (!finalResult) {
        throw new Error(
            "Cloudinary did not confirm upload completion"
        );
    }

    return finalResult;
}
