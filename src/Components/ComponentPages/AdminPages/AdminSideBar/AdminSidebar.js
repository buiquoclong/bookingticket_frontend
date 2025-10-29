import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import {
  Dashboard,
  BookOnline,
  DirectionsBus,
  ReceiptLong,
  EventSeat,
  LocalOffer,
  RateReview,
  ContactMail,
  People,
  LocationCity,
  Commute,
  HistoryEdu,
  Map,
  AirportShuttle,
} from "@mui/icons-material";
import "./AdminSidebar.scss";
import { GET_USER_BY_ID } from "../../../../Utils/apiUrls";
import { sendRequest } from "../../../../Utils/apiHelper";

// Menu chung
const MENU_ITEMS = [
  { path: "", label: "Thống kê", icon: <Dashboard /> },
  { path: "book-ticket", label: "Đặt vé", icon: <BookOnline /> },
  { path: "trips", label: "Chuyến đi", icon: <DirectionsBus /> },
  { path: "bookings", label: "Hóa đơn", icon: <ReceiptLong /> },
  { path: "seat-reservation", label: "Ghế đặt trước", icon: <EventSeat /> },
  { path: "promotions", label: "Khuyến mãi", icon: <LocalOffer /> },
  { path: "reviews", label: "Đánh giá", icon: <RateReview /> },
  { path: "contacts", label: "Liên hệ", icon: <ContactMail /> },
];

// Admin only
const ADMIN_MENU = [
  { path: "users", label: "Người dùng", icon: <People /> },
  { path: "cities", label: "Thành phố", icon: <LocationCity /> },
  { path: "vehicles", label: "Phương tiện", icon: <Commute /> },
  { path: "seats", label: "Ghế ngồi", icon: <EventSeat /> },
  { path: "routes", label: "Tuyến đi", icon: <Map /> },
  { path: "drivers", label: "Tài xế", icon: <People /> },
  { path: "catch-point", label: "Điểm đón tuyến", icon: <AirportShuttle /> },
  { path: "kind-vehicle", label: "Loại xe", icon: <Commute /> },
  { path: "logs", label: "Log", icon: <HistoryEdu /> },
];

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
  const [activeTab, setActiveTab] = useState(null);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await sendRequest(GET_USER_BY_ID(userId));
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "";
    setActiveTab(currentPath);
  }, [location]);

  return (
    <aside className={`admin-sidebar ${openSidebarToggle ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="brand">
          <BookOnline className="brand-icon" />
          <span>BOOKING</span>
        </div>
        <button className="close-btn" onClick={OpenSidebar}>
          ×
        </button>
      </div>

      <ul className="sidebar-menu">
        {MENU_ITEMS.map((item) => (
          <Link key={item.path} to={`/admin/${item.path}`}>
            <li
              className={`menu-item ${activeTab === item.path ? "active" : ""}`}
              onClick={() => setActiveTab(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          </Link>
        ))}

        {userData &&
          userData.role === 3 &&
          ADMIN_MENU.map((item) => (
            <Link key={item.path} to={`/admin/${item.path}`}>
              <li
                className={`menu-item ${
                  activeTab === item.path ? "active" : ""
                }`}
                onClick={() => setActiveTab(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            </Link>
          ))}
      </ul>

      {userData && (
        <div className="sidebar-footer">
          <Avatar sx={{ width: 40, height: 40 }}>
            {userData.name[0].toUpperCase()}
          </Avatar>
          <span>{userData.name}</span>
        </div>
      )}
    </aside>
  );
}

export default AdminSidebar;
