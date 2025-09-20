import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstImage =
    product.images && product.images[0] ? product.images[0].url : "/placeholder.png";
  const price = product.price || 0;
  const discount = product.discountPercent || 0;
  const discountedPrice = Math.round(price * (1 - discount / 100));

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100">
      <Link to={`/product/${product._id}`}>
        <div className="relative">
          <img
            src={firstImage}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover rounded-t-2xl"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between mt-2">
            {discount > 0 ? (
              <div>
                <span className="font-bold text-xl text-green-600">
                  ₹{discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{price}
                </span>
              </div>
            ) : (
              <span className="font-bold text-xl text-indigo-600">₹{price}</span>
            )}

            <button className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-full hover:bg-indigo-700 transition">
              View
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
