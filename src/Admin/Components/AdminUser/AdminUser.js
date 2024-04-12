import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminUser/AdminUser.scss"


const AdminUser = () =>{
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Họ tên</div>,
            selector: row => row.name,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.email,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Điện thoại</div>,
            selector: row => row.phone,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.phone}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Quyền</div>,
            selector: row => row.role,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.role}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tài khoản</div>,
            selector: row => row.status,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.status}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Phương thức</div>,
            selector: row => row.type,
            sortable: true,
            width: '12rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.type}</div>
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
        { id: 1,name:'Nguyễn Văn A', email:'abc1@gmail.com', phone: '123', role:'ADMIN', status:'Chưa kích hoạt', type:'Tài khoản đăng ký'},
        { id: 2,name:'Trần Văn B', email:'abc2@gmail.com', phone: '234', role:'ADMIN', status:'Đã kích hoạt', type:'Tài khoản đăng ký'},
        { id: 3,name:'bang', email:'abc3@gmail.com', phone: '456', role:'USER', status:'Chưa kích hoạt', type:'Tài khoản đăng ký'},
        { id: 4,name:'hang', email:'abc4@gmail.com', phone: '567', role:'USER', status:'Đã kích hoạt', type:'Tài khoản đăng ký'},
        { id: 5,name:'BBB', email:'abc5@gmail.com', phone: '678', role:'USER', status:'Chưa kích hoạt', type:'Google'},
        { id: 6,name:'Nguyễn Văn B', email:'abc6@gmail.com', phone: '789', role:'USER', status:'Đã kích hoạt', type:'Google'},
        { id: 7,name:'Trần Văn A', email:'abc7@gmail.com', phone: '890', role:'USER', status:'Chưa kích hoạt', type:'Google'},
        { id: 8,name:'Hồ A', email:'abc8@gmail.com', phone: '901', role:'USER', status:'Đã kích hoạt', type:'Google'},
        { id: 9,name:'B', email:'abc9@gmail.com', phone: '012', role:'USER', status:'Chưa kích hoạt', type:'Google'},
        { id: 10,name:'C', email:'abc10@gmail.com', phone: '124', role:'USER', status:'Đã kích hoạt', type:'Google'}
        
    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (name) => {
            setCurrentCity(name);
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
                        <div className="title">Quản lý Người dùng</div>
                        <button className="btn back">Thêm người dùng</button>
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
                                <h2 class="modal-title">Sửa Người dùng</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Họ tên:</label>
                                        <input type="text" value={currentCity.name} onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Email:</label>
                                        <input type="text" value={currentCity.email} onChange={(e) => setCurrentCity({ ...currentCity, email: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điện thoại:</label>
                                        <input type="text" value={currentCity.phone} onChange={(e) => setCurrentCity({ ...currentCity, phone: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Quyền:</label>
                                        <input type="text" value={currentCity.role} onChange={(e) => setCurrentCity({ ...currentCity, role: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Tài khoản:</label>
                                        <input type="text" value={currentCity.status} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Phương thức:</label>
                                        <input type="text" value={currentCity.type} onChange={(e) => setCurrentCity({ ...currentCity, type: e.target.value })} />
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
export default AdminUser