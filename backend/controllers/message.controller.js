import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getIO } from "../socket/socket.js";
import { getUserSockets } from "../socket/socket.manager.js";

import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";

import { uploadMedia, deleteMedia } from "../services/media.service.js";

export const getAllContacts = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  //TODO: You might want to only return needed fields
  const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Contacts fetched successfully", filteredUser));
});

export const getMessagesByUserId = asyncHandler(async (req, res) => {
  const { id: otherUserId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: myId },
    ],
  }).sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Message Fetched Successfully", messages));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let imageData;

  if (req.file?.path) {
    try {
      imageData = await uploadMedia(req.file.path, "messages");
    } catch (error) {
      throw new ApiError(500, "File upload failed");
    }
  }

  if (!text?.trim() && !imageData) {
    throw new ApiError(400, "Empty message cannot be sent");
  }

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new ApiError(404, "Receiver not found");
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageData
      ? {
          url: imageData.url,
          public_id: imageData.public_id,
        }
      : null,
  });

  const io = getIO();
  const receiverSockets = getUserSockets(receiverId.toString());

  if (receiverSockets.length > 0) {
    receiverSockets.forEach((socketId) => {
      io.to(socketId).emit("newMessage", newMessage);
    });
  }

  const senderSockets = getUserSockets(senderId.toString());

  senderSockets.forEach((socketId) => {
    io.to(socketId).emit("newMessage", newMessage);
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", newMessage));
});

export const getChatPartners = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const messages = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  const partnerIds = [
    ...new Set(
      messages.map((msg) =>
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString(),
      ),
    ),
  ];

  const partners = await User.find({ _id: { $in: partnerIds } }).select(
    "-password",
  );

  //  console.log("Messages", messages);
  return res
    .status(200)
    .json(new ApiResponse(200, "Chat Partners Fetched Successfully", partners));
});
