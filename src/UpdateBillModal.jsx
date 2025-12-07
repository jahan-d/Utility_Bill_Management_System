import React, { useState } from "react";

export default function UpdateBillModal({ bill, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    amount: bill.amount,
    address: bill.address,
    phone: bill.phone,
    date: bill.date,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(bill._id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Bill</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Amount"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Phone"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
