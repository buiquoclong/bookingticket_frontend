import React from "react";
import "./Admin.scss";
import AdminHome from "../../Components/ComponentPages/AdminPages/AdminHome/AdminHome";
import AdminLayout from "./AdminLayout";

function AdminHomePage() {
  return (
    <AdminLayout>
      <AdminHome />
    </AdminLayout>
  );
}

export default AdminHomePage;
