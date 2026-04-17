import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";

import UserLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ChatList() {
  const chats = useChatStore((state) => state.chats);
  const getMyChatPartners = useChatStore((state) => state.getMyChatPartners);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  useEffect(() => {
    getMyChatPartners();
  }, []);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="px-3 py-2 space-y-1.5">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors
  ${selectedUser?._id === chat._id ? "bg-base-300/60" : "hover:bg-base-200/50"}
`}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              src={chat.profilePic?.url || "/avatar.png"}
              alt={chat.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-base-content truncate">
                {chat.fullName}
              </h4>

              {/* Placeholder time (replace later with real data) */}
              <span className="text-[11px] text-base-content/40">2m</span>
            </div>

            {/* Last message preview (placeholder for now) */}
            <p className="text-xs text-base-content/50 truncate mt-0.5 leading-snug">
              Start a conversation
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
