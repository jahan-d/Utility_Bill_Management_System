import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  if (loading) return <p className="text-gray-700">Loading your bills...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">My Bills</h2>
      <div className="mb-4">
        <p className="text-blue-800 font-semibold">Total Bills Paid: {totalPaid}</p>
        <p className="text-green-700 font-bold">Total Amount: ৳ {totalAmount}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
      >
        Download Report
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b._id} className="bg-white hover:bg-blue-50">
                <td className="border px-4 py-2 text-blue-800">{b.username}</td>
                <td className="border px-4 py-2 text-blue-700">{b.email}</td>
                <td className="border px-4 py-2 text-green-800 font-semibold">৳ {b.amount}</td>
                <td className="border px-4 py-2 text-gray-700">{b.address}</td>
                <td className="border px-4 py-2 text-gray-700">{b.phone}</td>
                <td className="border px-4 py-2 text-gray-600">{new Date(b.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleUpdateClick(b)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Update Bill</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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


