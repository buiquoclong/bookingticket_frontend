import React, { useState, useEffect, useCallback } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person, PowerSettingsNew } from "@mui/icons-material";
import "./AdminHeader.scss";
import { sendRequest } from "../../../../Utils/apiHelper";
import { GET_USER_BY_ID } from "../../../../Utils/apiUrls";

function AdminHeader({ OpenSidebar }) {
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleUserInfoClick = () => {
    navigate("/info-user");
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="admin-header">
      {/* Bên trái */}
      <div className="header-left">
        <div className="menu-toggle" onClick={OpenSidebar}>
          ☰
        </div>
        <div className="logo">BOOKING</div>
      </div>

      {/* Bên phải */}
      <div className="header-right">
        <div
          className={`user-menu ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <Avatar sx={{ width: 40, height: 40 }}>
            {userData?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <div className="user-info">
            <span className="username">{userData?.name || "User"}</span>
            <span className="role">
              {userData?.role === 2
                ? "Nhân viên"
                : userData?.role === 3
                ? "Admin"
                : "Người dùng"}
            </span>
          </div>
          <span className="arrow">▼</span>

          {isDropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={handleUserInfoClick}>
                <Person className="icon" />
                <span>Thông tin</span>
              </div>
              <div className="dropdown-item" onClick={handleLogoutClick}>
                <PowerSettingsNew className="icon" />
                <span>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
