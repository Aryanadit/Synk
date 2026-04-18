import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useSocketStore } from "../store/useSocketStore.js";
import { formatLastSeen } from "../lib/formatLastSeen.js";

import UserLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ContactList() {
  const allContacts = useChatStore((state) => state.allContacts);
  const getAllContacts = useChatStore((state) => state.getAllContacts);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;

  return (
    <div className="px-2 py-2 space-y-1">
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(contact._id);

        return (
          <div
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className={[
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition",
              isOnline ? "bg-green-500/5 hover:bg-green-500/10" : "hover:bg-base-200/40",
            ].join(" ")}
          >
            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src={contact.profilePic?.url || "/avatar.png"}
                alt={contact.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm text-base-content truncate">
                {contact.fullName}
              </h4>
              <p className="text-xs text-base-content/55 flex items-center gap-2">
                <span className="font-medium text-base-content/70">
                  {isOnline ? "Online" : "Offline"}
                </span>
                <span className="text-base-content/45">
                  {isOnline ? "• active now" : formatLastSeen(contact.lastSeen)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;