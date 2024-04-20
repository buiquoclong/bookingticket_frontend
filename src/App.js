import React from "react";
import "./app.css";
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Homepage from "./page/Homepage";










import AdminHomePage from "./Admin/page/AdminHomePage";
import AdminBookingDetailPage from "./Admin/page/AdminBookingDetailPage";
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




const App = () => {

    const renderRoutes = () => {
        return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/route" element={<RoutePage />} />
                <Route path="/search_ticket" element={<SearchTicketPage />} />
                <Route path="/my_ticket" element={<TicketHistoryPage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/booking-ticket" element={<BookingTicketPage/>} />
                <Route path="/book-ticket" element={<BookTicketPage />} />
                <Route path="/info-user" element={<InfoUserPage />} />
                <Route path="/pay-success" element={<PaysuccessPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/admin" element={<AdminHomePage />} />
                <Route path="/admin/booking-details" element={<AdminBookingDetailPage />} />
                <Route path="/admin/bookings" element={<AdminBookingPage />} />
                <Route path="/admin/find-trips" element={<AdminBookTicketPage />} />
                <Route path="/admin/cities" element={<AdminCityPage />} />
                <Route path="/admin/booking-trip" element={<AdminPayPage />} />
                <Route path="/admin/routes" element={<AdminRoutePage />} />
                <Route path="/admin/vehicles" element={<AdminVehiclePage />} />
                <Route path="/admin/seats" element={<AdminSeatPage />} />
                <Route path="/admin/trips" element={<AdminTripPage />} />
                <Route path="/admin/seat-reservation" element={<AdminSeatReservationPage />} />
                <Route path="/admin/users" element={<AdminUserPage />} />
            </Routes>
        );
    };

    return (
        <BrowserRouter>
            {renderRoutes()}
        </BrowserRouter>
    );
};

export default App