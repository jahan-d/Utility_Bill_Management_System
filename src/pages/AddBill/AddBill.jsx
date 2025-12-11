import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

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
    date: "",  // Will pre-fill with current date
    email: user?.email || "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Auto-fill current date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-950">Add New Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded shadow">
        <input
          name="title"
          placeholder="Bill Title"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
        >
          <option>Electricity</option>
          <option>Gas</option>
          <option>Water</option>
          <option>Internet</option>
        </select>

        <input
          name="amount"
          type="number"
          placeholder="Amount (৳)"
          value={form.amount}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
          required
        />

        <input
          name="location"
          placeholder="Location (e.g. Mirpur-10, Dhaka)"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
          required
        />

        <input
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded text-gray-950"
          rows="4"
          required
        ></textarea>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">Added by: {user?.email}</div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add Bill"}
          </button>
        </div>
      </form>
    </div>
  );
}
