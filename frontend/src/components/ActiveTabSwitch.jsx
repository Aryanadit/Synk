import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const activeTab = useChatStore((state) => state.activeTab);
  const setActiveTab = useChatStore((state) => state.setActiveTab);

  return (
    <div className="flex gap-2 px-3 py-2">
      
      {/* CHATS */}
      <button
        onClick={() => setActiveTab("chats")}
        className={`text-sm px-3 py-1.5 rounded-md transition
          ${
            activeTab === "chats"
              ? "bg-base-200 text-base-content"
              : "text-base-content/60 hover:text-base-content hover:bg-base-200/40"
          }
        `}
      >
        Chats
      </button>

      {/* CONTACTS */}
      <button
        onClick={() => setActiveTab("contacts")}
        className={`text-sm px-3 py-1.5 rounded-md transition
          ${
            activeTab === "contacts"
              ? "bg-base-200 text-base-content"
              : "text-base-content/60 hover:text-base-content hover:bg-base-200/40"
          }
        `}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;