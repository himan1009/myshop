import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstImage =
    product.images && product.images[0] ? product.images[0].url : "/placeholder.png";
  const price = product.price || 0;
  const discount = product.discountPercent || 0;
  const discountedPrice = Math.round(price * (1 - discount / 100));

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
      <Link to={`/product/${product._id}`}>
        {/* ✅ Fixed 4:3 ratio using height */}
        <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="font-semibold text-lg text-gray-800 truncate">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-sm text-gray-500 line-clamp-2 flex-grow">
            {product.shortDescription}
          </p>

          {/* Price / Discount */}
          <div className="mt-3">
            {discount > 0 ? (
              <div>
                <span className="font-bold text-xl text-green-600">
                  ₹{discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{price}
                </span>
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  {discount}% OFF
                </span>
              </div>
            ) : (
              <span className="font-bold text-xl text-indigo-600">₹{price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
