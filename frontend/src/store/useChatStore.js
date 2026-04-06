import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

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
    set({ selectedUser: user });
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
    if (imageFile) formData.append("image", imageFile);

    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        formData,
      );
      const newMessage = res?.data?.data;
      if (newMessage) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      set({ isSendingMessage: false });
    }
  },
}));
