import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-2">UtilityBill Management</h1>
        <p className="mb-2">Easily view and pay your monthly utility bills online.</p>
        <div className="flex justify-center space-x-4 mb-2">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/bills" className="hover:underline">Bills</Link>
          <Link to="/my-bills" className="hover:underline">My Pay Bills</Link>
        </div>
        <p className="text-sm">&copy; 2025 UtilityBill. All rights reserved.</p>
      </div>
    </footer>
  );
}
