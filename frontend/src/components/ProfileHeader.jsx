import { useState, useRef } from "react";
import { Camera, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
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
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        {/* 🔷 LEFT — PROFILE */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={preview || authUser?.profilePic?.url || "/avatar.png"}
              alt={authUser?.fullName || "User"}
              className={`w-10 h-10 rounded-full object-cover transition ${
                isUpdatingProfile ? "opacity-60" : ""
              }`}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition" />

            {/* Camera icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="size-4 text-white/90" />
            </div>

            {/* Loading spinner */}
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

          {/* Name */}
          <div className="leading-tight">
            <p className="text-sm font-medium max-w-[140px] truncate">
              {authUser?.fullName}
            </p>
          </div>
        </div>

        {/* 🔷 RIGHT — SOUND ONLY */}
        <button
          className="p-2 rounded-md text-base-content/50 hover:text-base-content hover:bg-base-200/50 transition"
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
  );
}

export default ProfileHeader;
