import React from "react";
import "./Admin.scss";
import AdminForBookTicket from "../../Components/ComponentPages/AdminPages/AdminForBookTicket/AdminForBookTicket";
import AdminLayout from "./AdminLayout";

function AdminForBookingPage() {
  return (
    <AdminLayout>
      <AdminForBookTicket />
    </AdminLayout>
  );
}

export default AdminForBookingPage;
