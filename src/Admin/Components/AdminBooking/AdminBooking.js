import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminBooking/AdminBooking.scss"


const AdminBooking = () =>{
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Chuyến</div>,
            selector: row => row.routeName,
            sortable: true,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.routeName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Người đặt</div>,
            selector: row => row.nameUserBook,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.nameUserBook}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày đặt</div>,
            selector: row => row.dateBook,
            width: '6.5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.dateBook}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giờ đi</div>,
            selector: row => row.timeStart,
            sortable: true,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.timeStart}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
            selector: row => row.status,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.status}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghi chú</div>,
            selector: row => row.note,
            width: '6rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.note}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nơi đón</div>,
            selector: row => row.placeCatch,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.placeCatch}</div>
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
        { id: 1,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 2,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú ", placeCatch:"Tại nhà xe"},
        { id: 3,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 4,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 5,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 6,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 7,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 8,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 9,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"},
        { id: 10,routeName:'Sài Gòn - Đà Lạt', nameUserBook: 'a@gmail.com', dateBook:'25/05/2024', timeStart:'08:00', status:'Đã thanh toán', note:"Không có ghi chú", placeCatch:"Tại nhà xe"}

    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.nameUserBook.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (nameUserBook) => {
            setCurrentCity(nameUserBook);
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
                        <div className="title">Quản lý Hóa đơn</div>
                        <button className="btn back">Tạo hóa đơn</button>
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
                                <h2 class="modal-title">Sửa hóa đơn</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={currentCity.routeName} onChange={(e) => setCurrentCity({ ...currentCity, routeName: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Người đặt:</label>
                                        <input type="text" value={currentCity.nameUserBook} onChange={(e) => setCurrentCity({ ...currentCity, nameUserBook: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Ngày đặt:</label>
                                        <input type="text" value={currentCity.dateBook} onChange={(e) => setCurrentCity({ ...currentCity, dateBook: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input type="text" value={currentCity.timeStart} onChange={(e) => setCurrentCity({ ...currentCity, timeStart: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        <input type="text" value={currentCity.status} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Ghi chú:</label>
                                        <input type="text" value={currentCity.note} onChange={(e) => setCurrentCity({ ...currentCity, note: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Nơi đón:</label>
                                        <input type="text" value={currentCity.placeCatch} onChange={(e) => setCurrentCity({ ...currentCity, placeCatch: e.target.value })} />
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
export default AdminBooking