import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage"; // ✅ new landing page

export default function App() {
  return (
    <div className="app-container">
      {/* 🔥 Premium Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition"
          >
            🛍 <span className="hidden sm:inline">My Shop</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <a href="/#home" className="hover:text-indigo-600 transition">Home</a>
            <a href="/#featured" className="hover:text-indigo-600 transition">Featured</a>
            <a href="/#about" className="hover:text-indigo-600 transition">About</a>
            <a href="/#contact" className="hover:text-indigo-600 transition">Contact</a>

          </nav>

          {/* Admin Button */}
          <Link
            to="/admin"
            className="text-sm px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* 🔹 Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          {/* ✅ HomePage with sections */}
          <Route path="/" element={<HomePage />} />

          {/* ✅ Product detail page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* ✅ Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ✅ Protected Admin Dashboard */}
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
