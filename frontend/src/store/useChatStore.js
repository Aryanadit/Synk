import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

import { useSocketStore } from "./useSocketStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue.toString());
    set({ isSoundEnabled: newValue });
  },
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user, messages: [] });
  },
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data.data });
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/partners");
      set({ chats: res.data.data });
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      console.log("FETCHING MESSAGES AGAIN");
      const res = await axiosInstance.get(`/messages/user/${userId}`);
      set({ messages: res?.data?.data });
    } catch (err) {
      if (err.response?.status === 404) {
        // No messages = NOT an error
        set({ messages: [] });
        return;
      }

      toast.error(err?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async ({ text, imageFile }) => {
    const selectedUser = get().selectedUser;
    if (!selectedUser?._id) {
      toast.error("Select a conversation first");
      return;
    }

    const trimmed = text?.trim() ?? "";
    if (!trimmed && !imageFile) {
      toast.error("Message cannot be empty");
      return;
    }

    const formData = new FormData();
    if (trimmed) formData.append("text", trimmed);
    if (imageFile) formData.append("file", imageFile);

    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        formData,
      );
      const newMessage = res?.data?.data;
      // if (newMessage) {
      //   set((state) => ({
      //     messages: [...state.messages, newMessage],
      //   }));
      // }
      console.log("NEW MESSAGE →", newMessage);
      console.log("CURRENT STATE →", get().messages);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      set({ isSendingMessage: false });
    }
  },
  // 🔥 SOCKET LISTENERS
  subscribeToMessages: () => {
    const socket = useSocketStore.getState().socket;

    if (!socket) return;

    console.log("🟢 SUBSCRIBING to messages");

    // ✅ prevent multiple listeners
    socket.off("newMessage");

    socket.on("newMessage", (message) => {
      console.log("📩 SOCKET MESSAGE RECEIVED");
      const selectedUser = get().selectedUser;

      if (!selectedUser) return;

      const isRelevant =
        message.senderId === selectedUser._id ||
        message.receiverId === selectedUser._id;

      if (!isRelevant) return;

      set((state) => {
        const exists = state.messages.some((m) => m._id === message._id);

        if (exists) return state;

        return {
          messages: [...state.messages, message].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          ),
        };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useSocketStore.getState().socket;

    if (!socket) return;
    console.log("🔴 UNSUBSCRIBING from messages");
    socket.off("newMessage");
  },
}));
