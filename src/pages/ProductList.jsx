import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white p-10 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold mb-3">Welcome to My Shop 🛍</h1>
        <p className="text-lg opacity-90">
          Discover amazing products at the best prices, handpicked just for you.
        </p>
      </div>

      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
