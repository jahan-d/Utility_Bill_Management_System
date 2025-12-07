import { useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Product 1",
      price: 1499,
      image: "https://picsum.photos/200/300?random=21",
    },
    {
      id: 2,
      title: "Product 2",
      price: 999,
      image: "https://picsum.photos/200/300?random=22",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-sm hover:shadow-lg transition p-4 bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-lg font-semibold mt-3">{item.title}</h2>
              <p className="text-gray-700 font-medium">৳ {item.price}</p>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
