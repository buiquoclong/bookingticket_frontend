import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminTrip/AdminTrip.scss"


const AdminTrip = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState({ id: null, city: '', image: '' });
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên tuyến</div>,
            selector: row => row.routeName,
            sortable: true,
            width: '15rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.routeName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}> Loại Xe</div>,
            selector: row => row.kindVehicle,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.kindVehicle}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.vehicleNumber,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicleNumber}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giờ khởi hành </div>,
            selector: row => row.timeStart,
            sortable: true,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.timeStart}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giá vé</div>,
            selector: row => row.priceTicket,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.priceTicket}</div>
        },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <button style={{background:"#3b82f6",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button> | 
                    <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}}> Xóa </button>
                </div>
            )
        }
    ]
    const data = [
        { id: 1,routeName:'Sài Gòn - Đà Lạt', kindVehicle: 'Giường nằm', vehicleNumber:'BS001', timeStart:'08:00', priceTicket:'300.000đ'},
        { id: 2,routeName:'Sài Gòn - Đà Nẵngt', kindVehicle: 'Limousine', vehicleNumber:'BS002', timeStart:'09:00', priceTicket:'300.000đ'},
        { id: 3,routeName:'Đà Lạt - Sài Gòn', kindVehicle: 'Ghế ngồi', vehicleNumber:'BS003', timeStart:'10:00', priceTicket:'300.000đ'},
        { id: 4,routeName:'Đà Lạt - Đà Nẵng', kindVehicle: 'Limousine', vehicleNumber:'BS004', timeStart:'18:00', priceTicket:'300.000đ'},
        { id: 5,routeName:'Đà Nẵng - Đà Lạt', kindVehicle: 'Ghế ngồi', vehicleNumber:'BS005', timeStart:'01:00', priceTicket:'300.000đ'},
        { id: 6,routeName:'Đà Nẵng - Sài Gòn', kindVehicle: 'Limousine', vehicleNumber:'BS006', timeStart:'09:00', priceTicket:'300.000đ'},
        { id: 7,routeName:'Sài Gòn - Đăk Lăk', kindVehicle: 'Ghế ngồi', vehicleNumber:'BS007', timeStart:'07:00', priceTicket:'300.000đ'},
        { id: 8,routeName:'Đăk Lăk - Đà Lạtt', kindVehicle: 'Limousine', vehicleNumber:'BS008', timeStart:'12:00', priceTicket:'300.000đ'},
        { id: 9,routeName:'Đà Nẵng - Đà Lạt', kindVehicle: 'Ghế ngồi', vehicleNumber:'BS009', timeStart:'01:01', priceTicket:'300.000đ'},
        { id: 10,routeName:'Sài Gòn - Đà Lạt', kindVehicle: 'Giường nằm', vehicleNumber:'BS010', timeStart:'02:01', priceTicket:'300.000đ'}

    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.routeName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (routeName) => {
            setCurrentCity(routeName);
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
                        <div className="title">Quản lý Chuyến đi</div>
                        <button className="btn back">Thêm chuyến đi</button>
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
                                <h2 class="modal-title">Sửa chuyến đi</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={currentCity.routeName} onChange={(e) => setCurrentCity({ ...currentCity, routeName: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <input type="text" value={currentCity.kindVehicle} onChange={(e) => setCurrentCity({ ...currentCity, kindVehicle: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Biển số:</label>
                                        <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input type="text" value={currentCity.timeStart} onChange={(e) => setCurrentCity({ ...currentCity, timeStart: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Giá vé:</label>
                                        <input type="text" value={currentCity.priceTicket} onChange={(e) => setCurrentCity({ ...currentCity, priceTicket: e.target.value })} />
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
export default AdminTrip