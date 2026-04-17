import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

import { useSocketStore } from "./useSocketStore";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      const user = res?.data?.data || null;

      set({ authUser: user });

      // ✅ ADD THIS
      if (user) {
        useSocketStore.getState().connectSocket(user);
      }
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    if (get().isSigningUp) return;
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      const user = res.data.data;

      set({ authUser: user });

      // ✅ ADD THIS
      useSocketStore.getState().connectSocket(user);

      toast.success("Account created");
    } catch (err) {
      console.error("Error while signup in AuthStore : ", err);
      const message = err.response?.data?.message || "Signup failed";
      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    if (get().isLoggingIn) return;
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const user = res.data.data;

      set({ authUser: user });

      // ✅ ADD THIS
      useSocketStore.getState().connectSocket(user);

      toast.success("Logged In");
    } catch (err) {
      console.error("Error while Login in AuthStore : ", err);
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.log("Logout Error : ", err);
    } finally {
      // ✅ DISCONNECT SOCKET
      useSocketStore.getState().disconnectSocket();

      set({ authUser: null });
      toast.success("Logged out");
    }
  },
  updateProfilePic: async (file) => {
    if (!file) return;

    if (get().isUpdatingProfile) return;

    set({ isUpdatingProfile: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axiosInstance.patch("/auth/update-profile", formData, {
        withCredentials: true,
      });
      set({ authUser: res?.data?.data || null });
      toast.success("Profile picture updated");
    } catch (err) {
      console.error("Profile Pic Update Error:", err);
      const message =
        err.response?.data?.message || "Failed to update profile picture";
      toast.error(message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
