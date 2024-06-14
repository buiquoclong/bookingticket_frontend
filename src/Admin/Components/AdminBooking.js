import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminBooking/AdminBooking.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminBooking = () =>{
    
    const [isDetail, setIsDetail] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
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
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Người đặt</div>,
            selector: row => row.userName,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.userName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.email,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Số điện thoại</div>,
            selector: row => row.phone,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.phone}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày đặt</div>,
            selector: row => row.dayBook,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{formatDate1(row.dayBook)}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tổng tiền</div>,
            selector: row => row.total,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.total.toLocaleString('vi-VN')}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Hình thức thanh toán</div>,
            selector: row => row.kindPay,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.kindPay}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Đặt vé</div>,
            selector: row => row.roundTrip,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{roundTrip[row.roundTrip] || 'Unknown roundTrip'}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
            selector: row => row.isPaid,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{isPaid[row.isPaid] || 'Unknown isPaid'}</div>
        },
        {

            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {row.isPaid === 0 && (
                        <>
                            <button style={{background:"white", color:"blue", border:"none", cursor:"pointer"}} onClick={() => handleDetailClick(row)}> Chi tiết </button> |
                            <button style={{background:"#3b82f6",paddingInline:".3rem",paddingTop:".3rem",paddingBottom:".3rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handlePayClick(row)}> Thanh toán</button> |
                            <button style={{background:"#ef4444",paddingInline:".3rem",paddingTop:".3rem",paddingBottom:".3rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleCancelBookingClick(row)}> Hủy </button>
                        </>
                    )}
                    {row.isPaid === 1 && (
                        <>
                        <button style={{background:"white", color:"blue", border:"none", cursor:"pointer"}} onClick={() => handleDetailClick(row)}> Chi tiết </button> |
                        <button style={{ background: "white", color: "red", border: "none", cursor: "pointer" }} onClick={() => handleCancelBookingClick(row)}>Hủy</button>
                        </>
                        
                    )}
                </div>
            )
        }
    ]
    const columnDetails = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Chuyến đi</div>,
            selector: row => row.trip.route.name,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.route.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.trip.vehicle.kindVehicle.name,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.trip.vehicle.vehicleNumber,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.vehicleNumber}</div>
        },{
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian khởi hành </div>,
            width: '10rem',
            cell: row => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {row.trip.timeStart.slice(0, 5)} - {formatDate(row.trip.dayStart)}
                </div>
            )
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Lượt</div>,
            selector: row => row.roundTrip,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{kindTrip[row.roundTrip] || 'Unknown roundTrip'}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Số ghế</div>,
            selector: row => row.quantity,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.quantity}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên ghế</div>,
            selector: row => row.seatName,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.seatName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tổng tiền</div>,
            selector: row => row.price,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.price.toLocaleString('vi-VN')}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nơi đón</div>,
            selector: row => row.pointCatch,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.pointCatch}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghi chú</div>,
            selector: row => row.note,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.note}</div>
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
    const kindTrip = {
        0: 'Lượt đi',
        1: 'Lượt về'
    };
    useEffect(() => {
        // Call the API to fetch cities
        fetchBookings();
    }, [page]);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.bookings);
            setRecords(data.bookings);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handlePayClick = async (booking) => {
            try {
                const token = localStorage.getItem("token");
                const newBookingData = {
                    userName: booking.userName,
                    email: booking.email,
                    phone: booking.phone,
                    isPaid: 1
                };
        
                const response = await fetch(`http://localhost:8081/api/booking/${booking.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(newBookingData)
                });
        
                if (response.ok) {
                    // Xử lý thành công
                    toast.success("Booking đã được cập nhật thành công!");
                    const updatedBooking = await response.json();
                    const updatedBookings = records.map(booking => {
                        if (booking.id === updatedBooking.id) {
                            return updatedBooking;
                        }
                        return booking;
                    });
                    setRecords(updatedBookings);
                } else {
                    console.error("Có lỗi xảy ra khi cập nhật user!");
                    toast.error("Có lỗi xảy ra khi cập nhật user!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error);
            }
        };

        const handleDetailClick = (booking) => {
            const bookingId = booking.id;
            fetch(`http://localhost:8081/api/booking_detail/booking/${bookingId}`)
            .then(response => response.json())
            .then(data => {
                setBookingDetails(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setIsDetail(true);
        };
        const handleOutsideClick = (e) => {
            // Đóng modal khi click vào phần tử có class 'modal'
            if (e.target.classList.contains('modal')) {
                setIsDetail(false);
            }
        }
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const cancelBooking = async () => {
            const bookingId = bookingToCancel.id;

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
            
                        // Cập nhật số ghế trống (emptySeat) của chuyến đi
                        const updatedEmptySeat = tripData.emptySeat + quantity;
            
                        // Cập nhật dữ liệu số ghế trống (emptySeat) trong tripData
                        
                        const token = localStorage.getItem("token");
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
                                "Authorization": `Bearer ${token}`
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
                    const token = localStorage.getItem("token");
                    const updateBooking = {
                        userName: bookingToCancel.userName,
                        email: bookingToCancel.email,
                        phone: bookingToCancel.phone,
                        userId: bookingToCancel.user.id,
                        total: bookingToCancel.total,
                        kindPay: bookingToCancel.kindPay,
                        isPaid: 2,
                        roundTrip: bookingToCancel.roundTrip,
                    };
                    const updateBookingResponse = await fetch(`http://localhost:8081/api/booking/${bookingId}`, {
                        method: 'PUT', // hoặc 'PATCH' tùy vào API của bạn
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updateBooking), // Cập nhật trạng thái của booking thành 'cancelled'
                    });

                    if (updateBookingResponse.ok) {
                        // Booking được cập nhật thành công
                        console.log(`Booking with ID ${bookingId} is cancelled successfully`);
                        toast.success("Bạn đã hủy hóa đơn thành công");
                        setIsCancelConfirmVisible(false);
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
        const handleCancelBookingClick = (booking) => {
            setBookingToCancel(booking);
            setIsCancelConfirmVisible(true);
        };
        
        const NoDataComponent = () => <div className="emptyData">Không có dữ liệu</div>;
    return(
        <div className="main-container">
            {/* <section className="main section"> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/admin">
                Admin
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/admin/bookings"
                >
                Hóa đơn
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý Hóa đơn</div>
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    noDataComponent={<NoDataComponent />}
                    // pagination
                    ></DataTable>
                    <Pagination 
                        count={totalPages}
                        boundaryCount={1}
                        siblingCount={1} 
                        color="primary"
                        showFirstButton showLastButton 
                        style={{float:"right", padding:"1rem"}}
                        page={page}
                        onChange={handleChangePage}
                        /> 
                </div>
            </div>

            {isDetail && (
                <div className="modal" id="deleteModal" onClick={handleOutsideClick}>
                    <div className="modal-dialog" style={{width:"100%"}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Chi tiết vé</h2>
                                {/* <button type="button" className="close" onClick={() => setIsDetail(false)}>
                                    &times;
                                </button> */}
                            </div>
                            {bookingDetails && (
                                <div className="modal-body">
                                            <DataTable
                                        columns={columnDetails}
                                        data={bookingDetails}
                                        noDataComponent={<NoDataComponent />}
                                    />
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            )}
            {isCancelConfirmVisible && (
                <div className="modal" id="confirmDeleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Xác nhận xóa</h2>
                            </div>
                            <div className="modal-body">
                                <p className="textConfirm">Bạn có chắc chắn muốn hủy hóa đơn này?</p>
                                <div className="listButton">
                                    <button type="button"  onClick={() => setIsCancelConfirmVisible(false)} className="cancel">Hủy</button>
                                    <button type="button" className="save" onClick={cancelBooking}>Xác nhận hủy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
export default AdminBooking