import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";

export default function AddBill() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Electricity",
    amount: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.category ||
      !form.amount ||
      !form.location ||
      !form.description ||
      !form.date
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (isNaN(Number(form.amount))) {
      toast.error("Amount must be a number.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
        image: form.image || "https://via.placeholder.com/800x400?text=Bill+Image",
      };

      const response = await fetch("https://b12a10v3.vercel.app/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add bill.");

      toast.success("Bill added successfully!");
      navigate("/bills");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add bill. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Fade triggerOnce>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
              <span className="text-white font-bold text-3xl">📝</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-800">Add New Bill</h2>
            <p className="text-slate-600 mt-2">Create a new utility bill entry</p>
          </div>
        </Fade>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white via-slate-50/50 to-white p-8 rounded-2xl shadow-xl border border-slate-200/50 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-slate-700 font-medium mb-2">Bill Title *</label>
            <input
              name="title"
              placeholder="e.g., Monthly Electricity Bill"
              value={form.title}
              onChange={handleChange}
              className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-700 font-medium mb-2">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
            >
              <option>Electricity</option>
              <option>Gas</option>
              <option>Water</option>
              <option>Internet</option>
            </select>
          </div>

          {/* Amount & Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Amount (৳) *</label>
              <input
                name="amount"
                type="number"
                placeholder="1200"
                value={form.amount}
                onChange={handleChange}
                className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Due Date *</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-slate-700 font-medium mb-2">Location *</label>
            <input
              name="location"
              placeholder="e.g., Mirpur-10, Dhaka"
              value={form.location}
              onChange={handleChange}
              className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-slate-700 font-medium mb-2">Image URL (Optional)</label>
            <input
              name="image"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
              className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-700 font-medium mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Describe the bill details..."
              value={form.description}
              onChange={handleChange}
              className="border-2 border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600">Added by: <span className="font-medium text-emerald-600">{user?.email}</span></div>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Adding..." : "Add Bill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
