const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_name = "dynq25aax";

    uploadData.append('file', file);
    uploadData.append('upload_preset', upload_preset);
    uploadData.append('cloud_name', cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/dynq25aax/image/upload`, {
        method: 'POST',
        body: uploadData,
    });

    if (!res.ok) {
        throw new Error('Failed to upload image');
    }

    const data = await res.json();
    return data;
};

export default uploadImageToCloudinary;
