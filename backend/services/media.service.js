import cloudinary from '../config/cloudinary'
import { ApiResponse} from '../utils/index.js'

export const uploadMedia = asyncHandler( async(filepath,folder = "chat-app") => {

    const result = await cloudinary.uploader.upload( filepath,
        {
            folder ,
            resource_type: "auto"
        }
    )

    return new ApiResponse(
        201 , 
        "Upload successful to Cloudinary",
        {
            url: result.secure_url,
            public_id: result.public_id
        }
    )
})

export const deleteMedia = asyncHandler( async(public_id) => {

})