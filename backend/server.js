import "./config/env.js";
import express from 'express'
import cors from "cors";
import cookieParser from 'cookie-parser'

import protectRoute from './middlewares/protectRoute.js'
import {errorHandler} from './middlewares/errorHandler.js'

import userRoutes from "./routes/user.routers.js"
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'




const PORT = process.env.PORT || 5000
const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json()) 
app.use(cookieParser())

app.use('/api/auth' , authRoutes)
app.use("/api/messages" , protectRoute , messageRoutes)
app.use("/api/users" , userRoutes)

app.use(errorHandler)

app.listen( PORT , () => {
    connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
})
