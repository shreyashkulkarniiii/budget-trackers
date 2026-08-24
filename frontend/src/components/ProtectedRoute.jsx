import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="screen-center">Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
