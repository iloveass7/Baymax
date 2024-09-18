const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();

    
    const upload_preset = 'doctor-booking-system';
    const cloud_name = 'dynq25aax';

    
    console.log('Cloud Name:', cloud_name);
    console.log('Upload Preset:', upload_preset);

    
    uploadData.append('file', file);
    uploadData.append('upload_preset', upload_preset);

    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: uploadData,
    });

    
    if (!res.ok) {
        const error = await res.json(); 
        console.error('Cloudinary error:', error);  
        throw new Error(error.error.message);  
    }

    
    const data = await res.json();
    return data;
};

export default uploadImageToCloudinary;
