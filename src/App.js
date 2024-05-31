import React, { useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Homepage from "./page/Homepage";

import AdminHomePage from "./Admin/page/AdminHomePage";
// import AdminBookingDetailPage from "./Admin/page/AdminBookingDetailPage";
import AdminBookingPage from "./Admin/page/AdminBookingPage";
import AdminBookTicketPage from "./Admin/page/AdminBookTicketPage";
import AdminCityPage from "./Admin/page/AdminCityPage";
import AdminPayPage from "./Admin/page/AdminPayPage";
import AdminVehiclePage from "./Admin/page/AdminVehiclePage";
import AdminSeatPage from "./Admin/page/AdminSeatPage";
import AdminRoutePage from "./Admin/page/AdminRoutePage";
import AdminTripPage from "./Admin/page/AdminTripPage";
import AdminSeatReservationPage from "./Admin/page/AdminSeatReservationPage";
import AdminUserPage from "./Admin/page/AdminUserPage";
import AdminBookTicketReturnPage from "./Admin/page/AdminBookTicketReturnPage";
import AdminDriverPage from "./Admin/page/AdminDriverPage";
import AdminContactPage from "./Admin/page/AdminContactPage";
import AdminLogPage from "./Admin/page/AdminLogPage";
import AdminPromotionPage from "./Admin/page/AdminPromotionPage";
import AdminReviewPage from "./Admin/page/AdminReviewPage";
import TicketHistoryPage from "./page/TicketHistoryPage";
import SearchTicketPage from "./page/SearchTicketPage";
import RegisterPage from "./page/RegisterPage";
import InfoUserPage from "./page/InfoUserPage";
import PaysuccessPage from "./page/PaysuccessPage";
import NewsPage from "./page/NewsPage";
import RoutePage from "./page/RoutePage";
import LoginPage from "./page/LoginPage";
import BookingTicketPage from "./page/BookingTicketPage";
import BookTicketPage from "./page/BookTicketPage";
import BookTicketReturnPage from "./page/BookTicketReturnPage";
import AdminPaySuccessPage from "./Admin/page/AdminPaySuccessPage";
import MyRatingPage from "./page/MyRatingPage";
import MyBookingPage from "./page/MyBookingPage";
import ChangePassPage from "./page/ChangePassPage";
import ConfirmAccountPage from "./page/ConfirmAccountPage";
import ForgetPassPage from "./page/ForgetPassPage";
import ResponseSuccessPage from "./page/ResponseSuccessPage";
import ResponseFailedPage from "./page/ResponseFailedPage";
import NotFoundPage from "./Admin/page/NotFoundPage";




const App = () => {
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUserRole(decodedToken.role);
                    
                console.log("Set UserRole:", decodedToken.role);
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
                    <Route path="/admin/find-trips-return" element={<AdminBookTicketReturnPage />} />
                    <Route path="/admin/book-cash-payment" element={<AdminPaySuccessPage />} />
                    <Route path="/admin/cities" element={<AdminCityPage />} />
                    <Route path="/admin/booking-trip" element={<AdminPayPage />} />
                    <Route path="/admin/routes" element={<AdminRoutePage />} />
                    <Route path="/admin/vehicles" element={<AdminVehiclePage />} />
                    <Route path="/admin/seats" element={<AdminSeatPage />} />
                    <Route path="/admin/trips" element={<AdminTripPage />} />
                    <Route path="/admin/seat-reservation" element={<AdminSeatReservationPage />} />
                    <Route path="/admin/users" element={userRole === 3 ? <AdminUserPage /> : <NotFoundPage />} />
                    <Route path="/admin/drivers" element={<AdminDriverPage />} />
                    <Route path="/admin/contacts" element={<AdminContactPage />} />
                    <Route path="/admin/logs" element={<AdminLogPage />} />
                    <Route path="/admin/promotions" element={<AdminPromotionPage />} />
                    <Route path="/admin/reviews" element={<AdminReviewPage />} />
                </>
            );
        } else {
            return (
                <Route path="*" element={<NotFoundPage />} />
            );
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/route" element={<RoutePage />} />
                <Route path="/search_ticket" element={<SearchTicketPage />} />
                <Route path="/my_ticket" element={<TicketHistoryPage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/booking-ticket" element={<BookingTicketPage/>} />
                <Route path="/book-ticket" element={<BookTicketPage />} />
                <Route path="/book-ticketreturn" element={<BookTicketReturnPage />} />
                <Route path="/info-user" element={<InfoUserPage />} />
                <Route path="/pay-success" element={<PaysuccessPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/my-rating" element={<MyRatingPage />} />
                <Route path="/my-booking" element={<MyBookingPage />} />
                <Route path="/change_pass" element={<ChangePassPage />} />
                <Route path="/confirm-account" element={<ConfirmAccountPage />} />
                <Route path="/forget-pass" element={<ForgetPassPage />} />
                <Route path="/payment-success" element={<ResponseSuccessPage />} />
                <Route path="/payment-failed" element={<ResponseFailedPage />} />
                {renderRoutes()}
                {/* <Route path="/admin" element={<AdminHomePage />} />
                <Route path="/admin/bookings" element={<AdminBookingPage />} />
                <Route path="/admin/find-trips" element={<AdminBookTicketPage />} />
                <Route path="/admin/find-trips-return" element={<AdminBookTicketReturnPage />} />
                <Route path="/admin/book-cash-payment" element={<AdminPaySuccessPage />} />
                <Route path="/admin/cities" element={<AdminCityPage />} />
                <Route path="/admin/booking-trip" element={<AdminPayPage />} />
                <Route path="/admin/routes" element={<AdminRoutePage />} />
                <Route path="/admin/vehicles" element={<AdminVehiclePage />} />
                <Route path="/admin/seats" element={<AdminSeatPage />} />
                <Route path="/admin/trips" element={<AdminTripPage />} />
                <Route path="/admin/seat-reservation" element={<AdminSeatReservationPage />} />
                <Route path="/admin/users" element={userRole === 3 ? <AdminUserPage /> : <NotFoundPage />} />
                <Route path="/admin/drivers" element={<AdminDriverPage />} />
                <Route path="/admin/contacts" element={<AdminContactPage />} />
                <Route path="/admin/logs" element={<AdminLogPage />} />
                <Route path="/admin/promotions" element={<AdminPromotionPage />} />
                <Route path="/admin/reviews" element={<AdminReviewPage />} /> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App