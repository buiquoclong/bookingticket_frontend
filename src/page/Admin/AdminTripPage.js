import React from "react";
import "./Admin.scss";
import AdminTrip from "../../Components/ComponentPages/AdminPages/AdminTrip";
import AdminLayout from "./AdminLayout";

function AdminTripPage() {
  return (
    <AdminLayout>
      <AdminTrip />
    </AdminLayout>
  );
}

export default AdminTripPage;
