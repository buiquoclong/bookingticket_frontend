import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminBookingDetail/AdminBookingDetail.scss"


const AdminBookingDetail = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState({ id: null, city: '', image: '' });
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Mã vé</div>,
            selector: row => row.mave,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.mave}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Mã hóa đơn</div>,
            selector: row => row.mahoadon,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.mahoadon}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Số lượng vé</div>,
            selector: row => row.numTicket,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.numTicket}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tổng tiền</div>,
            selector: row => row.total,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.total}</div>
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
        { mave: 'ABC123', mahoadon: 121, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC124', mahoadon: 122, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC125', mahoadon: 123, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC126', mahoadon: 124, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC127', mahoadon: 125, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC128', mahoadon: 126, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC129', mahoadon: 127, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC130', mahoadon: 128, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC131', mahoadon: 129, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC132', mahoadon: 130, numTicket: 2, total:'600.000đ' },
        { mave: 'ABC133', mahoadon: 131, numTicket: 2, total:'600.000đ' }
    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.mave.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
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
export default AdminBookingDetail