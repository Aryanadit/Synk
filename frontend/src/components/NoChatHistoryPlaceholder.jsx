import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
        
        {/* ICON */}
        <div className="w-14 h-14 bg-base-200/60 rounded-full flex items-center justify-center mb-5">
            <MessageCircleIcon className="w-6 h-6 text-base-content/50" />
        </div>

        {/* TEXT */}
        <div className="space-y-1 mb-4">
            <h3 className="text-sm font-medium text-base-content">
            Start your conversation with {name}
            </h3>
            <p className="text-xs text-base-content/60 max-w-xs">
            This is the beginning of your conversation. Send a message to start chatting.
            </p>
        </div>

        {/* SUGGESTIONS (subtle, not buttons) */}
        <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs text-base-content/60 px-3 py-1 rounded-md hover:bg-base-200/40 cursor-pointer transition">
            👋 Say hello
            </span>
            <span className="text-xs text-base-content/60 px-3 py-1 rounded-md hover:bg-base-200/40 cursor-pointer transition">
            🤝 How are you?
            </span>
            <span className="text-xs text-base-content/60 px-3 py-1 rounded-md hover:bg-base-200/40 cursor-pointer transition">
            📅 Meet up soon?
            </span>
        </div>

        </div>
    );
};

export default NoChatHistoryPlaceholder;