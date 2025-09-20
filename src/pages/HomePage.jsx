import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20">
      {/* 🏠 Home Section */}
      <section
        id="home"
        className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl py-16 px-6 shadow-lg"
      >
        <h1 className="text-4xl font-extrabold mb-4">Welcome to My Shop 🛍</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Why leave the building when you can get what you need for less? Welcome
          to your new on-site store, where we offer exclusive PG-only discounts
          on all your essentials. Browse and shop now to save time and money!
        </p>
      </section>

      {/* ⭐ All Products */}
      <section id="featured">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          ⭐ Our Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ℹ️ About Section */}
      <section
        id="about"
        className="bg-gray-50 rounded-3xl p-10 shadow-inner text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At <span className="font-semibold text-indigo-600">My Shop</span>, we
          believe shopping should be simple, stylish, and stress-free. We curate
          products with a focus on quality, design, and affordability. Whether
          you’re looking for everyday essentials or unique finds, our collection
          has something just for you.
        </p>
      </section>

      {/* 📞 Contact Section */}
      <section
        id="contact"
        className="text-center bg-white rounded-3xl p-10 shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          Have questions? We’d love to hear from you. Reach out anytime!
        </p>

        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-left">
            <p className="font-semibold text-gray-700">📧 Email:</p>
            <p className="text-gray-600">shishusha922@gmail.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-left">
            <p className="font-semibold text-gray-700">📞 Phone:</p>
            <p className="text-gray-600">+91 9508241335</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-left">
            <p className="font-semibold text-gray-700">📍 Address:</p>
            <p className="text-gray-600">
              CM 63, Sector 144, Noida, Uttar Pradesh
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
