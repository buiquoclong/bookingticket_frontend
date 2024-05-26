import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminBooking/AdminBooking.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminBooking = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentBooking, setcurrentBooking] = useState();
    
    const [isDetail, setIsDetail] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
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
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Người đặt</div>,
            selector: row => row.userName,
            width: '8rem',
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
            width: '6rem',
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
            width: '10rem',
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
                    <button style={{background:"white", color:"blue", border:"none", cursor:"pointer"}} onClick={() => handleDetailClick(row)}> Chi tiết </button> |
                    <button style={{background:"#3b82f6",paddingInline:".5rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button>
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
        1: 'Đã thanh toán'
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
                return row.kindPay.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (nameUserBook) => {
            setcurrentBooking(nameUserBook);
            setIsEditing(true);
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
        
        const handleUpdateBooking = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentBooking.userName) {
                missingInfo.push("Người đặt");
            }
            if (!currentBooking.email) {
                missingInfo.push("Email");
            }
            if (!currentBooking.phone) {
                missingInfo.push("Số điện thoại");
            }
            if (!currentBooking.isPaid) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newUserData = {
                        userName: currentBooking.userName,
                        email: currentBooking.email,
                        phone: currentBooking.phone,
                        isPaid: currentBooking.isPaid
                    };
            
                    const response = await fetch(`http://localhost:8081/api/booking/${currentBooking.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUserData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("User đã được tạo thành công!");
                        console.log("Booking đã được cập nhật thành công!");
                        toast.success("Booking đã được cập nhật thành công!");
                        const updatedBooking = await response.json();
                        const updatedBookings = records.map(booking => {
                            if (booking.id === updatedBooking.id) {
                                return updatedBooking;
                            }
                            return booking;
                        });
                        setRecords(updatedBookings);
                        setIsEditing(false);
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật user!");
                        toast.error("Có lỗi xảy ra khi cập nhật user!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
    return(
        <div className="main-container">
            {/* <section className="main section"> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                Admin
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/admin"
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
            
            {isEditing && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa hóa đơn</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Người đặt:</label>
                                        <input type="text" value={currentBooking.userName} onChange={(e) => setcurrentBooking({ ...currentBooking, userName: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Email:</label>
                                        <input type="text" value={currentBooking.email} onChange={(e) => setcurrentBooking({ ...currentBooking, email: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Số điện thoại:</label>
                                        <input type="text" value={currentBooking.phone} onChange={(e) => setcurrentBooking({ ...currentBooking, phone: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        {/* <input type="text" value={currentTrip.status} onChange={(e) => setcurrentTrip({ ...currentTrip, status: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentBooking.isPaid} onChange={(e) => setcurrentBooking({ ...currentBooking, isPaid: e.target.value })}
                                        >
                                            {Object.keys(isPaid).map(key => (
                                                <option key={key} value={key}>
                                                    {isPaid[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdateBooking}>Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDetail && (
                <div className="modal" id="deleteModal" onClick={handleOutsideClick}>
                    <div class="modal-dialog" style={{width:"100%"}}>
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Chi tiết vé</h2>
                                {/* <button type="button" className="close" onClick={() => setIsDetail(false)}>
                                    &times;
                                </button> */}
                            </div>
                            {bookingDetails && (
                                <div class="modal-body">
                                            <DataTable
                                        columns={columnDetails}
                                        data={bookingDetails}
                                    />
                                </div>
                            )}
                            
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