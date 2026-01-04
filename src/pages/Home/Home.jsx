import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Fade, Slide } from "react-awesome-reveal";

export default function Home() {
  const [recentBills, setRecentBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = [
    { name: "Electricity", emoji: "⚡", color: "from-amber-400 to-yellow-500", textColor: "text-amber-600" },
    { name: "Gas", emoji: "🔥", color: "from-orange-400 to-red-500", textColor: "text-orange-600" },
    { name: "Water", emoji: "💧", color: "from-cyan-400 to-blue-500", textColor: "text-cyan-600" },
    { name: "Internet", emoji: "🌐", color: "from-emerald-400 to-green-500", textColor: "text-emerald-600" },
  ];

  useEffect(() => {
    setLoading(true);
    const url = categoryFilter
      ? `https://b12a10v3.vercel.app/bills?category=${categoryFilter}&limit=6`
      : `https://b12a10v3.vercel.app/bills?limit=6`;

    axios
      .get(url)
      .then((res) => setRecentBills(res.data))
      .catch((err) => toast.error("Failed to load bills"))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Banner with modern design */}
        <Fade triggerOnce>
          <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-3xl shadow-xl p-12 md:p-16">
            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Simplify Your Utility Payments
              </h1>
              <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto">
                Track, manage, and pay all your utility bills in one convenient platform
              </p>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full opacity-20 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400 rounded-full opacity-20 -ml-24 -mb-24"></div>
          </section>
        </Fade>

        {/* Categories with modern cards */}
        <section>
          <Fade triggerOnce>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Browse by Category</h2>
          </Fade>
          <Slide direction="up" cascade damping={0.1} triggerOnce>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setCategoryFilter(cat.name)}
                  className={`group relative overflow-hidden bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 ${categoryFilter === cat.name ? 'border-emerald-500 scale-105 shadow-emerald-200' : 'border-slate-100 hover:scale-105 hover:border-emerald-200'
                    }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative text-center">
                    <span className="text-5xl mb-3 block group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                    <h3 className={`font-semibold text-slate-700 group-hover:${cat.textColor} transition-colors`}>{cat.name}</h3>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setCategoryFilter("")}
                className={`group relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 ${categoryFilter === "" ? 'border-emerald-500 scale-105 shadow-emerald-200' : 'border-slate-100 hover:scale-105 hover:border-emerald-200'
                  }`}
              >
                <div className="text-center">
                  <span className="text-5xl mb-3 block group-hover:scale-110 transition-transform duration-300">📋</span>
                  <h3 className="font-semibold text-slate-700">All Bills</h3>
                </div>
              </button>
            </div>
          </Slide>
        </section>

        {/* Recent Bills with modern card grid */}
        <section>
          <Fade triggerOnce>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Recent Bills</h2>
          </Fade>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : recentBills.length > 0 ? (
            <Slide direction="up" cascade damping={0.05} triggerOnce>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBills.map((bill) => (
                  <div
                    key={bill._id}
                    className="group bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-300 overflow-hidden border border-slate-100/50 backdrop-blur-sm"
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
            <div className="text-center py-12 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md border border-slate-100">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-slate-600 text-lg">No bills found in this category</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
