import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import AppContainer from "../components/AppContainer.jsx"
import { Link, useNavigate } from "react-router-dom"

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);
  const authUser = useAuthStore((state) => state.authUser);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData); 
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
    else{
      navigate("/signup")
    }
  }, [authUser, navigate]);

  return (
    <AppContainer>
      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold">Create account</h1>
            <p className="text-sm text-base-content/60 mt-1">
              Get started with Synk
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-base-content/60">Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-3 py-2 bg-transparent border border-base-300/60 rounded-md text-sm focus:outline-none focus:border-base-content/30 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-base-content/60">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-transparent border border-base-300/60 rounded-md text-sm focus:outline-none focus:border-base-content/30 transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-base-content/60">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 bg-transparent border border-base-300/60 rounded-md text-sm focus:outline-none focus:border-base-content/30 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSigningUp || !formData.email || !formData.password || !formData.fullName}
              className="w-full mt-2 py-2 text-sm font-medium rounded-md bg-base-content text-base-100 hover:opacity-90 transition disabled:opacity-50"
            >
              {isSigningUp ? "Creating..." : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-base-content/60 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline hover:text-base-content transition"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </AppContainer>
  );
}

export default SignUpPage;