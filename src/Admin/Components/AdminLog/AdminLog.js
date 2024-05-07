import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminLog/AdminLog.scss"


const AdminLog = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên người dùng</div>,
            selector: row => row.user.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.user.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nội dung log</div>,
            selector: row => row.message,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.message}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Level</div>,
            selector: row => row.level,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',backgroundColor: levelColorMap[row.level] || 'transparent', padding:".3rem 0rem", borderRadius:"5px", fontWeight:"600", color:"" }}>{LevelMap[row.level] || 'Unknown Status'}</div>
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
                <button style={{background:"#3b82f6",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button> | 
                <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}}> Xóa </button>
                </div>
            )
        }
    ]
        const LevelMap = {
            1: 'INFO',
            2: 'WARNING',
            3: 'DANGER',
        };
        const levelColorMap = {
        1: '#008000b3',  // Đang làm
        2: '#ffa9008a', // Tạm nghỉ
        3: '#ff0000c2'     // Tạm khóa
        };
        useEffect(() => {
            // Call the API to fetch cities
            fetchLogs();
        }, []);
    
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/log");
                const data = await response.json();
                setData(data);
                setRecords(data);
                console.log("log:", data);
            } catch (error) {
                console.error("Error fetching log:", error);
            }
        };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
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
                        <div className="title">Chi tiết hóa đơn</div>
                        <button className="btn back">Tạo chi tiết hóa đơn</button>
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
        )}
            {/* </section> */}
        </div>

        
    )
}
export default AdminLog