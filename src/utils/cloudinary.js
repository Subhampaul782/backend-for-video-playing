import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

(async function () {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDNARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRECT // Click 'View API Keys' above to copy your API secret
    });



    const uplodeonclodinary = async (localfilepath) => {
        try {
            if (!localfilepath) return null
            const resposne = await cloudinary.uploader.upload(localfilepath, {
                resource_type: "auto"
            })

            console.log("file is uploded on clodinary", resposne.url);
            return resposne;

        } catch (error) {

            // remove the locally save temporay file as the uplode operation got filed
            fs.unlinkSync(localfilepath)
            return null


        }
    }

    // Upload an image
    // const uploadResult = await cloudinary.uploader
    //     .upload(
    //         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //         public_id: 'shoes',
    //     }
    //     )
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // console.log(uploadResult);
})