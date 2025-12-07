import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

export default function Home() {
  const [recentBills, setRecentBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = [
    { name: "Electricity", emoji: "⚡", color: "bg-blue-950" },
    { name: "Gas", emoji: "🔥", color: "bg-red-950" },
    { name: "Water", emoji: "💧", color: "bg-blue-500" },
    { name: "Internet", emoji: "🌐", color: "bg-green-500" },
  ];

  useEffect(() => {
    setLoading(true);
    const url = categoryFilter
      ? `http://localhost:3000/bills?category=${categoryFilter}&limit=6`
      : `http://localhost:3000/bills?limit=6`;

    axios
      .get(url)
      .then((res) => setRecentBills(res.data))
      .catch((err) => toast.error("Failed to load bills"))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to Utility Bill Management
        </h1>
        <p className="text-lg md:text-xl">View, pay, and manage your bills easily online.</p>
      </section>

      {/* Categories */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center ">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`${cat.color} p-4 rounded cursor-pointer hover:scale-105 transition`}
            onClick={() => setCategoryFilter(cat.name)}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <h3 className="mt-2 font-semibold">{cat.name}</h3>
          </div>
        ))}
        <div
          className="p-4 bg-gray-200 rounded cursor-pointer hover:scale-105 transition"
          onClick={() => setCategoryFilter("")}
        >
          <h3 className="mt-2 font-semibold ">All</h3>
        </div>
      </section>

      {/* Recent Bills */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Bills</h2>
        {loading ? (
          <p>Loading bills...</p>
        ) : recentBills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBills.map((bill) => (
              <div
                key={bill._id}
                className="p-4 border rounded shadow-sm hover:shadow-md transition"
              >
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
                <h3 className="font-semibold">{bill.title}</h3>
                <p className="text-sm text-gray-600">{bill.category}</p>
                <p className="text-sm">{bill.location}</p>
                <p className="font-bold text-blue-600">৳ {bill.amount}</p>
                <Link
                  to={`/bills/${bill._id}`}
                  className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent bills found.</p>
        )}
      </section>

      
    </div>
  );
}
