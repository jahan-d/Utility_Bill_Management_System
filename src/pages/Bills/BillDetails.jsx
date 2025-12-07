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
      .get(`http://localhost:3000/bills/${id}`)
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
      await axios.post("http://localhost:3000/myBills", paymentData);
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
    <div className="space-y-6">
      <div className="p-4 border rounded shadow-sm bg-gray-50">
        <img
          src={bill.image}
          alt={bill.title}
          className="h-60 w-full object-cover mb-4 rounded"
        />
        <h2 className="text-2xl font-bold text-gray-950">{bill.title}</h2>
        <p className="text-sm text-gray-800">{bill.category}</p>
        <p className="text-sm text-gray-800">{bill.location}</p>
        <p className="text-gray-900 my-2">{bill.description}</p>
        <p className="font-bold text-blue-950 text-lg">৳ {bill.amount}</p>
        <p className="text-sm text-gray-700">Date: {bill.date}</p>

        <button
          onClick={() => setShowModal(true)}
          disabled={!isCurrentMonth}
          className={`mt-4 px-5 py-2 rounded text-white font-medium ${
            isCurrentMonth
              ? "bg-green-950 hover:bg-green-900"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          {isCurrentMonth ? "Pay Bill" : "Pay Only Current Month Bills"}
        </button>
      </div>

      {/* Pay Bill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-950">Pay Bill: {bill.title}</h3>
            
            <div className="mb-4 p-3 border rounded bg-gray-100">
              <p>
                <span className="font-semibold">Category:</span> {bill.category}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ৳ {bill.amount}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span> {bill.date}
              </p>
            </div>

            <form onSubmit={handlePayBill} className="space-y-3">
              <div>
                <label className="block text-gray-800 font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded bg-blue-950 text-white hover:bg-blue-900 disabled:opacity-60"
                >
                  {submitting ? "Paying..." : "Pay Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
