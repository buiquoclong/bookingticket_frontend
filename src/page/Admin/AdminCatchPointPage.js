import React from "react";
import "./Admin.scss";
import AdminLayout from "./AdminLayout";
import AdminCatchPoint from "../../Components/ComponentPages/AdminPages/AdminCatchPoint";

function AdminCatchPointPage() {
  return (
    <AdminLayout>
      <AdminCatchPoint />
    </AdminLayout>
  );
}

export default AdminCatchPointPage;
