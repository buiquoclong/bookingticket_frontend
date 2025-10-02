import React from "react";
import "./Admin.scss";
import AdminLayout from "./AdminLayout";
import AdminBookTicket from "../../Components/ComponentPages/AdminPages/AdminBookTicket/AdminBookTicket";

function AdminBookTicketPage() {
  return (
    <AdminLayout>
      <AdminBookTicket />
    </AdminLayout>
  );
}

export default AdminBookTicketPage;
