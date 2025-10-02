import React from "react";
import "./Admin.scss";
import AdminLayout from "./AdminLayout";
import AdminKindVehicle from "../../Components/ComponentPages/AdminPages/AdminKindVehicle";

function AdminKindvehiclePage() {
  return (
    <AdminLayout>
      <AdminKindVehicle />
    </AdminLayout>
  );
}

export default AdminKindvehiclePage;
