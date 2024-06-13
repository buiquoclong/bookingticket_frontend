import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DiscountIcon from '@mui/icons-material/Discount';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ContactsIcon from '@mui/icons-material/Contacts';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
    const [activeTab, setActiveTab] = useState(null);
    const [data, setData] = useState(null);
    const userId = localStorage.getItem("userId");
    const location = useLocation();

    useEffect(() => {
        if (userId) {
            fetchUserInfo();
        }
    }, [userId]);

    useEffect(() => {
        // Cập nhật activeTab dựa trên đường dẫn hiện tại
        const currentPath = location.pathname.split("/")[2] || "dashboard";
        setActiveTab(currentPath);
    }, [location]);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/user/${userId}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BookOnlineIcon className='icon_header' /> BOOKING
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <Link to="/admin" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                        <SpaceDashboardIcon className='icon' /> Thống kê
                    </li>
                </Link>
                <Link to="/admin/book-ticket" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "book-ticket" ? "active" : ""}`} onClick={() => setActiveTab("book-ticket")}>
                        <BookOnlineIcon className='icon' /> Đặt vé
                    </li>
                </Link>
                {data && data.role === 3 && (
                    <>
                        <Link to="/admin/users" style={{ color: "#9e9ea4" }}>
                            <li className={`sidebar-list-item ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
                                <ManageAccountsIcon className='icon' /> Người dùng
                            </li>
                        </Link>
                        <Link to="/admin/cities" style={{ color: "#9e9ea4" }}>
                            <li className={`sidebar-list-item ${activeTab === "cities" ? "active" : ""}`} onClick={() => setActiveTab("cities")}>
                                <LocationCityIcon className='icon' /> Thành phố
                            </li>
                        </Link>
                        <Link to="/admin/vehicles" style={{ color: "#9e9ea4" }}>
                            <li className={`sidebar-list-item ${activeTab === "vehicles" ? "active" : ""}`} onClick={() => setActiveTab("vehicles")}>
                                <DirectionsCarIcon className='icon' /> Phương tiện
                            </li>
                        </Link>
                        <Link to="/admin/seats" style={{ color: "#9e9ea4" }}>
                            <li className={`sidebar-list-item ${activeTab === "seats" ? "active" : ""}`} onClick={() => setActiveTab("seats")}>
                                <EventSeatIcon className='icon' /> Ghế ngồi
                            </li>
                        </Link>
                        <Link to="/admin/routes" style={{ color: "#9e9ea4" }}>
                            <li className={`sidebar-list-item ${activeTab === "routes" ? "active" : ""}`} onClick={() => setActiveTab("routes")}>
                                <ScheduleIcon className='icon' /> Tuyến đi
                            </li>
                        </Link>
                    </>
                )}
                <Link to="/admin/trips" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "trips" ? "active" : ""}`} onClick={() => setActiveTab("trips")}>
                        <DirectionsCarIcon className='icon' /> Chuyến đi
                    </li>
                </Link>
                <Link to="/admin/bookings" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "bookings" ? "active" : ""}`} onClick={() => setActiveTab("bookings")}>
                        <ReceiptIcon className='icon' /> Hóa đơn
                    </li>
                </Link>
                <Link to="/admin/seat-reservation" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "seat-reservation" ? "active" : ""}`} onClick={() => setActiveTab("seat-reservation")}>
                        <EventSeatIcon className='icon' /> Ghế đặt trước
                    </li>
                </Link>
                {data && data.role === 3 && (
                    <Link to="/admin/drivers" style={{ color: "#9e9ea4" }}>
                        <li className={`sidebar-list-item ${activeTab === "drivers" ? "active" : ""}`} onClick={() => setActiveTab("drivers")}>
                            <ManageAccountsIcon className='icon' /> Tài xế
                        </li>
                    </Link>
                )}
                <Link to="/admin/promotions" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "promotions" ? "active" : ""}`} onClick={() => setActiveTab("promotions")}>
                        <DiscountIcon className='icon' /> Khuyến mãi
                    </li>
                </Link>
                <Link to="/admin/reviews" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
                        <ReviewsIcon className='icon' /> Đánh giá
                    </li>
                </Link>
                <Link to="/admin/contacts" style={{ color: "#9e9ea4" }}>
                    <li className={`sidebar-list-item ${activeTab === "contacts" ? "active" : ""}`} onClick={() => setActiveTab("contacts")}>
                        <ContactsIcon className='icon' /> Liên hệ
                    </li>
                </Link>
                {data && data.role === 3 && (
                    <Link to="/admin/logs" style={{ color: "#9e9ea4" }}>
                        <li className={`sidebar-list-item ${activeTab === "logs" ? "active" : ""}`} onClick={() => setActiveTab("logs")}>
                            <WorkHistoryIcon className='icon' /> Log
                        </li>
                    </Link>
                )}
            </ul>
        </aside>
    );
}

export default AdminSidebar;
