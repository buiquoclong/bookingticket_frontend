import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../MyBooking/MyBooking.scss"
import { useNavigate  } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination} from '@mui/material';


const MyBooking = () =>{
    function formatDate1(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        // Đảm bảo rằng các giá trị có hai chữ số
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
    
        return `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${year}`;
    }
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Người đặt</div>,
            selector: row => row.userName,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.userName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.email,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Số điện thoại</div>,
            selector: row => row.phone,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.phone}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày đặt</div>,
            selector: row => row.dayBook,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{formatDate1(row.dayBook)}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tổng tiền</div>,
            selector: row => row.total,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.total.toLocaleString('vi-VN')}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Hình thức thanh toán</div>,
            selector: row => row.kindPay,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.kindPay}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Đặt vé</div>,
            selector: row => row.roundTrip,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{roundTrip[row.roundTrip] || 'Unknown roundTrip'}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
            selector: row => row.isPaid,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{isPaid[row.isPaid] || 'Unknown isPaid'}</div>
        },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {row.isPaid === 0 && (
                        <>
                            <button style={{ background: "white", color: "red", border: "none", cursor: "pointer" }} onClick={() => handleCancelBookingClick(row)}>Hủy</button> |
                            <button style={{ background: "#3b82f6", paddingInline: ".5rem", paddingTop: ".5rem", paddingBottom: ".5rem", borderRadius: ".5rem", color: "white", border: "none", cursor: "pointer" }} onClick={() => handlePayBookingClick(row)}>Thanh toán</button>
                        </>
                    )}
                    {row.isPaid === 1 && (
                        <button style={{ background: "white", color: "red", border: "none", cursor: "pointer" }} onClick={() => handleCancelBookingClick(row)}>Hủy</button>
                    )}
                </div>
            )
        }
    ]
    const roundTrip = {
        0: 'Một chiều',
        1: 'Khứ hồi'
    };
    const isPaid = {
        0: 'Chưa thanh toán',
        1: 'Đã thanh toán', 
        2: "Đã hủy"
    };
    useEffect(() => {
        // Call the API to fetch cities
        if (userId) {
            fetchReviews();
        }else{
            sessionStorage.setItem('redirectPath', window.location.pathname);
            navigate('/login');
        }
    }, [userId, page]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/user/${userId}/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.bookings);
            setRecords(data.bookings);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching detail:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.user.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handlePayBookingClick = async (booking) => {
            const total  = booking.total;
            const bookingId = booking.id;
            try {
                // Gửi yêu cầu để nhận URL thanh toán từ API
                const response = await fetch(`http://localhost:8081/api/payment/pay-boooking?total=${total}&bookingId=${bookingId}`, {
                    method: 'GET', // hoặc 'PATCH' tùy vào API của bạn
                    headers: {
                        'Content-Type': 'application/json',
                    }// Cập nhật trạng thái của booking thành 'cancelled'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch payment URL');
                }
                localStorage.setItem('redirectPath', window.location.pathname);
                const paymentData = await response.text();
                // Lưu dữ liệu vào Local Storage
                
                // Chuyển hướng người dùng đến URL thanh toán
                window.location.href = paymentData;
        
            } catch (error) {
                console.error('Error fetching payment URL:', error);
                toast.error('Lỗi khi nhận URL thanh toán từ máy chủ.');
            }
        }

        const handleCancelBookingClick = async (booking) => {
            const bookingId = booking.id;

            try {
                const response = await fetch(`http://localhost:8081/api/seat_reservation/booking/${bookingId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    toast.error('Failed to delete booking');
                }
                // update emptyseat
                try {
                    // Fetch booking details
                    const bookingDetailResponse = await fetch(`http://localhost:8081/api/booking_detail/booking/${bookingId}`);
                    const bookingDetails = await bookingDetailResponse.json();
                    console.log("Booking details:", bookingDetails);
            
                    // Duyệt qua từng chi tiết booking
                    for (const bookingDetail of bookingDetails) {
                        // Lấy thông tin trip và quantity từ booking detail
                        const tripId = bookingDetail.trip.id;
                        const quantity = bookingDetail.quantity;
            
                        // Fetch thông tin chi tiết của chuyến đi (trip)
                        const tripResponse = await fetch(`http://localhost:8081/api/trip/${tripId}`);
                        const tripData = await tripResponse.json();
                        console.log("Trip data before update:", tripData);
            
                        // Cập nhật số ghế trống (emptySeat) của chuyến đi
                        const updatedEmptySeat = tripData.emptySeat + quantity;
            
                        // Cập nhật dữ liệu số ghế trống (emptySeat) trong tripData
                        const tripUpdate = {
                            routeId: tripData.route.id,
                            vehicleId: tripData.vehicle.id,
                            dayStart: tripData.dayStart, 
                            timeStart: tripData.timeStart,
                            price: tripData.price, 
                            driverId: tripData.driver.id,
                            emptySeat : updatedEmptySeat, 
                            status: tripData.status
                        }
            
                        // Gửi request PUT/PATCH để cập nhật dữ liệu trên server hoặc lưu trữ lại dữ liệu mới
                        const updateTripResponse = await fetch(`http://localhost:8081/api/trip/${tripId}`, {
                            method: 'PUT', // hoặc 'PATCH' tùy vào API của bạn
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(tripUpdate),
                        });
                        if (!updateTripResponse.ok) {
                            toast.error('Failed to update trip');
                        }
                    }
            
                    

                    
                } catch (error) {
                    console.error("Error fetching booking details:", error);
                }
                // update booking
                try {
                    // Sau khi cập nhật thành công, cập nhật lại booking
                    const updateBooking = {
                        userName: booking.userName,
                        email: booking.email,
                        phone: booking.phone,
                        userId: booking.user.id,
                        total: booking.total,
                        kindPay: booking.kindPay,
                        isPaid: 2,
                        roundTrip: booking.roundTrip,
                    };
                    const updateBookingResponse = await fetch(`http://localhost:8081/api/booking/${bookingId}`, {
                        method: 'PUT', // hoặc 'PATCH' tùy vào API của bạn
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateBooking), // Cập nhật trạng thái của booking thành 'cancelled'
                    });

                    if (updateBookingResponse.ok) {
                        // Booking được cập nhật thành công
                        console.log(`Booking with ID ${bookingId} is cancelled successfully`);
                        toast.success("Bạn đã hủy hóa đơn thành công");
                        const updatedBooking= await updateBookingResponse.json();
                        const updatedReviews = records.map(bookingData => {
                            if (bookingData.id === updatedBooking.id) {
                                return updatedBooking;
                            }
                            return bookingData;
                        });
                        setRecords(updatedReviews);
                    } else {
                        // Xử lý lỗi nếu có
                        console.error('Failed to cancel booking:', updateBookingResponse.statusText);
                    }
                } catch (error) {
                    console.error("Error update:", error);
                }
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
            
            
            
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
    return(
        <div className="main-container">
            {/* <section className="main section"> */}

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Hóa đơn của tôi</div>
                        {/* <button className="btn back">Tạo chi tiết hóa đơn</button> */}
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    // pagination
                    ></DataTable>
                </div>
                    <div className="center-pagination">
                        <Pagination 
                            count={totalPages}
                            boundaryCount={1}
                            siblingCount={1} 
                            color="primary"
                            showFirstButton 
                            showLastButton 
                            page={page}
                            onChange={handleChangePage}
                        />
                    </div>
            </div>
            {/* </section> */}
            <ToastContainer
                        className="toast-container"
                        toastClassName="toast"
                        bodyClassName="toast-body"
                        progressClassName="toast-progress"
                        theme='colored'
                        transition={Zoom}
                        autoClose={500}
                        hideProgressBar={true}
                        pauseOnHover
                    ></ToastContainer>
        </div>

        
    )
}
export default MyBooking