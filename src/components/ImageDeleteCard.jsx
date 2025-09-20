import React, { useState } from "react";
import api from "../api/axios";

export default function ImageDeleteCard({ img, productId, setProducts, setEditing, setError }) {
  const [loading, setLoading] = useState(false);

  const handleDeleteImage = async () => {
    if (!window.confirm("Remove this image?")) return;
    setLoading(true);
    try {
      await api.delete(`/api/admin/products/${productId}/images`, {
        data: { url: img.url },
      });

      // refresh products after deletion
      const refreshed = await api.get("/api/admin/products");
      setProducts(refreshed.data);
      const updated = refreshed.data.find((p) => p._id === productId);
      setEditing(updated);
    } catch {
      setError("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <img
        src={img.url}
        alt=""
        className={`h-24 w-full object-cover rounded border ${loading ? "opacity-50" : ""}`}
      />

      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDeleteImage}
        disabled={loading}
        className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 opacity-80 hover:opacity-100 flex items-center"
      >
        {loading ? (
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "✕"
        )}
      </button>
    </div>
  );
}
