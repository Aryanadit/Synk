import {useEffect} from 'react'
import { Routes, Route } from "react-router"
import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

import { useAuthStore } from './store/useAuthStore.js'

import PageLoader from "./components/PageLoader.jsx"
import PublicRoute from "./components/PublicRoute.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

export default function App() {

  const { authUser,isCheckingAuth,checkAuth} = useAuthStore() ; 

  useEffect( () => {
    checkAuth()
  } , [checkAuth])
  console.log({authUser})

  if(isCheckingAuth ) return <PageLoader/>
  return (
    <div className="min-h-screen bg-base-100 text-base-content antialiased">
      <div className="h-screen w-full">
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } />

          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          <Route path="/signup" element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          } />
        </Routes>
      </div>

    </div>
  )
}