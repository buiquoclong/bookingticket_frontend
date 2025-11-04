import React, { useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import NotFoundPage from "./page/Admin/NotFoundPage";
import CustomToastContainer from "./Components/ComponentParts/CustomToastContainer";
import Layout from "./page/Client/Layout";
import Home from "./Components/ComponentPages/ClientPages/Home";
import SearchRoute from "./Components/ComponentPages/ClientPages/SearchRoute";
import SearchTicket from "./Components/ComponentPages/ClientPages/SearchTicket";
import Login from "./Components/ComponentPages/ClientPages/Login";
import Register from "./Components/ComponentPages/ClientPages/Register";
import BookingTicket from "./Components/ComponentPages/ClientPages/BookingTicket";
import BookTicket from "./Components/ComponentPages/ClientPages/BookTicket/BookTicket";
import BookTicketReturn from "./Components/ComponentPages/ClientPages/BookTicket/BookTicketReturn";
import InfoUser from "./Components/ComponentPages/ClientPages/InfoUser";
import Paysuccess from "./Components/ComponentPages/ClientPages/Paysuccess";
import Contact from "./Components/ComponentPages/ClientPages/Contact";
import AboutUs from "./Components/ComponentPages/ClientPages/AboutUs";
import MyRating from "./Components/ComponentPages/ClientPages/MyRating";
import MyBooking from "./Components/ComponentPages/ClientPages/MyBooking";
import ChangePass from "./Components/ComponentPages/ClientPages/ChangePass";
import ConfirmAccount from "./Components/ComponentPages/ClientPages/ConfirmAccount";
import ForgetPass from "./Components/ComponentPages/ClientPages/ForgetPass";
import ResponseSuccess from "./Components/ComponentPages/ClientPages/ResponsePay/ResponseSuccess";
import ResponseFailed from "./Components/ComponentPages/ClientPages/ResponsePay/ResponseFailed";
import TicketHistory from "./Components/ComponentPages/ClientPages/TicketHistory";
import ProtectedRoute from "./Components/ComponentParts/ProtectedRoute";
import AdminLayout from "./page/Admin/AdminLayout";
import AdminHome from "./Components/ComponentPages/AdminPages/AdminHome/AdminHome";
import AdminBooking from "./Components/ComponentPages/AdminPages/AdminBooking";
import AdminForBookTicket from "./Components/ComponentPages/AdminPages/AdminForBookTicket/AdminForBookTicket";
import AdminBookTicket from "./Components/ComponentPages/AdminPages/AdminBookTicket/AdminBookTicket";
import AdminBookTicketReturn from "./Components/ComponentPages/AdminPages/AdminBookTicket/AdminBookTicketReturn";
import AdminPaySuccess from "./Components/ComponentPages/AdminPages/AdminPaySuccess/AdminPaySuccess";
import AdminCity from "./Components/ComponentPages/AdminPages/AdminCity";
import AdminPay from "./Components/ComponentPages/AdminPages/AdminPay/AdminPay";
import AdminRoute from "./Components/ComponentPages/AdminPages/AdminRoute";
import AdminVehicle from "./Components/ComponentPages/AdminPages/AdminVehicle";
import AdminSeat from "./Components/ComponentPages/AdminPages/AdminSeat";
import AdminTrip from "./Components/ComponentPages/AdminPages/AdminTrip";
import AdminSeatReservation from "./Components/ComponentPages/AdminPages/AdminSeatReservation";
import AdminUser from "./Components/ComponentPages/AdminPages/AdminUser";
import AdminDriver from "./Components/ComponentPages/AdminPages/AdminDriver";
import AdminContact from "./Components/ComponentPages/AdminPages/AdminContact";
import AdminLog from "./Components/ComponentPages/AdminPages/AdminLog";
import AdminPromotion from "./Components/ComponentPages/AdminPages/AdminPromotion";
import AdminReview from "./Components/ComponentPages/AdminPages/AdminReview";
import AdminCatchPoint from "./Components/ComponentPages/AdminPages/AdminCatchPoint";
import AdminKindVehicle from "./Components/ComponentPages/AdminPages/AdminKindVehicle";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
const AppContent = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userRole1 = localStorage.getItem("userRole");
    if (userRole1 !== "" && userRole1 !== null) {
      const userRoleNumber = parseInt(userRole1, 10);
      if (!isNaN(userRoleNumber)) {
        setUserRole(userRoleNumber);
      } else {
        console.error("userRole is not a valid number");
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { exp } = jwtDecode(token);
        if (exp * 1000 < Date.now()) {
          // Token hết hạn
          toast.error("⛔ Token đã hết hạn, vui lòng đăng nhập lại!");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          setTimeout(() => navigate("/login"), 1500); // delay để toast hiện
        }
      } catch (err) {
        console.error("Token không hợp lệ:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <>
      <CustomToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/route" element={<SearchRoute />} />
          <Route path="/search_ticket" element={<SearchTicket />} />
          <Route path="/my_ticket" element={<TicketHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking-ticket" element={<BookingTicket />} />
          <Route path="/book-ticket" element={<BookTicket />} />
          <Route path="/book-ticketreturn" element={<BookTicketReturn />} />
          <Route path="/info-user" element={<InfoUser />} />
          <Route path="/pay-success" element={<Paysuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/my-rating" element={<MyRating />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/change_pass" element={<ChangePass />} />
          <Route path="/confirm-account" element={<ConfirmAccount />} />
          <Route path="/forget-pass" element={<ForgetPass />} />
          <Route path="/payment-success" element={<ResponseSuccess />} />
          <Route path="/payment-failed" element={<ResponseFailed />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[2, 3]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/bookings" element={<AdminBooking />} />
            <Route path="/admin/book-ticket" element={<AdminForBookTicket />} />
            <Route path="/admin/find-trips" element={<AdminBookTicket />} />
            <Route
              path="/admin/find-trips-return"
              element={<AdminBookTicketReturn />}
            />
            <Route
              path="/admin/book-cash-payment"
              element={<AdminPaySuccess />}
            />
            <Route
              path="/admin/cities"
              element={userRole === 3 ? <AdminCity /> : <NotFoundPage />}
            />
            <Route path="/admin/booking-trip" element={<AdminPay />} />
            <Route
              path="/admin/routes"
              element={userRole === 3 ? <AdminRoute /> : <NotFoundPage />}
            />
            <Route
              path="/admin/vehicles"
              element={userRole === 3 ? <AdminVehicle /> : <NotFoundPage />}
            />
            <Route
              path="/admin/seats"
              element={userRole === 3 ? <AdminSeat /> : <NotFoundPage />}
            />
            <Route path="/admin/trips" element={<AdminTrip />} />
            <Route
              path="/admin/seat-reservation"
              element={<AdminSeatReservation />}
            />
            <Route
              path="/admin/users"
              element={userRole === 3 ? <AdminUser /> : <NotFoundPage />}
            />
            <Route
              path="/admin/drivers"
              element={userRole === 3 ? <AdminDriver /> : <NotFoundPage />}
            />
            <Route path="/admin/contacts" element={<AdminContact />} />
            <Route
              path="/admin/logs"
              element={userRole === 3 ? <AdminLog /> : <NotFoundPage />}
            />
            <Route path="/admin/promotions" element={<AdminPromotion />} />
            <Route path="/admin/reviews" element={<AdminReview />} />
            <Route
              path="/admin/catch-point"
              element={userRole === 3 ? <AdminCatchPoint /> : <NotFoundPage />}
            />
            <Route
              path="/admin/kind-vehicle"
              element={userRole === 3 ? <AdminKindVehicle /> : <NotFoundPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
