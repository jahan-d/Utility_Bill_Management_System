import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Fade, Slide } from "react-awesome-reveal";

export default function MyBills() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formData, setFormData] = useState({ amount: "", address: "", phone: "", date: "" });

  // Fetch bills for logged-in user
  const fetchBills = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://b12a10v3.vercel.app/myBills?email=${user.email}`);
      setBills(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your bills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [user]);

  // Calculate totals
  const totalPaid = bills.length;
  const totalAmount = bills.reduce((sum, b) => sum + b.amount, 0);

  // Delete bill
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;
    try {
      await axios.delete(`https://b12a10v3.vercel.app/myBills/${id}`);
      toast.success("Bill deleted successfully.");
      fetchBills();
    } catch (err) {
      toast.error("Failed to delete bill.");
    }
  };

  // Open update modal
  const handleUpdateClick = (bill) => {
    setSelectedBill(bill);
    setFormData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date,
    });
    setShowUpdateModal(true);
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://b12a10v3.vercel.app/myBills/${selectedBill._id}`, formData);
      toast.success("Bill updated successfully.");
      setShowUpdateModal(false);
      fetchBills();
    } catch (err) {
      toast.error("Failed to update bill.");
    }
  };

  // Download report
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("My Bills Report", 14, 20);
    const tableData = bills.map((b) => [
      b.username,
      b.email,
      `৳ ${b.amount}`,
      b.address,
      b.phone,
      new Date(b.date).toLocaleDateString(),
    ]);
    doc.autoTable({
      head: [["Username", "Email", "Amount", "Address", "Phone", "Date"]],
      body: tableData,
      startY: 30,
    });
    doc.save("my-bills-report.pdf");
  };

  if (loading) return <p className="text-slate-700">Loading your bills...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Fade triggerOnce>
          <h2 className="text-4xl font-bold text-slate-800 mb-2">My Bills</h2>
          <p className="text-slate-600 mb-8">Track and manage your payment history</p>
        </Fade>

        <Fade delay={100} triggerOnce>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-white via-slate-50/50 to-white p-6 rounded-2xl shadow-lg border border-slate-200/50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-600 mb-1">Total Bills Paid</p>
                  <p className="text-4xl font-bold text-slate-800">{totalPaid}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg shadow-emerald-200">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <p className="text-emerald-50 mb-1">Total Amount</p>
                  <p className="text-4xl font-bold">৳ {totalAmount}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        <Slide direction="up" triggerOnce>
          <button
            onClick={handleDownload}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all font-medium shadow-lg shadow-purple-200 hover:shadow-xl"
          >
            📥 Download PDF Report
          </button>
        </Slide>

        <Slide direction="up" delay={200} triggerOnce>
          <div className="bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold">Address</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((b) => (
                    <tr key={b._id} className="border-b border-slate-100 hover:bg-emerald-50/30 transition">
                      <td className="px-6 py-4 text-slate-800 font-medium">{b.username}</td>
                      <td className="px-6 py-4 text-slate-600">{b.email}</td>
                      <td className="px-6 py-4 text-emerald-600 font-bold">৳ {b.amount}</td>
                      <td className="px-6 py-4 text-slate-600">{b.address}</td>
                      <td className="px-6 py-4 text-slate-600">{b.phone}</td>
                      <td className="px-6 py-4 text-slate-600">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleUpdateClick(b)}
                          className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium text-sm"
                        >
                          ✏️ Update
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="px-3 py-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition font-medium text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Slide>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white via-slate-50/50 to-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200/50">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Update Bill</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-medium mb-2">Amount (৳)</label>
                <input
                  type="text"
                  placeholder="1200"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Address</label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="+880 1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/80"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg shadow-emerald-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


