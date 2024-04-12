import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminRoute/AdminRoute.scss"


const AdminRoute = () =>{
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Điểm đi</div>,
            selector: row => row.diemdi,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.diemdi}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Điểm đến</div>,
            selector: row => row.diemden,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.diemden}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Khoảng cách</div>,
            selector: row => row.khoancach,
            sortable: true,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.khoancach}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian di chuyển</div>,
            selector: row => row.thoigiandi,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.thoigiandi}</div>
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
        { id: 1,routeName:'Sài Gòn - Đà Lạt', diemdi: 'Sài Gòn', diemden:'Đà Lạt', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 2,routeName:'Sài Gòn - Đà Nẵng', diemdi: 'Sài Gòn', diemden:'Đà Nẵng', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 3,routeName:'Đà Lạt - Sài Gòn', diemdi: 'Đà Lạt', diemden:'Sài Gòn', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 4,routeName:'Đà Lạt - Đà Nẵng', diemdi: 'Đà Lạt', diemden:'Đà Lạt', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 5,routeName:'Đà Nẵng - Đà Lạt', diemdi: 'Đà Nẵng', diemden:'Đà Lạt', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 6,routeName:'Đà Nẵng - Sài Gòn', diemdi: 'Đà Nẵng', diemden:'Sài Gòn', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 7,routeName:'Sài Gòn - Đăk Lăk', diemdi: 'Sài Gòn', diemden:'Đăk Lăk', khoancach:'100.0km', thoigiandi:'7 tiếng'},
        { id: 8,routeName:'Đăk Lăk - Đà Lạt', diemdi: 'Đăk Lăk', diemden:'Đà Lạt', khoancach:'100.0km', thoigiandi:'7 tiếng'}

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
                        <div className="title">Quản lý Tuyến xe</div>
                        <button className="btn back">Thêm tuyến xe</button>
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
                                <h2 class="modal-title">Sửa tuyến xe</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={currentCity.routeName} onChange={(e) => setCurrentCity({ ...currentCity, routeName: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điểm đi:</label>
                                        <input type="text" value={currentCity.diemdi} onChange={(e) => setCurrentCity({ ...currentCity, diemdi: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Điểm đến:</label>
                                        <input type="text" value={currentCity.diemden} onChange={(e) => setCurrentCity({ ...currentCity, diemden: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Khoảng cách:</label>
                                        <input type="text" value={currentCity.khoancach} onChange={(e) => setCurrentCity({ ...currentCity, khoancach: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Thời gian di chuyển:</label>
                                        <input type="text" value={currentCity.thoigiandi} onChange={(e) => setCurrentCity({ ...currentCity, thoigiandi: e.target.value })} />
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
export default AdminRoute