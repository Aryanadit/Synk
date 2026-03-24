import User from '../models/user.model.js'

import { ApiError, ApiResponse, asyncHandler , generateToken ,createWelcomeEmailTemplate } from "../utils/index.js"

import { uploadMedia , deleteMedia } from '../services/media.service.js'
import { sendWelcomeEmail } from "../services/email.service.js";


export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and Password are required")
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new ApiError(400, "Invalid Credentials")
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Credentials")
    }

    generateToken(existingUser._id, res)

    return res.status(200).json(
        new ApiResponse(200, "Login Successful", {
            _id: existingUser._id,
            email: existingUser.email,
            fullName: existingUser.fullName,
            profilePic: existingUser.profilePic
        })
    )
})

export const signup = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid Email Format")
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already Exists")
    }

    const newUser = new User({
        fullName,
        email,
        password
    })

    await newUser.save()

    generateToken(newUser._id, res)

    await sendWelcomeEmail({
        to: newUser.email,
        name: newUser.fullName,
        clientURL: process.env.CLIENT_URL
    }).catch(err => console.log("Email failed:", err.message));

    return res.status(201).json(
        new ApiResponse(201, "User created Successfully", {
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic
        })
    )
})

export const logout = asyncHandler(async (req, res) => {

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict"
    })

    return res.status(200).json(
        new ApiResponse(200, "Logout Successful")
    )
})

export const updateProfile = asyncHandler( async( req ,res ) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    let newProfilePic;

    if( req.file?.path){
        try {
            newProfilePic = await uploadMedia(req.file.path, "profile-pics");
        } catch (error) {
            throw new ApiError(500, "Profile upload failed");
        }

        console.log("newProfilePic" , newProfilePic)
        if (user.profilePic?.public_id) {
            await deleteMedia(user.profilePic.public_id);
        }
    }

    if (newProfilePic) {
        user.profilePic = {
            url: newProfilePic.url,
            public_id: newProfilePic.public_id
        };
    }


    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(200).json(
        new ApiResponse(200, "Profile picture updated successfully" , safeUser )
    );
})