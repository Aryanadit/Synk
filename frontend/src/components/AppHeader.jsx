import { LogOut, Moon, Sun } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useThemeStore } from "../store/useThemeStore.js";

function AppHeader() {
  const logout = useAuthStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="bg-base-100 text-base-content">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <img
            src={
              theme === "dark"
                ? "/assets/logo-dark.png"
                : "/assets/logo-light.png"
            }
            alt="Synk"
            className="h-8 object-contain"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-md text-base-content/50 hover:text-base-content hover:bg-base-200/50 transition-colors"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition hover:bg-base-200/50"
          >
            <LogOut className="size-4" aria-hidden />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
