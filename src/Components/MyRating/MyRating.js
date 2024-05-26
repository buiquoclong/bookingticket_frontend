import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../MyRating/MyRating.scss"
import { useNavigate  } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyRating = () =>{
    const [isEditing, setIsEditing] = useState(false);
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
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const [selectedReview, setSelectedReview] = useState(null);
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên</div>,
            selector: row => row.user.name,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.user.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Chuyến</div>,
            selector: row => row.trip.route.name,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.route.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên xe</div>,
            selector: row => row.trip.vehicle.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.trip.vehicle.kindVehicle.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.trip.vehicle.vehicleNumber,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.vehicleNumber}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian khởi hành </div>,
            width: '10rem',
            cell: row => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {row.trip.timeStart.slice(0, 5)} - {formatDate(row.trip.dayStart)}
                </div>
            )
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian đánh giá</div>,
            selector: row => row.updatedAt,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{formatDate1(row.updatedAt)}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Đánh giá</div>,
            selector: row => row.rating,
            width: '7rem',
            // cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.rating}</div>
            cell: row => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {[...Array(5)].map((_, index) => (
                        <span 
                            key={index} 
                            style={{ color: index < row.rating ? 'gold' : 'grey', fontSize:"20px" }}
                        >
                            ★
                        </span>
                    ))}
                </div>
            )
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nội dung</div>,
            selector: row => row.content,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.content}</div>
        },
        // ,
        // {
        //     name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tài khoản</div>,
        //     selector: row => row.status,
        //     width: '10rem',
        //     cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',backgroundColor: statusColorMap[row.status] || 'transparent', padding:".3rem 0rem", borderRadius:"5px", fontWeight:"600", color:"" }}>{statusMap[row.status] || 'Unknown Status'}</div>
        // },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <button style={{background:"#3b82f6",paddingInline:".5rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button> | 
                <button style={{background:"#ef4444",paddingInline:".5rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}}> Xóa </button>
                </div>
            )
        }
    ]
    const ratingsDescription = [
        'Tệ',
        'Trung bình',
        'Tốt',
        'Rất tốt',
        'Xuất sắc'
    ];
    useEffect(() => {
        // Call the API to fetch cities
        if (userId) {
            fetchReviews();
        }else{
            sessionStorage.setItem('redirectPath', window.location.pathname);
            navigate('/login');
        }
    }, [userId]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/review/user/${userId}`);
            const data = await response.json();
            setData(data);
            setRecords(data);
            console.log("Review:", data);
        } catch (error) {
            console.error("Error fetching review:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.user.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (review) => {
            setSelectedReview(review);
            setRating(review.rating);
            setContent(review.content);
            setIsEditing(true);
        };
        const handleUpdateRating = async (e) => {
            e.preventDefault();
            const reviewId = selectedReview.id
            let missingInfo = [];
            if (!rating) {
                missingInfo.push("Đánh giá");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newRating = {
                        rating: rating,
                        content: content
                    };
            
                    const response = await fetch(`http://localhost:8081/api/review/${reviewId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newRating)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        toast.success("Bạn đã cập nhật đánh giá thành công");
                       // Cập nhật danh sách đánh giá sau khi cập nhật thành công
                        const updatedReview = await response.json();
                        const updatedReviews = records.map(review => {
                            if (review.id === updatedReview.id) {
                                return updatedReview;
                            }
                            return review;
                        });
                        setRecords(updatedReviews);

                        setRating(0);
                        setContent('');
                        setIsEditing(false);
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
    return(
        <div className="main-container">
            {/* <section className="main section"> */}

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Đánh giá của tôi</div>
                        {/* <button className="btn back">Tạo chi tiết hóa đơn</button> */}
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    pagination
                    ></DataTable>
                </div>
            </div>
            
            {/* {isEditing && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa Chi tiết vé</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Mã vé:</label>
                                        <input type="text" value={currentCity.mave} onChange={(e) => setCurrentCity({ ...currentCity, mave: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Mã hóa đơn:</label>
                                        <input type="text" value={currentCity.mahoadon} onChange={(e) => setCurrentCity({ ...currentCity, mahoadon: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Số lượng vé:</label>
                                        <input type="text" value={currentCity.numTicket} onChange={(e) => setCurrentCity({ ...currentCity, numTicket: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Tổng tiền:</label>
                                        <input type="text" value={currentCity.total} onChange={(e) => setCurrentCity({ ...currentCity, total: e.target.value })} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save">Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            {isEditing && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Đánh giá</h2>
                            </div>
                            <div class="modal-body">
                                <div className="tripLabel">
                                    <div className="tripInfo">
                                        <span>Tuyến đi:</span>
                                        <div className="rightInfo">
                                            <span>{selectedReview.trip.route.name}</span>
                                        </div>
                                    </div>
                                    <div className="tripInfo">
                                        <span>Ngày đi:</span>
                                        <div className="rightInfo">
                                            <span>{formatDate(selectedReview.trip.dayStart)}</span>
                                        </div>
                                    </div>
                                    <div className="tripInfo">
                                        <span>Giờ khởi hành:</span>
                                        <div className="rightInfo">
                                            <span>{selectedReview.trip.timeStart.slice(0, 5)}</span>
                                        </div>
                                    </div>
                                    <div className="tripInfo">
                                        <span>Loại xe/ Biến số:</span>
                                        <div className="rightInfo">
                                            <span>{selectedReview.trip.vehicle.kindVehicle.name}/ {selectedReview.trip.vehicle.vehicleNumber}</span>
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
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdateRating}>Sửa đánh giá</button>
                                    </div>
                                </form>
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
export default MyRating