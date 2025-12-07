import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="p-10 text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600">${product.price}</p>

        <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
