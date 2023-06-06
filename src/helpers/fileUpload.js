

export const fileUpload = async( file ) => {
if( !file ) throw new Error('No tenemos ningun archivo a subir');
    const cloudUrl ='https://api.cloudinary.com/v1_1/dibad6a00/image/upload';

    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file );

    try {
        const resp = await fetch(cloudUrl, {
            method: 'Post',
            body: formData
        })
        
        if( !resp.ok ) throw new Error('No se logro subir la imagen');

        const cloudResp = await resp.json();
        
        return cloudResp.secure_url;
    } catch (error) {
        
        throw new Error(error.message);
    }

}