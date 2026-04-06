import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";

function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div
      className="fixed top-4 right-4 z-[100] flex items-center gap-0.5 rounded-xl border border-base-300/50 bg-base-100/90 p-1 shadow-sm backdrop-blur-md"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        aria-label="Light mode"
        title="Light mode"
        className={`rounded-lg p-2 transition ${
          theme === "light"
            ? "bg-base-200 text-base-content"
            : "text-base-content/50 hover:bg-base-200/50 hover:text-base-content"
        }`}
      >
        <Sun className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Dark mode"
        title="Dark mode"
        className={`rounded-lg p-2 transition ${
          theme === "dark"
            ? "bg-base-200 text-base-content"
            : "text-base-content/50 hover:bg-base-200/50 hover:text-base-content"
        }`}
      >
        <Moon className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export default ThemeToggle;
