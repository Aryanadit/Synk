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
        {/* Logo */}
        <img
          src={
            theme === "dark"
              ? "/assets/logo-dark.png"
              : "/assets/logo-light.png"
          }
          alt="Synk"
          className="h-8 object-contain"
        />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-base-content/50 hover:text-base-content hover:bg-base-200/50 transition"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-md text-base-content/50 hover:text-base-content hover:bg-base-200/50 transition"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
