
// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import LogoutButton from "../components/LogoutButton";

// export default function AdminDashboard() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     shortDescription: "",
//     longDescription: "",
//     price: "",
//     discountPercent: "",
//     stock: "",
//     images: [],
//   });
//   const [editing, setEditing] = useState(null);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   // Auto clear error after 5s
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(""), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // Load products
//   useEffect(() => {
//     if (!token) return;
//     api
//       .get("/api/admin/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setProducts(res.data))
//       .catch(() => setError("Failed to fetch products"));
//   }, [token]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setForm({ ...form, [name]: files });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // Submit new product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       Object.entries(form).forEach(([key, value]) => {
//         if (key === "images") {
//           for (let i = 0; i < value.length; i++) {
//             data.append("images", value[i]);
//           }
//         } else {
//           data.append(key, value);
//         }
//       });

//       const res = await api.post("/api/admin/products", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setProducts([res.data, ...products]);
//       setForm({
//         name: "",
//         shortDescription: "",
//         longDescription: "",
//         price: "",
//         discountPercent: "",
//         stock: "",
//         images: [],
//       });
//     } catch {
//       setError("Failed to add product");
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await api.delete(`/api/admin/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(products.filter((p) => p._id !== id));
//     } catch {
//       setError("Failed to delete product");
//     }
//   };

//   // Update product
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData(e.target);
//       await api.put(`/api/admin/products/${editing._id}`, data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const res = await api.get("/api/admin/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(res.data);
//       setEditing(null);
//     } catch {
//       setError("Failed to update product");
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-lg shadow-sm text-center font-medium">
//           {error}
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-extrabold tracking-wide">
//           🛠 Admin Dashboard
//         </h2>
//         <LogoutButton />
//       </div>

//       {/* Add Product Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl p-8 rounded-xl mb-12 border border-gray-100"
//       >
//         <h3 className="text-lg font-bold text-gray-800 mb-6">
//           ➕ Add New Product
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input
//             name="shortDescription"
//             value={form.shortDescription}
//             onChange={handleChange}
//             placeholder="Short Description"
//             className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//           <textarea
//             name="longDescription"
//             value={form.longDescription}
//             onChange={handleChange}
//             placeholder="Long Description"
//             className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 md:col-span-2"
//           />
//           <input
//             name="price"
//             type="number"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input
//             name="discountPercent"
//             type="number"
//             value={form.discountPercent}
//             onChange={handleChange}
//             placeholder="Discount %"
//             className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             name="stock"
//             type="number"
//             value={form.stock}
//             onChange={handleChange}
//             placeholder="Stock"
//             className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             name="images"
//             type="file"
//             multiple
//             onChange={handleChange}
//             className="col-span-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
//         >
//           Add Product
//         </button>
//       </form>

//       {/* Product List */}
//       <div>
//         <h3 className="text-xl font-bold text-gray-800 mb-6">📦 Product List</h3>
//         {products.length === 0 ? (
//           <p className="text-gray-500">No products yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {products.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-white border rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col"
//               >
//                 <img
//                   src={p.images?.[0]?.url || "/placeholder.png"}
//                   alt={p.name}
//                   className="h-40 w-full object-cover mb-4 rounded-lg"
//                 />
//                 <h4 className="font-bold text-lg text-gray-800 mb-1 truncate">
//                   {p.name}
//                 </h4>
//                 <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//                   {p.shortDescription}
//                 </p>
//                 <div className="mt-auto flex justify-between items-center">
//                   <span className="text-indigo-600 font-bold">₹{p.price}</span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setEditing(p)}
//                       className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {editing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl">
//             <h3 className="text-lg font-bold mb-6 text-indigo-700">
//               ✏️ Edit Product
//             </h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <input
//                 name="name"
//                 defaultValue={editing.name}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//               <textarea
//                 name="longDescription"
//                 defaultValue={editing.longDescription}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 name="price"
//                 type="number"
//                 defaultValue={editing.price}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 name="discountPercent"
//                 type="number"
//                 defaultValue={editing.discountPercent}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 name="stock"
//                 type="number"
//                 defaultValue={editing.stock}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />

//               {/* Current images with ❌ buttons */}
//               <div>
//                 <p className="text-sm font-semibold mb-2">Current Images:</p>
//                 <div className="grid grid-cols-3 gap-3">
//                   {editing.images?.map((img) => (
//                     <div key={img.url} className="relative group">
//                       <img
//                         src={img.url}
//                         alt=""
//                         className="h-24 w-full object-cover rounded border"
//                       />
//                       <button
//                         type="button"
//                         onClick={async () => {
//                           if (!window.confirm("Remove this image?")) return;
//                           try {
//                             await api.delete(
//                               `/api/admin/products/${editing._id}/images`,
//                               { data: { url: img.url } }
//                             );
//                             const refreshed = await api.get("/api/admin/products");
//                             setProducts(refreshed.data);
//                             const updated = refreshed.data.find(
//                               (p) => p._id === editing._id
//                             );
//                             setEditing(updated);
//                           } catch {
//                             setError("Failed to delete image");
//                           }
//                         }}
//                         className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 opacity-80 hover:opacity-100"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Add new images */}
//               <input name="images" type="file" multiple />

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setEditing(null)}
//                   className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import api from "../api/axios";
import LogoutButton from "../components/LogoutButton";
import ImageDeleteCard from "../components/ImageDeleteCard";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        shortDescription: "",
        longDescription: "",
        price: "",
        discountPercent: "",
        stock: "",
        images: [],
    });
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [adding, setAdding] = useState(false);



    const token = localStorage.getItem("token");

    // Auto clear error after 5s
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Load products
    useEffect(() => {
        if (!token) return;
        api
            .get("/api/admin/products", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setProducts(res.data))
            .catch(() => setError("Failed to fetch products"));
    }, [token]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Submit new product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAdding(true); // show loader

        try {
            const data = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (key === "images") {
                    for (let i = 0; i < value.length; i++) {
                        data.append("images", value[i]);
                    }
                } else {
                    data.append(key, value);
                }
            });

            const res = await api.post("/api/admin/products", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setProducts([res.data, ...products]);

            // ✅ Reset form (including file input)
            setForm({
                name: "",
                shortDescription: "",
                longDescription: "",
                price: "",
                discountPercent: "",
                stock: "",
                images: [],
            });
            e.target.reset(); // 🔑 clear file input UI
        } catch {
            setError("Failed to add product");
        } finally {
            setAdding(false); // stop loader
        }
    };


    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await api.delete(`/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter((p) => p._id !== id));
        } catch {
            setError("Failed to delete product");
        }
    };

    // Update product
    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true); // start loader
        try {
            const data = new FormData(e.target);
            await api.put(`/api/admin/products/${editing._id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const res = await api.get("/api/admin/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);
            setEditing(null);
        } catch {
            setError("Failed to update product");
        } finally {
            setSaving(false); // stop loader
        }
    };


    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
            {/* Error Message */}
            {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-lg shadow-sm text-center font-medium">
                    {error}
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg">
                <h2 className="text-2xl font-extrabold tracking-wide">
                    🛠 Admin Dashboard
                </h2>
                <LogoutButton />
            </div>

            {/* Add Product Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl p-8 rounded-xl mb-12 border border-gray-100"
            >
                <h3 className="text-lg font-bold text-gray-800 mb-6">
                    ➕ Add New Product
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        name="shortDescription"
                        value={form.shortDescription}
                        onChange={handleChange}
                        placeholder="Short Description"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="longDescription"
                        value={form.longDescription}
                        onChange={handleChange}
                        placeholder="Long Description"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                    />
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        name="discountPercent"
                        type="number"
                        value={form.discountPercent}
                        onChange={handleChange}
                        placeholder="Discount %"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="images"
                        type="file"
                        multiple
                        onChange={handleChange}
                        className="col-span-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={adding}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                    {adding ? (
                        <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Adding...
                        </>
                    ) : (
                        "Add Product"
                    )}
                </button>

            </form>

            {/* Product List */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">📦 Product List</h3>
                {products.length === 0 ? (
                    <p className="text-gray-500">No products yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((p) => (
                            <div
                                key={p._id}
                                className="bg-white border rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 p-5 flex flex-col"
                            >
                                <img
                                    src={p.images?.[0]?.url || "/placeholder.png"}
                                    alt={p.name}
                                    className="h-40 w-full object-cover mb-4 rounded-lg"
                                />
                                <h4 className="font-bold text-lg text-gray-800 mb-1 truncate">
                                    {p.name}
                                </h4>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                    {p.shortDescription}
                                </p>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-indigo-600 font-bold">₹{p.price}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditing(p)}
                                            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl relative">
                        <h3 className="text-lg font-bold mb-6 text-indigo-700">✏️ Edit Product</h3>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            {/* Inputs */}
                            <input
                                name="name"
                                defaultValue={editing.name}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <textarea
                                name="longDescription"
                                defaultValue={editing.longDescription}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="price"
                                type="number"
                                defaultValue={editing.price}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="discountPercent"
                                type="number"
                                defaultValue={editing.discountPercent}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="stock"
                                type="number"
                                defaultValue={editing.stock}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            {/* Current images with ❌ buttons */}
                            <div>
                                <p className="text-sm font-semibold mb-2">Current Images:</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {editing.images?.map((img) => (
                                        <ImageDeleteCard
                                            key={img.url}
                                            img={img}
                                            productId={editing._id}
                                            setProducts={setProducts}
                                            setEditing={setEditing}
                                            setError={setError}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Add new images */}
                            <input name="images" type="file" multiple />

                            {/* Save / Cancel */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditing(null)}
                                    className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow flex items-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
