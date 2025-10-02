import React from "react";
import "./Admin.scss";
import AdminSeatReservation from "../../Components/ComponentPages/AdminPages/AdminSeatReservation";
import AdminLayout from "./AdminLayout";

function AdminSeatReservationPage() {
  return (
    <AdminLayout>
      <AdminSeatReservation />
    </AdminLayout>
  );
}

export default AdminSeatReservationPage;
