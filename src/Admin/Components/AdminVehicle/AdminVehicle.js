import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminVehicle/AdminVehicle.scss"


const AdminVehicle = () =>{
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.kindVehicle,
            sortable: true,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.kindVehicle}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.vehicleNumber,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicleNumber}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Sức chứa</div>,
            selector: row => row.numSeat,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.numSeat}</div>
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
        { id: 1, kindVehicle: 'Giường nằm', vehicleNumber:'BS001', numSeat:21 },
        { id: 2, kindVehicle: 'Limousine', vehicleNumber:'BS002', numSeat:21 },
        { id: 3, kindVehicle: 'Giường nằm', vehicleNumber:'BS003', numSeat:21 },
        { id: 4, kindVehicle: 'Ghế ngồi', vehicleNumber:'BS004', numSeat:21 },
        { id: 5, kindVehicle: 'Limousine', vehicleNumber:'BS005', numSeat:21 },
        { id: 6, kindVehicle: 'Giường nằm', vehicleNumber:'BS006', numSeat:21 },
        { id: 7, kindVehicle: 'Limousine', vehicleNumber:'BS007', numSeat:21 },
        { id: 8, kindVehicle: 'Giường nằm', vehicleNumber:'BS008', numSeat:21 },
        { id: 9, kindVehicle: 'Limousine', vehicleNumber:'BS009', numSeat:21 },
        { id: 10, kindVehicle: 'Giường nằm', vehicleNumber:'BS010', numSeat:21 },
        { id: 11, kindVehicle: 'Limousine', vehicleNumber:'BS011', numSeat:21 },
        { id: 12, kindVehicle: 'Giường nằm', vehicleNumber:'BS012', numSeat:21 },
        { id: 13, kindVehicle: 'Limousine', vehicleNumber:'BS013', numSeat:21 },
        { id: 14, kindVehicle: 'Ghế ngồi', vehicleNumber:'BS014', numSeat:21 },
        { id: 15, kindVehicle: 'Limousine', vehicleNumber:'BS015', numSeat:21 },
        { id: 16, kindVehicle: 'Ghế ngồi', vehicleNumber:'BS016', numSeat:21 },
        { id: 17, kindVehicle: 'Limousine', vehicleNumber:'BS017', numSeat:21 },
        { id: 18, kindVehicle: 'Ghế ngồi', vehicleNumber:'BS018', numSeat:21 },
        { id: 19, kindVehicle: 'Limousine', vehicleNumber:'BS019', numSeat:21 },
        { id: 20, kindVehicle: 'Ghế ngồi', vehicleNumber:'BS020', numSeat:21 }
    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.kindVehicle.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
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
                        <div className="title">Quản lý phương tiện</div>
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
                                <h2 class="modal-title">Sửa Phương tiện</h2>
                                <button className="btn back">Thêm phương tiện</button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <input type="text" value={currentCity.kindVehicle} onChange={(e) => setCurrentCity({ ...currentCity, kindVehicle: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Biển số:</label>
                                        <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Sức chứa:</label>
                                        <input type="text" value={currentCity.numSeat} onChange={(e) => setCurrentCity({ ...currentCity, numSeat: e.target.value })} />
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
export default AdminVehicle