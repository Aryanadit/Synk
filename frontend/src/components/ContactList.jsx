import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";

import UserLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

function ContactList() {
  const allContacts = useChatStore((state) => state.allContacts);
  const getAllContacts = useChatStore((state) => state.getAllContacts);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;

  return (
    <div className="px-2 py-2 space-y-1">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition hover:bg-base-200/40"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;