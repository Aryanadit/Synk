import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      
      {/* ICON */}
      <div className="w-16 h-16 bg-base-200/60 rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="w-7 h-7 text-base-content/50" />
      </div>

      {/* TEXT */}
      <div className="space-y-1">
        <h3 className="text-base font-medium text-base-content">
          Select a conversation
        </h3>
        <p className="text-sm text-base-content/60 max-w-sm">
          Choose a contact from the sidebar to start chatting or continue a previous conversation.
        </p>
      </div>

    </div>
  );
};

export default NoConversationPlaceholder;