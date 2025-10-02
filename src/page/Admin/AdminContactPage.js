import React from "react";
import "./Admin.scss";
import AdminContact from "../../Components/ComponentPages/AdminPages/AdminContact";
import AdminLayout from "./AdminLayout";

function AdminContactPage() {
  return (
    <AdminLayout>
      <AdminContact />
    </AdminLayout>
  );
}

export default AdminContactPage;
