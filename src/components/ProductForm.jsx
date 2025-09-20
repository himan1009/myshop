import React, { useState } from "react";
import api from "../api/axios";

export default function ProductForm({ initialData, onSaved, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [longDescription, setLongDescription] = useState(
    initialData?.longDescription || ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [discountPercent, setDiscountPercent] = useState(
    initialData?.discountPercent || 0
  );
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [files, setFiles] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("shortDescription", shortDescription);
    fd.append("longDescription", longDescription);
    fd.append("price", price);
    fd.append("discountPercent", discountPercent);
    fd.append("stock", stock);
    files.forEach((f) => fd.append("images", f));

    if (initialData?._id) {
      await api.put(`/api/admin/products/${initialData._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await api.post("/api/admin/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded bg-white">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="Short description"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        placeholder="Long description"
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-1/3 border p-2 rounded"
        />
        <input
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="Discount %"
          type="number"
          className="w-1/3 border p-2 rounded"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          type="number"
          className="w-1/3 border p-2 rounded"
        />
      </div>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
