import React, { useState, useEffect, useRef, useCallback } from "react";
import "./navbar.scss";
import { MdTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const [data, setData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  // Function to toggle navbar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  // const userId = localStorage.getItem("userId");

  // Function to remove navbar
  const removeNavbar = () => {
    setActive("navBar");
  };

  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8081/api/user/token", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const userRole = decodedToken.role;

        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);

        setUserId(userId);

        // ✅ Điều hướng theo role
        if (userRole === 1) {
          navigate("/");
        } else if (userRole === 2 || userRole === 3) {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Fetch thông tin user
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/user/${userId}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [userId]);

  // ✅ Nếu là Google Login, gọi fetchToken
  useEffect(() => {
    const googleLogin = localStorage.getItem("googleLogin") === "true";
    if (googleLogin) {
      fetchToken();
    }
  }, [fetchToken]);

  // ✅ Khi có userId, fetch thông tin user
  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, [userId, fetchUserInfo]);

  const handleUserInfoClick = () => {
    navigate("/info-user");
  };
  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("googleLogin");
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };
  const handleMyRatingClick = () => {
    navigate("/my-rating");
  };
  const handleMyBookingClick = () => {
    navigate("/my-booking");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <MdTravelExplore className="icon" />
            <h1>RoadLines</h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                TRANG CHỦ
              </Link>
            </li>
            <li className="navItem">
              <Link to="/route" className="navLink">
                LỊCH TRÌNH
              </Link>
            </li>
            <li className="navItem">
              <Link to="/search_ticket" className="navLink">
                TRA CỨU VÉ XE
              </Link>
            </li>
            <li className="navItem">
              <Link to="/my_ticket" className="navLink">
                VÉ CỦA TÔI
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">
                LIÊN HỆ
              </Link>
            </li>
            <li className="navItem">
              <Link to="/aboutUs" className="navLink">
                VỀ CHÚNG TÔI
              </Link>
            </li>
            <div className="infoUser">
              {userId ? (
                <div
                  className="dropdown-container"
                  ref={dropdownRef}
                  style={{ cursor: "pointer" }}
                >
                  <div onClick={toggleDropdown} className="dropdown-toggle">
                    {data && <span>{data.name}</span>}
                  </div>
                  {showDropdown && (
                    <div className="flex flex-col dropdown">
                      <ul className="flex flex-col gap-4">
                        {data && (data.role === 2 || data.role === 3) && (
                          <li onClick={handleAdminClick}>Admin</li>
                        )}
                        <li onClick={handleUserInfoClick}>
                          Thông tin người dùng
                        </li>
                        <li onClick={handleMyRatingClick}>Đánh giá của tôi</li>
                        <li onClick={handleMyBookingClick}>Hóa đơn của tôi</li>
                        <li onClick={handleLogoutClick}>Đăng xuất</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn">ĐĂNG NHẬP/ ĐĂNG KÝ</button>
                </Link>
              )}
            </div>
          </ul>
          <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};
export default Navbar;
