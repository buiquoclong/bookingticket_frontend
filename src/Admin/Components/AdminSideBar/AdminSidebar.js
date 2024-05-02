import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
from 'react-icons/bs'
import { Link } from 'react-router-dom';

function AdminSidebar({openSidebarToggle, OpenSidebar}) {
    return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <Link to="/admin" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </li>
            </Link>
            <Link to="/admin/users" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Người dùng
                </li>
            </Link>
            <Link to="/admin/cities" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Thành phố
                </li>
            </Link>
            <Link to="/admin/vehicles" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Phương tiện
                </li>
            </Link>
            <Link to="/admin/seats" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Ghế ngồi
                </li>
            </Link>
            <Link to="/admin/routes" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Tuyến đi
                </li>
            </Link>
            <Link to="/admin/trips" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Chuyến xe
                </li>
            </Link>
            <Link to="/admin/bookings" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Hóa đơn
                </li>
            </Link>
            <Link to="/admin/seat-reservation" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Ghế đặt trước
                </li>
            </Link>
            <Link to="/admin/drivers" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Tài xế
                </li>
            </Link>
            <Link to="/admin/promotions" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Khuyến mãi
                </li>
            </Link>
            <Link to="/admin/reviews" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Đánh giá
                </li>
            </Link>
            <Link to="/admin/contacts" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Liên hệ
                </li>
            </Link>
            <Link to="/admin/logs" style={{color:"#9e9ea4"}}>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Log
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