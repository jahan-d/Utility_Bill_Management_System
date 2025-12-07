import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center p-10 text-xl font-semibold">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="space-y-6">
        {cart.map(item => (
          <div key={item._id} className="flex items-center gap-6 p-4 border rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-28 h-28 rounded-lg object-cover" />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 text-2xl font-bold">
        Total: ${totalPrice}
      </div>
    </div>
  );
}
