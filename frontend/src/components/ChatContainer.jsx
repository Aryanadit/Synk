import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
import { useEffect, useRef } from 'react';

import ChatHeader from './ChatHeader.jsx'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.jsx'
import MessageInput from './MessageInput.jsx'
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton.jsx'

function ChatContainer() {

  const messages = useChatStore((state) => state.messages)
  const getMessagesByUserId = useChatStore((state) => state.getMessagesByUserId)
  const selectedUser = useChatStore((state) => state.selectedUser)
  const isMessagesLoading = useChatStore((state) => state.isMessagesLoading)

  const authUser = useAuthStore((state) => state.authUser)

  const messageEndRef = useRef(null);

  // Fetch messages (NO real-time)
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  // Auto scroll
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <ChatHeader />

      {/* Messages — full width of panel; tight right inset for sent bubbles */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto py-4 pl-4 pr-2 sm:pr-3">

        {messages.length > 0 && !isMessagesLoading ? (

          <div className="w-full space-y-3">

            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex w-full ${
                  String(msg.senderId) === String(authUser._id)
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="group w-fit max-w-[min(36rem,88%)] text-sm leading-relaxed text-base-content">

                  {/* Image */}
                  {msg.image?.url && (
                    <img
                      src={msg.image.url}
                      alt="Shared"
                      className="rounded-lg mb-2 max-h-60 object-cover"
                    />
                  )}

                  {/* Text */}
                  {msg.text && <p>{msg.text}</p>}

                  {/* Timestamp (hover reveal) */}
                  <p className="text-[11px] mt-1 text-base-content/50 opacity-0 group-hover:opacity-100 transition">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                </div>
              </div>
            ))}

            {/* Auto scroll anchor */}
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
  )
}

export default ChatContainer;