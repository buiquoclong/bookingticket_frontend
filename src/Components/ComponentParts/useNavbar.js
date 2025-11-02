import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { sendRequest } from "../../Utils/apiHelper";
import { GET_USER_BY_ID, GET_USER_TOKEN } from "../../Utils/apiUrls";

const useNavbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navbarMenuRef = useRef(null);

  const location = useLocation();

  // Khi route thay đổi, đóng navbar mobile
  useEffect(() => {
    setIsActive(false);
  }, [location.pathname]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const showNav = () => setIsActive(true);
  const removeNavbar = () => setIsActive(false);

  const fetchToken = useCallback(async () => {
    try {
      const res = await sendRequest(
        GET_USER_TOKEN,
        "GET",
        { includeCredentials: true } // ✅ Thêm tùy chọn này
      );

      const token = res?.token || (typeof res === "string" ? res : null);
      if (!token) throw new Error("Token không hợp lệ");

      localStorage.setItem("token", token);

      const { userId, role: userRole } = jwtDecode(token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);
      setUserId(userId);

      if (userRole === 1) navigate("/");
      else if (userRole === 2 || userRole === 3) navigate("/admin");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await sendRequest(GET_USER_BY_ID(userId));
      setData(data);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    if (localStorage.getItem("googleLogin") === "true") fetchToken();
  }, [fetchToken]);

  useEffect(() => {
    fetchUserInfo();
  }, [userId, fetchUserInfo]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
      // Navbar mobile: bỏ qua toggle-navbar
      if (
        navbarMenuRef.current &&
        !navbarMenuRef.current.contains(e.target) &&
        !e.target.closest(".toggle-navbar")
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNavigation = useCallback((path) => navigate(path), [navigate]);

  const handleLogoutClick = () => {
    ["token", "userId", "userRole", "googleLogin"].forEach((k) =>
      localStorage.removeItem(k)
    );
    // ✅ Reset lại state user
    setData(null);
    navigate("/");
  };

  return {
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
  };
};

export default useNavbar;
