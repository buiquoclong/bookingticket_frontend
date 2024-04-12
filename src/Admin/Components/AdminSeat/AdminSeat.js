import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminSeat/AdminSeat.scss"


const AdminSeat = () =>{
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên ghế</div>,
            selector: row => row.seatName,
            sortable: true,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.seatName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.kindVehicle,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.kindVehicle}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.vehicleNumber,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicleNumber}</div>
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
        { id: 1, seatName:'A01', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 2, seatName:'A02', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 3, seatName:'A03', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 4, seatName:'A04', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 5, seatName:'A05', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 6, seatName:'A06', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 7, seatName:'A07', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 8, seatName:'A08', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 9, seatName:'A09', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 10, seatName:'A10', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 11, seatName:'A11', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 12, seatName:'A12', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 13, seatName:'A13', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 14, seatName:'A14', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 15, seatName:'A15', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 16, seatName:'A16', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 17, seatName:'A17', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 18, seatName:'A18', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 19, seatName:'A19', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 20, seatName:'A20', kindVehicle: 'Limousine', vehicleNumber:'BS001' },
        { id: 21, seatName:'A21', kindVehicle: 'Limousine', vehicleNumber:'BS001' }
    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.seatName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (seatName) => {
            setCurrentCity(seatName);
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
                        <div className="title">Quản lý ghế ngồi</div>
                        <button className="btn back">Thêm ghế ngồi</button>
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
                                <h2 class="modal-title">Sửa ghế ngồi</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên ghế:</label>
                                        <input type="text" value={currentCity.seatName} onChange={(e) => setCurrentCity({ ...currentCity, seatName: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <input type="text" value={currentCity.kindVehicle} onChange={(e) => setCurrentCity({ ...currentCity, kindVehicle: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Biển số:</label>
                                        <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} />
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
export default AdminSeat