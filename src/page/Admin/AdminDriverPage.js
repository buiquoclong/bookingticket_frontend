import React from "react";
import "./Admin.scss";
import AdminDriver from "../../Components/ComponentPages/AdminPages/AdminDriver";
import AdminLayout from "./AdminLayout";

function AdminDriverPage() {
  return (
    <AdminLayout>
      <AdminDriver />
    </AdminLayout>
  );
}

export default AdminDriverPage;
