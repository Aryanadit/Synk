import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

console.log("SOCKET BASE URL:", BASE_URL);

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (user) => {
    if (!user || get().socket) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.off("onlineUsers");
    socket.on("onlineUsers", (users) => {
      set({ onlineUsers: users });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.off("onlineUsers");
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
