import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
import User from "../models/user.model.js"
import { asyncHandler , ApiResponse , ApiError } from "../utils/index.js"


export const sendMessage = asyncHandler( async(req,res) => {
    const {id : receiverId} = req.params

    const receiver = await User.findById(receiverId)
    if (!receiver) {
        throw new ApiError(404, "Receiver not found")
    }

    const {message} = req.body
    if(!message?.trim() ) {
        throw new ApiError(400 , "Message is required")
    }

    const senderId = req.user._id

    if( senderId.toString() === receiverId.toString()) {
        throw new ApiError(400 ,"You cannot send message to yourself")
    }

    let conversation = await Conversation.findOne({
        participants : {
            $all : [senderId , receiverId]
        }
    })

    if( !conversation ){
        conversation = new Conversation({
            participants : [senderId , receiverId],
            messages : []
        }) 
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })

    await newMessage.save()
    conversation.messages.push(newMessage._id)
    await conversation.save()

    res.status(201).json(
        new ApiResponse(201, "Message sent successfully", newMessage)
    )

})

export const getMessages = asyncHandler( async(req,res) =>{
    const { id : otherUserId } = req.params

    const otherUser = await User.findById(otherUserId)
    if (!otherUser) {
        throw new ApiError(404, "User not found")
    }

    const userId = req.user._id

    if( !userId ){
        throw new ApiError(401,"Unauthorized")
    }

    if( userId.toString() === otherUserId.toString() ) {
        throw new ApiError(400,"You cannot get messages with yourself")
    }

    const conversation = await Conversation.findOne({
        participants : { $all : [ userId , otherUserId]}
    }).populate("messages")

    if( !conversation ) {
        return res.status(200).json(
            new ApiResponse(200,"No messages found", [] )
        );
    }

    const messages = conversation.messages;

    return res.status(200).json(
        new ApiResponse(200,"Messages retrieved successfully", messages )
    );
});
