import React from "react";
import "./Admin.scss";
import AdminVehicle from "../../Components/ComponentPages/AdminPages/AdminVehicle";
import AdminLayout from "./AdminLayout";

function AdminVehiclePage() {
  return (
    <AdminLayout>
      <AdminVehicle />
    </AdminLayout>
  );
}

export default AdminVehiclePage;
