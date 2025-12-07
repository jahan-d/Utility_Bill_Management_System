import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = ["Electricity", "Gas", "Water", "Internet"];

  useEffect(() => {
    setLoading(true);
    const url = categoryFilter
      ? `http://localhost:3000/bills?category=${categoryFilter}`
      : `http://localhost:3000/bills`;

    axios
      .get(url)
      .then((res) => setBills(res.data))
      .catch(() => toast.error("Failed to load bills"))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">All Bills</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded ${
              categoryFilter === cat ? "bg-blue-600 text-white" : "bg-gray-900"
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setCategoryFilter("")}
          className={`px-4 py-2 rounded ${
            categoryFilter === "" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
      </div>

      {/* Bills Grid */}
      {loading ? (
        <p>Loading bills...</p>
      ) : bills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bills.map((bill) => (
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
        <p>No bills found.</p>
      )}
    </div>
  );
}
