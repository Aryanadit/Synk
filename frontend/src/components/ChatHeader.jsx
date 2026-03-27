import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

function ChatHeader() {
    const selectedUser = useChatStore((state) => state.selectedUser);
    const setSelectedUser = useChatStore((state) => state.setSelectedUser);

    useEffect(() => {
        const handleEscKey = (event) => {
        if (event.key === "Escape") setSelectedUser(null);
        };

        window.addEventListener("keydown", handleEscKey);
        return () => window.removeEventListener("keydown", handleEscKey);
    }, []);

    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200/60">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
                src={
                selectedUser?.profilePic?.url ||
                "/avatar.png"
                }
                alt={selectedUser?.fullName}
                className="w-full h-full object-cover"
            />
            </div>

            {/* User Info */}
            <div className="leading-tight">
            <h3 className="text-sm font-medium text-base-content">
                {selectedUser?.fullName}
            </h3>
            <p className="text-xs text-base-content/60">
                Active
            </p>
            </div>
        </div>

        {/* RIGHT */}
        <button
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200/40 transition"
        >
            <XIcon className="w-4 h-4" />
        </button>
        </div>
    );
}

export default ChatHeader;