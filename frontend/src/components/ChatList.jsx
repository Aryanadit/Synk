import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useSocketStore } from "../store/useSocketStore.js";
import { formatLastSeen } from "../lib/formatLastSeen.js";

import UserLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ChatList() {
  const chats = useChatStore((state) => state.chats);
  const getMyChatPartners = useChatStore((state) => state.getMyChatPartners);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  useEffect(() => {
    getMyChatPartners();
  }, []);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="px-3 py-2 space-y-1.5">
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);

        const isSelected = selectedUser?._id === chat._id;

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={[
              "flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors rounded-md",
              isSelected ? "bg-base-300/60" : "",
              isOnline
                ? isSelected
                  ? "bg-green-500/8"
                  : "bg-green-500/5 hover:bg-green-500/10"
                : isSelected
                  ? ""
                  : "hover:bg-base-200/50",
            ].join(" ")}
          >
            {/* Avatar */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden">
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
              </div>

              <p className="text-xs text-base-content/55 flex items-center gap-2 mt-0.5 leading-snug">
                <span className="font-medium text-base-content/70">
                  {isOnline ? "Online" : "Offline"}
                </span>
                <span className="text-base-content/45">
                  {isOnline ? "• active now" : formatLastSeen(chat.lastSeen)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
