import React, { useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Homepage from "./page/Client/Homepage";

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
import TicketHistoryPage from "./page/Client/TicketHistoryPage";
import SearchTicketPage from "./page/Client/SearchTicketPage";
import RegisterPage from "./page/Client/RegisterPage";
import InfoUserPage from "./page/Client/InfoUserPage";
import PaysuccessPage from "./page/Client/PaysuccessPage";
import NewsPage from "./page/Client/NewsPage";
import RoutePage from "./page/Client/RoutePage";
import LoginPage from "./page/Client/LoginPage";
import BookingTicketPage from "./page/Client/BookingTicketPage";
import BookTicketPage from "./page/Client/BookTicketPage";
import BookTicketReturnPage from "./page/Client/BookTicketReturnPage";
import AdminPaySuccessPage from "./page/Admin/AdminPaySuccessPage";
import MyRatingPage from "./page/Client/MyRatingPage";
import MyBookingPage from "./page/Client/MyBookingPage";
import ChangePassPage from "./page/Client/ChangePassPage";
import ConfirmAccountPage from "./page/Client/ConfirmAccountPage";
import ForgetPassPage from "./page/Client/ForgetPassPage";
import ResponseSuccessPage from "./page/Client/ResponseSuccessPage";
import ResponseFailedPage from "./page/Client/ResponseFailedPage";
import NotFoundPage from "./page/Admin/NotFoundPage";
import ContactPage from "./page/Client/ContactPage";
import AboutUsPage from "./page/Client/AboutUsPage";
import AdminForBookingPage from "./page/Admin/AdminForBookingPage";
import AdminCatchPointPage from "./page/Admin/AdminCatchPointPage";
import AdminKindvehiclePage from "./page/Admin/AdminKindvehiclePage";
import CustomToastContainer from "./Components/ComponentParts/CustomToastContainer";

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
  const renderRoutes = () => {
    if (userRole === 2 || userRole === 3) {
      return (
        <>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/bookings" element={<AdminBookingPage />} />
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
        </>
      );
    } else {
      return <Route path="*" element={<NotFoundPage />} />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/search_ticket" element={<SearchTicketPage />} />
        <Route path="/my_ticket" element={<TicketHistoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking-ticket" element={<BookingTicketPage />} />
        <Route path="/book-ticket" element={<BookTicketPage />} />
        <Route path="/book-ticketreturn" element={<BookTicketReturnPage />} />
        <Route path="/info-user" element={<InfoUserPage />} />
        <Route path="/pay-success" element={<PaysuccessPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/my-rating" element={<MyRatingPage />} />
        <Route path="/my-booking" element={<MyBookingPage />} />
        <Route path="/change_pass" element={<ChangePassPage />} />
        <Route path="/confirm-account" element={<ConfirmAccountPage />} />
        <Route path="/forget-pass" element={<ForgetPassPage />} />
        <Route path="/payment-success" element={<ResponseSuccessPage />} />
        <Route path="/payment-failed" element={<ResponseFailedPage />} />
        {/* {userRole !== null && renderRoutes()} */}

        <Route
          element={
            userRole === 2 || userRole === 3 ? <Outlet /> : <LoginPage />
          }
        >
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
      <CustomToastContainer />
    </BrowserRouter>
  );
};

export default App;
