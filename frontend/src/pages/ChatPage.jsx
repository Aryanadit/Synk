import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

import AppContainer from "../components/AppContainer.jsx";
import AppHeader from "../components/AppHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";

function ChatPage() {
  const activeTab = useChatStore((state) => state.activeTab);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const subscribeToMessages = useChatStore(
    (state) => state.subscribeToMessages,
  );
  const unsubscribeFromMessages = useChatStore(
    (state) => state.unsubscribeFromMessages,
  );

  useEffect(() => {
    if (!selectedUser) return;

    console.log("👤 Selected user changed:", selectedUser._id);

    subscribeToMessages();

    return () => {
      console.log("♻️ Cleaning up listener");
      unsubscribeFromMessages();
    };
  }, [selectedUser]);

  console.log("SELECTED USER:", selectedUser);

  return (
    <AppContainer>
      <div className="h-full flex flex-col">
        <AppHeader />

        <div className="flex flex-1 overflow-hidden">
          {/* 🔹 LEFT SIDEBAR */}
          <div className="w-80 flex flex-col border-r border-base-200/60">
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* 🔹 RIGHT PANEL */}
          <div className="flex-1 flex flex-col min-w-0">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ChatPage;
