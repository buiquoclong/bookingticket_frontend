import React, { useState,useEffect } from 'react';
// import { SpaceDashboardIcon } from '@mui/icons-material';
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
import { Link } from 'react-router-dom';

function AdminSidebar({openSidebarToggle, OpenSidebar}) {
    const [activeTab, setActiveTab] = useState(null);
    const [data, setData] = useState(null);
    const userId = localStorage.getItem("userId");

    const handleTabClick = (tabName) => {
        setActiveTab((prevTab) => (prevTab === tabName ? null : tabName));
    };
    useEffect(() => {
        // Call the API to fetch cities
        if (userId) {
            fetchUserInfo();
        }
    }, [userId]);
    
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/user/${userId}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BookOnlineIcon  className='icon_header'/> BOOKING
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <Link to="/admin" style={{color:"#9e9ea4"}}>
                <li className={`sidebar-list-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => handleTabClick("dashboard")}>
                    <SpaceDashboardIcon  className='icon'/> Dashboard
                </li>
            </Link>
            {data && (data.role === 3) && (
                <Link to="/admin/users" style={{color:"#9e9ea4"}}>
                <li className={`sidebar-list-item ${activeTab === "users" ? "active" : ""}`} onClick={() => handleTabClick("users")}>
                    <ManageAccountsIcon  className='icon'/> Người dùng
                    </li>
                </Link>
            )}
            
            <Link to="/admin/cities" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "cities" ? "active" : ""}`} onClick={() => handleTabClick("cities")}>
                <LocationCityIcon  className='icon'/> Thành phố
                </li>
            </Link>
            <Link to="/admin/vehicles" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "vehicles" ? "active" : ""}`} onClick={() => handleTabClick("vehicles")}>
                    <DirectionsCarIcon className='icon'/> Phương tiện
                </li>
            </Link>
            <Link to="/admin/seats" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "seats" ? "active" : ""}`} onClick={() => handleTabClick("seats")}>
                    <EventSeatIcon className='icon'/> Ghế ngồi
                </li>
            </Link>
            <Link to="/admin/routes" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "routes" ? "active" : ""}`} onClick={() => handleTabClick("routes")}>
                    <ScheduleIcon className='icon'/> Tuyến đi
                </li>
            </Link>
            <Link to="/admin/trips" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "trips" ? "active" : ""}`} onClick={() => handleTabClick("trips")}>
                    <DirectionsCarIcon className='icon'/> Chuyến xe
                </li>
            </Link>
            <Link to="/admin/bookings" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "bookings" ? "active" : ""}`} onClick={() => handleTabClick("bookings")}>
                    <ReceiptIcon className='icon'/> Hóa đơn
                </li>
            </Link>
            <Link to="/admin/seat-reservation" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "seat-reservation" ? "active" : ""}`} onClick={() => handleTabClick("seat-reservation")}>
                    <EventSeatIcon className='icon'/> Ghế đặt trước
                </li>
            </Link>
            <Link to="/admin/drivers" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "drivers" ? "active" : ""}`} onClick={() => handleTabClick("drivers")}>
                    <ManageAccountsIcon className='icon'/> Tài xế
                </li>
            </Link>
            <Link to="/admin/promotions" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "promotions" ? "active" : ""}`} onClick={() => handleTabClick("promotions")}>
                    <DiscountIcon className='icon'/> Khuyến mãi
                </li>
            </Link>
            <Link to="/admin/reviews" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "reviews" ? "active" : ""}`} onClick={() => handleTabClick("reviews")}>
                    <ReviewsIcon className='icon'/> Đánh giá
                </li>
            </Link>
            <Link to="/admin/contacts" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "contacts" ? "active" : ""}`} onClick={() => handleTabClick("contacts")}>
                    <ContactsIcon className='icon'/> Liên hệ
                </li>
            </Link>
            <Link to="/admin/logs" style={{color:"#9e9ea4"}}>
            <li className={`sidebar-list-item ${activeTab === "logs" ? "active" : ""}`} onClick={() => handleTabClick("logs")}>
                    <WorkHistoryIcon className='icon'/> Log
                </li>
            </Link>
            
            
            {/* <li className='sidebar-list-item'>
                <Link to=""><BsFillGrid3X3GapFill className='icon'/> Thành phố</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/cities"><BsFillArchiveFill className='icon'/> Phương tiện</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/seats"><BsListCheck className='icon'/> Ghế ngồi</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/routes"><BsMenuButtonWideFill className='icon'/> Tuyến đi</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/trips"><BsMenuButtonWideFill className='icon'/> Chuyến xe</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/bookings"><BsMenuButtonWideFill className='icon'/> Hóa đơn</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/booking-details"><BsMenuButtonWideFill className='icon'/> Chi tiết hóa đơn</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin/seat-reservation"><BsMenuButtonWideFill className='icon'/> Ghế đặt trước</Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin"><BsFillGearFill className='icon'/> Setting</Link>
            </li> */}
        </ul>
    </aside>
    )
}

export default AdminSidebar