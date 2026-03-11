import mongoose from "mongoose"
import { ApiError } from "../utils/index.js"

const connectToMongoDB = async () => {
    try {

        const { MONGODB_URI } = process.env

        if (!MONGODB_URI) {
            throw new ApiError(500, "MONGODB_URI is not defined in environment variables")
        }

        await mongoose.connect(MONGODB_URI)

        console.log(`MongoDB connected successfully: ${mongoose.connection.host}`)

    } catch (error) {

        console.error("MongoDB connection failed:", error.message)

        process.exit(1)
    }
}

export default connectToMongoDB