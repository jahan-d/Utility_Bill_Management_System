import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-white to-slate-50/50 border-b border-slate-200 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-bold text-xl text-slate-800 hidden md:block">Utility Bill Management</span>
            <span className="font-bold text-xl text-slate-800 md:hidden">UBM</span>
          </Link>

          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/bills"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"}`
              }
            >
              Bills
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/add-bill"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"}`
                  }
                >
                  Add Bill
                </NavLink>

                <NavLink
                  to="/my-bills"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"}`
                  }
                >
                  My Bills
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-lg hover:from-rose-600 hover:to-red-700 transition-all font-medium shadow-sm"
                >
                  Logout
                </button>

                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "profile"}
                    title={user.displayName || "User"}
                    className="w-9 h-9 rounded-full ring-2 ring-emerald-100 hover:ring-emerald-300 transition-all"
                  />
                )}
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"}`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium shadow-sm"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
