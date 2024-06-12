import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "./TicketHistory.scss";
import { useNavigate  } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination} from '@mui/material';

const TicketHistory = () =>{
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [isRating, setIsRating] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Mã vé</div>,
            selector: row => row.id,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Chuyến đi</div>,
            selector: row => row.trip.route.name,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.trip.route.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.trip.vehicle.kindVehicle.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center"}}>{row.trip.vehicle.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.trip.vehicle.vehicleNumber,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.trip.vehicle.vehicleNumber}</div>
        },{
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian khởi hành </div>,
            width: '10rem',
            cell: row => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign:"center" }}>
                    {row.trip.timeStart.slice(0, 5)} - {formatDate(row.trip.dayStart)}
                </div>
            )
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Lượt</div>,
            selector: row => row.roundTrip,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{kindTrip[row.roundTrip] || 'Unknown roundTrip'}</div>
        },
        // {
        //     name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Số ghế</div>,
        //     selector: row => row.quantity,
        //     width: '5.5rem',
        //     cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.quantity}</div>
        // },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghế đã chọn</div>,
            selector: row => row.seatName,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.seatName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tổng tiền</div>,
            selector: row => row.price,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.price.toLocaleString('vi-VN')}đ</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nơi đón</div>,
            selector: row => row.pointCatch,
            width: '15rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.pointCatch}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghi chú</div>,
            selector: row => row.note,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.note}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
            selector: row => row.trip.status,
            width: '8rem',
            cell: row => {
                if (row.booking.isPaid === 2) {
                    return (
                        <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center", color: 'red' }}>
                            Đã hủy
                        </div>
                    );
                } else {
                    const status = statusMap[row.trip.status] || '';
                    const statusColor = statusColorMap[row.trip.status] || 'transparent';
                    return (
                        <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center", color: statusColor }}>
                            {status}
                            {row.trip.status === 2 && (
                                // <button onClick={() => handleRating(row)}>Đánh giá</button>
                                <button style={{background:"#3b82f6",paddingInline:"1rem",paddingTop:".2rem",paddingBottom:".2rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleRating(row)}>Đánh giá</button>
                            )}
                        </div>
                    );
                }   
            }
        }
    ]
    const kindTrip = {
        0: 'Lượt đi',
        1: 'Lượt về'
    };
    
    const statusMap = {
        1: 'Đã xác nhận',
        2: 'Đã hoàn thành'
    };
    const statusColorMap = {
        1: '#efcf7f',
        2: 'green'
    };

    useEffect(() => {
        // Call the API to fetch cities
        if (userId) {
            fetchBookingDetails();
        }else{
            sessionStorage.setItem('redirectPath', window.location.pathname);
            navigate('/login');
        }
    },[userId, page]);

    const fetchBookingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking_detail/user/${userId}/booking_details/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.bookingDetails);
            setRecords(data.bookingDetails);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching detail:", error);
        }
    };

    function handleFilter(event){
        const newData = data.filter(row => {
            return row.id.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
        })
        setRecords(newData)
    }
    
    const handleRating = (row) => {
        setSelectedTrip(row.trip);
        setIsRating(true);
    };
    const ratingsDescription = [
        'Tệ',
        'Trung bình',
        'Tốt',
        'Rất tốt',
        'Xuất sắc'
    ];
    const handleCreateRating = async (e) => {
        e.preventDefault();
        let missingInfo = [];
        if (!rating) {
            missingInfo.push("Đánh giá");
        }
        if (missingInfo.length > 0) {
            const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
            toast.error(message);
        } else {
            try {
                const token = localStorage.getItem("token");
                const newRating = {
                    tripId: selectedTrip.id,
                    userId: userId, 
                    rating: rating,
                    content: content
                };
        
                const response = await fetch("http://localhost:8081/api/review", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(newRating)
                });
        
                if (response.ok) {
                    // Xử lý thành công
                    toast.success("Bạn đã đánh giá thành công");
                    // const newUser = await response.json();
                    // setData(prevData => [...prevData, newUser]);
                    // setRecords(prevRecords => [...prevRecords, newUser]);
                    // Reset form hoặc làm gì đó khác
                    setRating(0);
                    setContent('');
                    setIsRating(false);
                    // window.location.reload();
                } else {
                    toast.error("Có lỗi xảy ra khi tạo đánh giá!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error);
            }
        }
    };
    const handleCancelRating = async (e) => {
        e.preventDefault();
        setRating(0);
        setContent('');
        setIsRating(false);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return(
        <div className="hisInfoTicket">
            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm chuyến" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Danh sách vé đã đặt</div>
                        <button className="btn back">Trở lại</button>
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
            {isRating && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Đánh giá</h2>
                            </div>
                            <div class="modal-body">
                                <div className="infoBookingTicket">
                                    <div className="lineInfo">
                                        <span>Tuyến:</span>
                                        <div className="rightInfo">
                                            <span>{selectedTrip.route.name}</span>
                                        </div>
                                    </div>
                                    <div className="lineInfo">
                                        <span>Loại xe:</span>
                                        <div className="rightInfo">
                                            <span>{selectedTrip.vehicle.kindVehicle.name}</span>
                                        </div>
                                    </div>
                                    <div className="lineInfo">
                                        <span>Ngày:</span>
                                        <div className="rightInfo">
                                            <span>{formatDate(selectedTrip.dayStart)}</span>
                                        </div>
                                    </div>
                                    <div className="lineInfo">
                                        <span>Thời gian:</span>
                                        <div className="rightInfo">
                                            <span>{selectedTrip.timeStart.slice(0, 5)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="devide"></div>
                                <h3 class="modal-title">Chi tiết Đánh giá</h3>
                                <form>
                                    <div className="ratingStars">
                                        <StarRatings
                                        rating={rating}
                                        starRatedColor="#ffe600"
                                        changeRating={(newRating) => setRating(newRating)}
                                        numberOfStars={5}
                                        name='rating'
                                        starHoverColor="#ffe600"
                                        starDimension="35px"
                                        />
                                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <p style={{ color: rating >= 4 ? '#ffe600' : 'inherit' }}>
                                                {rating > 0 ? ratingsDescription[rating - 1] : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <textarea
                                        className="contentTextarea"
                                        style={{ width: '100%', height: '150px' }}
                                        placeholder="Nhập nội dung đánh giá"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    <div className="listButton">
                                        <button type="button"  onClick={handleCancelRating} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreateRating}>Đánh giá</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
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
export default TicketHistory