const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();

    // Load environment variables
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;

    // Log environment variables to verify correctness
    console.log('Cloud Name:', cloud_name);
    console.log('Upload Preset:', upload_preset);

    // Append the required form data
    uploadData.append('file', file);
    uploadData.append('upload_preset', upload_preset);

    // Make the POST request to Cloudinary
    const res = await fetch(https://api.cloudinary.com/v1_1/${cloud_name}/image/upload, {
        method: 'POST',
        body: uploadData,
    });

    // Check for response errors
    if (!res.ok) {
        const error = await res.json();  // Parse Cloudinary error response
        console.error('Cloudinary error:', error);  // Log the Cloudinary error
        throw new Error(error.error.message);  // Throw a more detailed error message
    }

    // Parse and return the response data
    const data = await res.json();
    return data;
};

export default uploadImageToCloudinary;
