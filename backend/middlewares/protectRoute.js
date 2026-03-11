import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { asyncHandler, ApiError } from "../utils/index.js"

const protectRoute = asyncHandler(async (req, res, next) => {

    const token = req.cookies.jwt

    if (!token) {
        throw new ApiError(401, "Unauthorized: No token provided")
    }

    let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        throw new ApiError(401, "Unauthorized: Token expired or invalid")
    }

    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })

        throw new ApiError(401, "Unauthorized: User not found")
    }

    req.user = user

    next()
})

export default protectRoute