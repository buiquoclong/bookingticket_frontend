import React from "react";
import "./Admin.scss";
import AdminBookTicketReturn from "../../Components/ComponentPages/AdminPages/AdminBookTicketReturn/AdminBookTicketReturn";
import AdminLayout from "./AdminLayout";

function AdminBookTicketReturnPage() {
  return (
    <AdminLayout>
      <AdminBookTicketReturn />
    </AdminLayout>
  );
}

export default AdminBookTicketReturnPage;
