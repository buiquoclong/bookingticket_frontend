import React from "react";
import "./Admin.scss";
import AdminPay from "../../Components/ComponentPages/AdminPages/AdminPay/AdminPay";
import AdminLayout from "./AdminLayout";

function AdminPayPage() {
  return (
    <AdminLayout>
      <AdminPay />
    </AdminLayout>
  );
}

export default AdminPayPage;
