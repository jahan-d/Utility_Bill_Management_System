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
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        Utility Bill Management
      </Link>

      <div className="flex items-center space-x-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? "underline" : "")}>
          Home
        </NavLink>

        <NavLink to="/bills" className={({ isActive }) => (isActive ? "underline" : "")}>
          Bills
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/add-bill"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Add Bill
            </NavLink>

            <NavLink
              to="/my-bills"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              My Bills
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>

            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "profile"}
                title={user.displayName || "User"}
                className="w-8 h-8 rounded-full ml-2 border-2 border-white"
              />
            )}
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "underline" : "")}>
              Login
            </NavLink>

            <NavLink to="/register" className={({ isActive }) => (isActive ? "underline" : "")}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
