import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Fade, Slide } from "react-awesome-reveal";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = ["Electricity", "Gas", "Water", "Internet"];

  useEffect(() => {
    setLoading(true);
    const url = categoryFilter
      ? `https://b12a10v3.vercel.app/bills?category=${categoryFilter}`
      : `https://b12a10v3.vercel.app/bills`;

    axios
      .get(url)
      .then((res) => setBills(res.data))
      .catch(() => toast.error("Failed to load bills"))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Fade triggerOnce>
          <h2 className="text-4xl font-bold text-slate-800">All Utility Bills</h2>
          <p className="text-slate-600 mt-2">Browse and manage all available bills</p>
        </Fade>

        {/* Category Filter */}
        <Slide direction="up" triggerOnce>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all shadow-md ${categoryFilter === cat
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-200"
                    : "bg-gradient-to-br from-white to-slate-50 text-slate-700 hover:shadow-lg hover:scale-105 border border-slate-200"
                  }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setCategoryFilter("")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all shadow-md ${categoryFilter === ""
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-200"
                  : "bg-gradient-to-br from-slate-100 to-white text-slate-700 hover:shadow-lg hover:scale-105 border border-slate-200"
                }`}
            >
              All Bills
            </button>
          </div>
        </Slide>

        {/* Bills Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600"></div>
          </div>
        ) : bills.length > 0 ? (
          <Slide direction="up" cascade damping={0.03} triggerOnce>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bills.map((bill) => (
                <div
                  key={bill._id}
                  className="group bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-300 overflow-hidden border border-slate-100/50"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={bill.image}
                      alt={bill.title}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {bill.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">{bill.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {bill.location}
                    </p>
                    <p className="text-2xl font-bold text-emerald-600 mb-4">৳ {bill.amount}</p>
                    <Link
                      to={`/bills/${bill._id}`}
                      className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Slide>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md border border-slate-100">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-slate-600 text-lg">No bills found{categoryFilter && ` in ${categoryFilter}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
