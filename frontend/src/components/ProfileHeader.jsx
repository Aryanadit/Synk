import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const logout = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.authUser);
  const updateProfilePic = useAuthStore((state) => state.updateProfilePic);
  const isUpdatingProfile = useAuthStore((state) => state.isUpdatingProfile);

  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
  const toggleSound = useChatStore((state) => state.toggleSound);

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    updateProfilePic(file);
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* 🔷 BRANDING */}
      <div className="flex items-center gap-2">
        {/* If you want to use your logo instead of S, replace below */}
        {/* Example: <img src="/assets/logo.png" className="w-6 h-6" /> */}

        <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center text-xs font-medium">
          S
        </div>

        <span className="text-sm font-medium tracking-tight text-base-content">
          Synk
        </span>
      </div>

      {/* 🔷 PROFILE HEADER */}
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={preview || authUser?.profilePic?.url || "/avatar.png"}
              alt={authUser?.fullName || "User"}
              className={`w-11 h-11 rounded-full object-cover transition ${
                isUpdatingProfile ? "opacity-60" : ""
              }`}
            />

            {/* subtle hover */}
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition" />

            {/* camera icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="size-4 text-white/90" />
            </div>

            {isUpdatingProfile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border border-white/50 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* USER INFO */}
          <div className="leading-tight">
            <h3 className="text-sm font-medium max-w-40 truncate">
              {authUser?.fullName}
            </h3>
            <p className="text-xs text-base-content/50">Online</p>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-md text-base-content/50 hover:text-base-content hover:bg-neutral-100 transition"
            onClick={logout}
          >
            <LogOutIcon className="size-4" />
          </button>

          <button
            className="p-2 rounded-md text-base-content/50 hover:text-base-content hover:bg-neutral-100 transition"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-4" />
            ) : (
              <VolumeOffIcon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
