import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name
      await updateProfile(userCredential.user, { displayName: name });

      toast.success("Registration successful!");
      navigate(from, { replace: true }); // Redirect to intended page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-12 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gradient-to-br from-white via-slate-50/50 to-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200/50"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
            <span className="text-white font-bold text-3xl">✨</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            Create Account
          </h2>
          <p className="text-slate-600 mt-2">Join us to manage your utility bills</p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-slate-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
          />
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

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl mb-4"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
