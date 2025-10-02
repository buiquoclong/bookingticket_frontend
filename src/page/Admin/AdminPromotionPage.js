import React from "react";
import "./Admin.scss";
import AdminPromotion from "../../Components/ComponentPages/AdminPages/AdminPromotion";
import AdminLayout from "./AdminLayout";

function AdminPromotionPage() {
  return (
    <AdminLayout>
      <AdminPromotion />
    </AdminLayout>
  );
}

export default AdminPromotionPage;
