import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import AppContainer from "../components/AppContainer.jsx"
import { Link } from "react-router-dom"

function LoginPage() {

  const [formData, setFormData] = useState({ email: "", password: "" });

  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <AppContainer>
      <div className="h-full flex items-center justify-center px-4">
        
        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-base-content/50 mt-2">
              Log in to continue to Synk
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-base-content/50">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="
                  w-full px-3 py-2.5 
                  text-sm 
                  bg-transparent 
                  border border-base-300/50 
                  rounded-md
                  focus:outline-none 
                  focus:border-base-content/30
                  transition
                "
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-base-content/50">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="
                  w-full px-3 py-2.5 
                  text-sm 
                  bg-transparent 
                  border border-base-300/50 
                  rounded-md
                  focus:outline-none 
                  focus:border-base-content/30
                  transition
                "
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoggingIn || !formData.email || !formData.password}
              className="
                w-full mt-2 py-2.5 
                text-sm font-medium 
                rounded-md 
                bg-base-content 
                text-base-100 
                hover:opacity-90 
                transition 
                disabled:opacity-50
              "
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-sm text-base-content/50 text-center mt-8">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="underline underline-offset-4 hover:text-base-content transition"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </AppContainer>
  );
}

export default LoginPage;