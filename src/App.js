import React from "react";
import "./app.css";
import { BrowserRouter,Routes, Route, Switch } from 'react-router-dom';
import Homepage from "./page/Homepage";
import Routepage from "./page/RoutePage";
import SearchTicketPage from "./page/SearchTicketPage";
import TicketHistoryPage from "./page/TicketHistoryPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import BookingTicketlPage from "./page/BookingTicketPage";
import BookTicketPage from "./page/BookTicketPage";
import PayPage from "./page/PayPage";
import InfoUserPage from "./page/InfoUserPage";
import NewsPage from "./page/NewsPage";

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


const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/route" element={<Routepage />} />
                <Route path="/search_ticket" element={<SearchTicketPage />} />
                <Route path="/my_ticket" element={<TicketHistoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/booking-ticket" element={<BookingTicketlPage />} />
                <Route path="/book-ticket" element={<BookTicketPage />} />
                <Route path="/info-user" element={<InfoUserPage />} />
                <Route path="/pay" element={<PayPage />} />
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
        </BrowserRouter>
    );
}
export default App