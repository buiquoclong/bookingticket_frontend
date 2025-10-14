import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../Assets/scss/Clients/Navbar.scss";
import { MdTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import useNavbar from "../../ComponentParts/useNavbar";
import {
  FaUserCircle,
  FaStar,
  FaReceipt,
  FaSignOutAlt,
  FaUserShield,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = React.forwardRef((props, ref) => {
  const {
    isActive,
    data,
    showDropdown,
    dropdownRef,
    navbarMenuRef,
    toggleDropdown,
    showNav,
    removeNavbar,
    handleNavigation,
    handleLogoutClick,
  } = useNavbar();

  const [scrolling, setScrolling] = useState(false);

  const [activeItem, setActiveItem] = useState("/");
  const menuItems = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "LỊCH TRÌNH", path: "/route" },
    { name: "TRA CỨU VÉ XE", path: "/search_ticket" },
    { name: "VÉ CỦA TÔI", path: "/my_ticket" },
    { name: "LIÊN HỆ", path: "/contact" },
    { name: "VỀ CHÚNG TÔI", path: "/aboutUs" },
  ];
  const handleItemClick = (path) => {
    setActiveItem(path); // cập nhật item active
    handleNavigation(path); // navigate
  };

  const location = useLocation();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="navbar-section">
      <header
        className={`navbar-header flex ${scrolling ? "shadow" : ""}`}
        ref={ref}
      >
        {/* Logo */}
        <div className="logo-div">
          <Link to="/" className="logo flex">
            <MdTravelExplore className="icon" />
            <span className="logo-text">RoadLines</span>
          </Link>
        </div>

        {/* Navbar menu */}
        <div
          className={`navbar-menu ${isActive ? "active" : ""}`}
          ref={navbarMenuRef}
        >
          <ul className="nav-list flex">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`nav-item ${
                  activeItem === item.path ? "active" : ""
                }`}
                onClick={() => handleItemClick(item.path)}
              >
                {item.name}
              </li>
            ))}

            {/* User info / Login */}
            <div className="user-info">
              {data ? (
                <div className="dropdown-container" ref={dropdownRef}>
                  <div
                    onClick={toggleDropdown}
                    className="dropdown-toggle flex items-center"
                  >
                    <FaUserCircle className="user-icon" />
                    <span>{data.name}</span>
                    <FaChevronDown
                      className={`chevron-icon ${
                        showDropdown ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {showDropdown && (
                    <div className="dropdown-menu flex flex-col">
                      <ul className="flex flex-col gap-4">
                        {(data.role === 2 || data.role === 3) && (
                          <li onClick={() => handleNavigation("/admin")}>
                            <FaUserShield /> Admin
                          </li>
                        )}
                        <li onClick={() => handleNavigation("/info-user")}>
                          <FaUserCircle /> Thông tin cá nhân
                        </li>
                        <li onClick={() => handleNavigation("/my-rating")}>
                          <FaStar /> Đánh giá của tôi
                        </li>
                        <li onClick={() => handleNavigation("/my-booking")}>
                          <FaReceipt /> Hóa đơn của tôi
                        </li>
                        <li onClick={handleLogoutClick}>
                          <FaSignOutAlt /> Đăng xuất
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn">ĐĂNG NHẬP / ĐĂNG KÝ</button>
                </Link>
              )}
            </div>
          </ul>

          {/* Close button (mobile) */}
          <div onClick={removeNavbar} className="close-navbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        {/* Toggle icon (mobile) */}
        <div
          onClick={showNav}
          className={`toggle-navbar ${isActive ? "hidden" : ""}`}
        >
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
});

export default Navbar;
