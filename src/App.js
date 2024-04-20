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
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import TicketHistory from "./Components/TicketHistory/TicketHistory";
import SearchTicket from "./Components/SearchTicket/SearchTicket";
import Register from "./Components/Register/Register";
import BookingTicket from "./Components/BookingTicket/BookingTicket";
import BookTicket from "./Components/BookTicket/BookTicket";
import InfoUser from "./Components/InfoUser/InfoUser";
import Paysuccess from "./Components/Paysuccess/Paysuccess";
import News from "./Components/News/News";
import SearchRoute from "./Components/SearchRoute/SearchRoute";




const App = () => {
    const shouldShowHeaderFooter = (path) => {
        return !path.startsWith("/admin");
    };

    const renderRoutes = () => {
        return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/route" element={<SearchRoute />} />
                <Route path="/search_ticket" element={<SearchTicket />} />
                <Route path="/my_ticket" element={<TicketHistory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/booking-ticket" element={<BookingTicket />} />
                <Route path="/book-ticket" element={<BookTicket />} />
                <Route path="/info-user" element={<InfoUser />} />
                <Route path="/pay-success" element={<Paysuccess />} />
                <Route path="/news" element={<News />} />
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
            {shouldShowHeaderFooter(window.location.pathname) && <Navbar />}
            {renderRoutes()}
            {shouldShowHeaderFooter(window.location.pathname) && <Footer />}
        </BrowserRouter>
    );
};

export default App