import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🚫 Not logged in → send to login
    return <Navigate to="/admin" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}
