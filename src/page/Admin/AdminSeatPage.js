import React from "react";
import "./Admin.scss";
import AdminSeat from "../../Components/ComponentPages/AdminPages/AdminSeat";
import AdminLayout from "./AdminLayout";

function AdminSeatPage() {
  return (
    <AdminLayout>
      <AdminSeat />
    </AdminLayout>
  );
}

export default AdminSeatPage;
