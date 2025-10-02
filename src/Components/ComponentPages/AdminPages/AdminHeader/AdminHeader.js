import React, { useState, useEffect, useCallback } from "react";
import { Menu, MenuItem, styled, Box, Hidden } from "@mui/material";
import { BsJustify, BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import { Home, Person, PowerSettingsNew } from "@mui/icons-material";
// import "./Header.scss"
const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  justifyContent: "flex-end",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" },
});
const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));
function AdminHeader({ OpenSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId = localStorage.getItem("userId");
  // Dùng useCallback để giữ hàm fetchUserInfo không bị tái tạo lại mỗi lần render
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/user/${userId}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [userId]); // fetchUserInfo chỉ được tạo lại khi userId thay đổi

  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, [userId, fetchUserInfo]); // useEffect sẽ gọi lại fetchUserInfo khi userId thay đổi
  const handleUserInfoClick = () => {
    navigate("/info-user");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("googleLogin");
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>

      <UserMenu onClick={handleClick}>
        <Hidden xsDown>
          <span>
            {data && (
              <strong>
                Xin chào {data.name}
                {data.role === 2 && " (Nhân viên)"}
                {data.role === 3 && " (Admin)"}
              </strong>
            )}
          </span>
        </Hidden>
      </UserMenu>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledItem>
          <Link to="/" style={{ color: "black" }}>
            <Home />
            <span>Trang chủ</span>
          </Link>
        </StyledItem>

        <StyledItem onClick={handleUserInfoClick}>
          <Person />
          <span>Thông tin</span>
        </StyledItem>

        <StyledItem onClick={handleLogoutClick}>
          <PowerSettingsNew />
          <span>Đăng xuất</span>
        </StyledItem>
      </Menu>
    </header>
  );
}

export default AdminHeader;
