import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function BillDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://b12a10v3.vercel.app/bills/${id}`)
      .then((res) => setBill(res.data))
      .catch(() => toast.error("Failed to load bill details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!bill) return <p>Bill not found.</p>;

  const isCurrentMonth = new Date(bill.date).getMonth() === new Date().getMonth();

  const handlePayBill = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to pay bills.");
      return;
    }

    setSubmitting(true);

    const paymentData = {
      billsId: bill._id,
      username: formData.username,
      address: formData.address,
      phone: formData.phone,
      email: user.email,
      amount: bill.amount,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post("https://b12a10v3.vercel.app/myBills", paymentData);
      toast.success("Bill paid successfully!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to pay bill.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50">
          <img
            src={bill.image}
            alt={bill.title}
            className="h-80 w-full object-cover"
          />
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-2">{bill.title}</h2>
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  {bill.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-emerald-600">৳ {bill.amount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{bill.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Due: {bill.date}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">{bill.description}</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              disabled={!isCurrentMonth}
              className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${isCurrentMonth
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl shadow-emerald-200"
                  : "bg-slate-400 cursor-not-allowed opacity-60"
                }`}
            >
              {isCurrentMonth ? "Pay Bill Now" : "Only Current Month Bills"}
            </button>
          </div>
        </div>
      </div>

      {/* Pay Bill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white via-slate-50/50 to-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200/50">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Complete Payment</h3>

            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-medium">Bill:</span>
                <span className="font-semibold text-slate-800">{bill.title}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-medium">Category:</span>
                <span className="font-semibold text-slate-800">{bill.category}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 font-medium">Amount:</span>
                <span className="text-2xl font-bold text-emerald-600">৳ {bill.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Due Date:</span>
                <span className="font-semibold text-slate-800">{bill.date}</span>
              </div>
            </div>

            <form onSubmit={handlePayBill} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-medium mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">Phone *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  placeholder="+880 1234567890"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
