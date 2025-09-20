import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
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
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white p-12 text-center shadow-xl">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to My Shop 🛍</h1>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                    Discover amazing products at the best prices, handpicked just for you.
                </p>
            </div>

            {/* Product Grid */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Featured Products
                </h2>

                {loading ? (
                    // Skeleton shimmer loader
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-gray-200 rounded-xl h-72 shimmer"
                            ></div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">
                        No products available yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>



                )}
            </div>
        </div>
    );
}
