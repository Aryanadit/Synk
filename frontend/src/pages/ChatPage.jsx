import { useAuthStore } from '../store/useAuthStore.js'
import { useChatStore } from '../store/useChatStore.js'

import AppContainer from "../components/AppContainer.jsx"
import ProfileHeader from "../components/ProfileHeader.jsx"
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx"
import ChatList from "../components/ChatList.jsx"
import ContactList from "../components/ContactList.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx"

function ChatPage() {
  const activeTab = useChatStore((state) => state.activeTab)
  const selectedUser = useChatStore((state) => state.selectedUser)

  return (
    <AppContainer>
      
      <div className="flex h-full">
        
        {/* 🔹 LEFT SIDEBAR */}
        <div className="w-80 flex flex-col border-r border-base-300">
          
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {activeTab === 'chats' ? <ChatList /> : <ContactList />}
          </div>

        </div>

        {/* 🔹 RIGHT PANEL */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </div>

    </AppContainer>
  )
}

export default ChatPage