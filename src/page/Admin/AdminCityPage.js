import React from "react";
import "./Admin.scss";
import AdminCity from "../../Components/ComponentPages/AdminPages/AdminCity";
import AdminLayout from "./AdminLayout";

function AdminCityPage() {
  return (
    <AdminLayout>
      <AdminCity />
    </AdminLayout>
  );
}

export default AdminCityPage;
