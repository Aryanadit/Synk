import {useAuthStore} from '../store/useAuthStore.js'

function ChatPage() {
  const logout = useAuthStore( (state) => state.logout) ; 
  return (
    <div>
      ChatPage
      <button onClick={logout}> Logout </button>
    </div>
  )
}

export default ChatPage
