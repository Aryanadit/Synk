import { create } from "zustand";
import { applyTheme, getInitialTheme } from "../lib/theme.js";

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    if (theme !== "light" && theme !== "dark") return;
    applyTheme(theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    get().setTheme(next);
  },
}));
