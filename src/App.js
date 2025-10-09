import React, { useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminHomePage from "./page/Admin/AdminHomePage";
// import AdminBookingDetailPage from "./Admin/page/AdminBookingDetailPage";
import AdminBookingPage from "./page/Admin/AdminBookingPage";
import AdminBookTicketPage from "./page/Admin/AdminBookTicketPage";
import AdminCityPage from "./page/Admin/AdminCityPage";
import AdminPayPage from "./page/Admin/AdminPayPage";
import AdminVehiclePage from "./page/Admin/AdminVehiclePage";
import AdminSeatPage from "./page/Admin/AdminSeatPage";
import AdminRoutePage from "./page/Admin/AdminRoutePage";
import AdminTripPage from "./page/Admin/AdminTripPage";
import AdminSeatReservationPage from "./page/Admin/AdminSeatReservationPage";
import AdminUserPage from "./page/Admin/AdminUserPage";
import AdminBookTicketReturnPage from "./page/Admin/AdminBookTicketReturnPage";
import AdminDriverPage from "./page/Admin/AdminDriverPage";
import AdminContactPage from "./page/Admin/AdminContactPage";
import AdminLogPage from "./page/Admin/AdminLogPage";
import AdminPromotionPage from "./page/Admin/AdminPromotionPage";
import AdminReviewPage from "./page/Admin/AdminReviewPage";
import AdminPaySuccessPage from "./page/Admin/AdminPaySuccessPage";
import NotFoundPage from "./page/Admin/NotFoundPage";
import AdminForBookingPage from "./page/Admin/AdminForBookingPage";
import AdminCatchPointPage from "./page/Admin/AdminCatchPointPage";
import AdminKindvehiclePage from "./page/Admin/AdminKindvehiclePage";
import CustomToastContainer from "./Components/ComponentParts/CustomToastContainer";
import Layout from "./page/Client/Layout";
import Home from "./Components/ComponentPages/ClientPages/Home/Home";
import SearchRoute from "./Components/ComponentPages/ClientPages/SearchRoute/SearchRoute";
import SearchTicket from "./Components/ComponentPages/ClientPages/SearchTicket/SearchTicket";
import Login from "./Components/ComponentPages/ClientPages/Login/Login";
import Register from "./Components/ComponentPages/ClientPages/Register/Register";
import BookingTicket from "./Components/ComponentPages/ClientPages/BookingTicket/BookingTicket";
import BookTicket from "./Components/ComponentPages/ClientPages/BookTicket/BookTicket";
import BookTicketReturn from "./Components/ComponentPages/ClientPages/BookTicket/BookTicketReturn";
import InfoUser from "./Components/ComponentPages/ClientPages/InfoUser/InfoUser";
import Paysuccess from "./Components/ComponentPages/ClientPages/Paysuccess/Paysuccess";
import Contact from "./Components/ComponentPages/ClientPages/Contact/Contact";
import AboutUs from "./Components/ComponentPages/ClientPages/AboutUs/AboutUs";
import MyRating from "./Components/ComponentPages/ClientPages/MyRating/MyRating";
import MyBooking from "./Components/ComponentPages/ClientPages/MyBooking/MyBooking";
import ChangePass from "./Components/ComponentPages/ClientPages/ChangePass/ChangePass";
import ConfirmAccount from "./Components/ComponentPages/ClientPages/ConfirmAccount/ConfirmAccount";
import ForgetPass from "./Components/ComponentPages/ClientPages/ForgetPass/ForgetPass";
import ResponseSuccess from "./Components/ComponentPages/ClientPages/ResponsePay/ResponseSuccess";
import ResponseFailed from "./Components/ComponentPages/ClientPages/ResponsePay/ResponseFailed";
import TicketHistory from "./Components/ComponentPages/ClientPages/TicketHistory/TicketHistory";
import ProtectedRoute from "./Components/ComponentParts/ProtectedRoute";

const App = () => {
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

  return (
    <BrowserRouter>
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
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/bookings" element={<AdminBookingPage />} />
          <Route path="/admin/book-ticket" element={<AdminForBookingPage />} />
          <Route path="/admin/find-trips" element={<AdminBookTicketPage />} />
          <Route
            path="/admin/find-trips-return"
            element={<AdminBookTicketReturnPage />}
          />
          <Route
            path="/admin/book-cash-payment"
            element={<AdminPaySuccessPage />}
          />
          <Route
            path="/admin/cities"
            element={userRole === 3 ? <AdminCityPage /> : <NotFoundPage />}
          />
          <Route path="/admin/booking-trip" element={<AdminPayPage />} />
          <Route
            path="/admin/routes"
            element={userRole === 3 ? <AdminRoutePage /> : <NotFoundPage />}
          />
          <Route
            path="/admin/vehicles"
            element={userRole === 3 ? <AdminVehiclePage /> : <NotFoundPage />}
          />
          <Route
            path="/admin/seats"
            element={userRole === 3 ? <AdminSeatPage /> : <NotFoundPage />}
          />
          <Route path="/admin/trips" element={<AdminTripPage />} />
          <Route
            path="/admin/seat-reservation"
            element={<AdminSeatReservationPage />}
          />
          <Route
            path="/admin/users"
            element={userRole === 3 ? <AdminUserPage /> : <NotFoundPage />}
          />
          <Route
            path="/admin/drivers"
            element={userRole === 3 ? <AdminDriverPage /> : <NotFoundPage />}
          />
          <Route path="/admin/contacts" element={<AdminContactPage />} />
          <Route
            path="/admin/logs"
            element={userRole === 3 ? <AdminLogPage /> : <NotFoundPage />}
          />
          <Route path="/admin/promotions" element={<AdminPromotionPage />} />
          <Route path="/admin/reviews" element={<AdminReviewPage />} />
          <Route
            path="/admin/catch-point"
            element={
              userRole === 3 ? <AdminCatchPointPage /> : <NotFoundPage />
            }
          />
          <Route
            path="/admin/kind-vehicle"
            element={
              userRole === 3 ? <AdminKindvehiclePage /> : <NotFoundPage />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
