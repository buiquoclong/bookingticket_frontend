import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // Lấy userRole từ localStorage và chuyển về number
  const userRole = Number(localStorage.getItem("userRole"));

  // Nếu role không hợp lệ, redirect về login
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  // Nếu hợp lệ, render Outlet (các route con)
  return <Outlet />;
};

export default ProtectedRoute;
