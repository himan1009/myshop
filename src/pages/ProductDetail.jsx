import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/api/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  const price = product.price || 0;
  const discount = product.discountPercent || 0;
  const discountedPrice = Math.round(price * (1 - discount / 100));

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* ✅ Slideshow */}
      <div className="flex justify-center items-start">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full max-w-xl rounded-2xl shadow-lg border"
        >
          {product.images?.map((img, i) => (
            <SwiperSlide
              key={i}
              className="flex justify-center items-center bg-gray-50 rounded-lg"
            >
              <img
                src={img.url}
                alt={product.name}
                className="w-full h-[500px] object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>

          {/* Price & Discount */}
          <div className="mt-6">
            {discount > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-4xl font-extrabold text-green-600">
                  ₹{discountedPrice}
                </span>
                <span className="text-xl text-gray-400 line-through">₹{price}</span>
                <span className="ml-2 text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                  {discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-4xl font-extrabold text-indigo-600">₹{price}</span>
            )}
          </div>

          {/* Stock Info */}
          <p
            className={`mt-4 font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>
        </div>

        {/* ✅ Buy Now Only */}
        <div className="mt-10">
          <a
            href={`https://wa.me/919508241335?text=I want to buy ${product.name}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block px-8 py-4 bg-green-600 text-white text-lg font-bold rounded-xl shadow hover:bg-green-700 transition text-center"
          >
            🛒 Buy Now on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
