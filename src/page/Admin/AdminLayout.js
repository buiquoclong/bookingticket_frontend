import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../Components/ComponentPages/AdminPages/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/ComponentPages/AdminPages/AdminSideBar/AdminSidebar";
import "./Admin.scss";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`admin-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <AdminHeader OpenSidebar={toggleSidebar} />
      <AdminSidebar
        openSidebarToggle={isSidebarOpen}
        OpenSidebar={toggleSidebar}
      />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
