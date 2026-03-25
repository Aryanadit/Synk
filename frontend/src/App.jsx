import { Routes, Route } from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

import { useAuthStore } from './store/useAuthStore.js'

export default function App() {

  const authUser = useAuthStore((state) => state.authUser);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);

  console.log("auth user:", authUser);
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <div className="min-h-screen bg-base-100 text-base-content antialiased">

      {/* temporary test button */}
      <button className="text-sm text-base-content/70 hover:text-base-content transition">
  Login
</button>

      <div className="h-screen w-full">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>

    </div>
  )
}