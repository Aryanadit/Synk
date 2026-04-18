import express from "express";

import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/contacts", getAllContacts);
router.get("/partners", getChatPartners);
router.get("/user/:id", getMessagesByUserId);
router.post("/send/:id", upload.single("file"), sendMessage);

export default router;
