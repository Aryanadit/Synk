import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

function ChatContainer() {
  const messages = useChatStore((state) => state.messages);
  const getMessagesByUserId = useChatStore(
    (state) => state.getMessagesByUserId,
  );
  const selectedUser = useChatStore((state) => state.selectedUser);
  const isMessagesLoading = useChatStore((state) => state.isMessagesLoading);

  const authUser = useAuthStore((state) => state.authUser);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto py-6 pl-6 pr-3">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="w-full space-y-4">
            {messages.map((msg) => {
              const isMe = String(msg.senderId) === String(authUser._id);

              return (
                <div
                  key={msg._id}
                  className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="group w-fit max-w-[min(38rem,85%)] text-[15px] leading-relaxed text-base-content">
                    {/* Image */}
                    {msg.image?.url && (
                      <img
                        src={msg.image.url}
                        alt="Shared"
                        className="rounded-md mb-2 max-h-64 object-cover"
                      />
                    )}

                    {/* Text */}
                    {msg.text && (
                      <p className="whitespace-pre-wrap break-words">
                        {msg.text}
                      </p>
                    )}

                    {/* Timestamp */}
                    <p className="text-[11px] mt-1 text-base-content/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName || "XYZ"} />
        )}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
