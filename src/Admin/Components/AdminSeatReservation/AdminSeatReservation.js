import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminSeatReservation/AdminSeatReservation.scss"


const AdminSeatReservation = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.email,
            width: '15rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên xe</div>,
            selector: row => row.nameVehical,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.nameVehical}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghế đặt</div>,
            selector: row => row.seatBook,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.seatBook}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số xe</div>,
            selector: row => row.vehicleNumber,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicleNumber}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giờ khởi hành</div>,
            selector: row => row.timeStart,
            sortable: true,
            width: '12rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.timeStart}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghế còn trống</div>,
            selector: row => row.seatNone,
            width: '12rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.seatNone}</div>
        },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <button style={{background:"#3b82f6",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button>
                </div>
            )
        }
    ]
    const data = [
        { id: 1,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A01', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 2,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A02', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 3,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A03', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 4,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A04', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 5,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A05', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 6,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A06', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 7,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A07', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 8,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A08', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 9,email:'abc@gmail.com', nameVehical: 'Giường nằm', seatBook:'A09', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20},
        { id: 10,email:'abcd@gmail.com', nameVehical: 'Giường nằm', seatBook:'A010', vehicleNumber:'BS001', timeStart:'08:00 15/05/2024', seatNone: 20}
    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (email) => {
            setCurrentCity(email);
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
                        <div className="title">Quản lý Ghế đặt trước</div>
                        <button className="btn back">Thêm ghế đặt trước</button>
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
                                <h2 class="modal-title">Sửa Ghế đặt trước</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Email:</label>
                                        <input type="text" value={currentCity.email} onChange={(e) => setCurrentCity({ ...currentCity, email: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Tên xe:</label>
                                        <input type="text" value={currentCity.nameVehical} onChange={(e) => setCurrentCity({ ...currentCity, nameVehical: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Ghế đặt:</label>
                                        <input type="text" value={currentCity.seatBook} onChange={(e) => setCurrentCity({ ...currentCity, seatBook: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Biển số xe:</label>
                                        <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input type="text" value={currentCity.timeStart} onChange={(e) => setCurrentCity({ ...currentCity, timeStart: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Ghế còn trống:</label>
                                        <input type="text" value={currentCity.seatNone} onChange={(e) => setCurrentCity({ ...currentCity, seatNone: e.target.value })} />
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
export default AdminSeatReservation