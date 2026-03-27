import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
    const { setActiveTab } = useChatStore();

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        
        {/* ICON */}
        <div className="w-14 h-14 bg-base-200/60 rounded-full flex items-center justify-center">
            <MessageCircleIcon className="w-6 h-6 text-base-content/50" />
        </div>

        {/* TEXT */}
        <div className="space-y-1">
            <h4 className="text-sm font-medium text-base-content">
            No conversations yet
            </h4>
            <p className="text-xs text-base-content/60 max-w-[240px]">
            Start a new chat by selecting a contact from the contacts tab
            </p>
        </div>

        {/* BUTTON */}
        <button
            onClick={() => setActiveTab("contacts")}
            className="text-sm text-base-content/70 hover:text-base-content transition"
        >
            Find contacts
        </button>
        </div>
    );
}

export default NoChatsFound;