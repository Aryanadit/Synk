import jwt from "jsonwebtoken"
import { ApiError } from "../utils/index.js"

const generateToken = (userId, res) => {

    const { JWT_SECRET_KEY } = process.env

    if (!JWT_SECRET_KEY) {
        throw new ApiError(500, "JWT_SECRET_KEY is not defined")
    }

    if (!userId) {
        throw new ApiError(400, "User ID is required to generate token")
    }

    const token = jwt.sign(
        { userId },
        JWT_SECRET_KEY,
        { expiresIn: "7d" }
    )

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}

export default generateToken