import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      navigate(from, { replace: true }); // Redirect to previous page
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true }); // Redirect to previous page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-12 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gradient-to-br from-white via-slate-50/50 to-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200/50"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
            <span className="text-white font-bold text-3xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>
          <p className="text-slate-600 mt-2">Sign in to manage your bills</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-slate-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-slate-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl mb-4"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-lg hover:bg-slate-50 hover:border-emerald-300 transition-all font-medium shadow-sm flex items-center justify-center space-x-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Google</span>
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
