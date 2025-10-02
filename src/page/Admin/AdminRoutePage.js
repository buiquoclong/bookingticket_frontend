import React from "react";
import "./Admin.scss";
import AdminRoute from "../../Components/ComponentPages/AdminPages/AdminRoute";
import AdminLayout from "./AdminLayout";

function AdminRoutePage() {
  return (
    <AdminLayout>
      <AdminRoute />
    </AdminLayout>
  );
}

export default AdminRoutePage;
