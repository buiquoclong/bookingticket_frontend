import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminReview/AdminReview.scss"


const AdminReview = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Đánh giá</div>,
            selector: row => row.rating,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.rating}</div>
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
    useEffect(() => {
        // Call the API to fetch cities
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/review");
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
        const handleEditClick = (kindVehicle) => {
            setCurrentCity(kindVehicle);
            setIsEditing(true);
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
                        <div className="title">Đánh giá</div>
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
            
            {isEditing && (
                <div class="modal" id="deleteModal">
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
        )}
            {/* </section> */}
        </div>

        
    )
}
export default AdminReview