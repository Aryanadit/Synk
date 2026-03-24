import express from 'express'
import {ApiResponse} from "../utils/index.js"
import { login, logout, signup , updateProfile } from '../controllers/auth.controller.js'
import protectRoute from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = express.Router()

router.post('/login', authLimiter, login)
router.post('/signup', authLimiter, signup)
router.post('/logout', logout)

router.patch(
    "/update-profile",
    protectRoute,
    upload.single("profilePic"), 
    updateProfile
)
router.get( '/check' , protectRoute , (req,res) => res.status(200).json(
    new ApiResponse( 200 , "User Authenticated" , req.user ) 
));

export default router