import User from "../models/user.model.js"
import { asyncHandler , ApiResponse , ApiError } from "../utils/index.js"

export const getUsersForSidebar = asyncHandler( async(req,res) => {

    const loggedInUser = req.user?._id

    if( !loggedInUser ){
        throw new ApiError( 401 , "Unauthorized")
    }

    const filteredUser = await User.find({ _id: { $ne: loggedInUser } })
        .select("-password")
        .lean();

    // Returns plain JS object , better for read only api 

    return res.status(200).json(
        new ApiResponse( 200 , "User Fetched " , filteredUser )
    )
})