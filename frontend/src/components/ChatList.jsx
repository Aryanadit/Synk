import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";

import UserLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ChatList() {
  const chats = useChatStore((state) => state.chats);
  const getMyChatPartners = useChatStore((state) => state.getMyChatPartners);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  useEffect(() => {
    getMyChatPartners();
  }, []);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="px-2 py-2 space-y-1">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition hover:bg-base-200/40"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={chat.profilePic?.url || "/avatar.png"}
              alt={chat.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm text-base-content truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;