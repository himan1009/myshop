import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";  // ✅ add this

export default function App() {
  return (
    <div className="app-container max-w-6xl mx-auto px-4">
      <header className="flex items-center justify-between py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-b-lg shadow-md">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          🛍 My Shop
        </Link>
        <nav>
          <Link
            to="/admin"
            className="text-sm px-4 py-2 bg-white text-indigo-600 font-medium rounded-full hover:bg-gray-100 transition"
          >
            Admin
          </Link>
        </nav>
      </header>

      <main className="mt-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* ✅ Protect this route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
