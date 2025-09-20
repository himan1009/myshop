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

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* ✅ Slideshow with full image fit */}
            <div className="flex justify-center items-center">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-full max-w-lg rounded-lg shadow-lg"
                >
                    {product.images?.map((img, i) => (
                        <SwiperSlide
                            key={i}
                            className="flex justify-center items-center bg-white rounded-lg"
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
            <div>
                <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-3">{product.longDescription}</p>

                {/* Price & Discount */}
                <div className="mt-6">
                    {product.discountPercent > 0 ? (
                        <div>
                            <span className="text-3xl font-bold text-green-600">
                                ₹{Math.round(product.price * (1 - product.discountPercent / 100))}
                            </span>
                            <span className="ml-3 text-xl text-gray-400 line-through">
                                ₹{product.price}
                            </span>
                            <span className="ml-3 text-red-600 font-semibold">
                                {product.discountPercent}% OFF
                            </span>
                        </div>
                    ) : (
                        <span className="text-3xl font-bold text-indigo-600">
                            ₹{product.price}
                        </span>
                    )}
                </div>

                {/* Buy Now → WhatsApp */}
                <a
                    href={`https://wa.me/919508241335?text=I want to buy ${product.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700 transition"
                >
                    Buy Now on WhatsApp
                </a>
            </div>
        </div>
    );
}
