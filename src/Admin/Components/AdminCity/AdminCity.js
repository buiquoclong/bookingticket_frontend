import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "../AdminCity/AdminCity.scss"
import sg from "../../Assets/img/sg.png";
import dn from "../../Assets/img/dn.png";
import dl from "../../Assets/img/dl.png";


const AdminCity = () =>{
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên thành phố</div>,
            selector: row => row.city,
            sortable: true,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.city}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ảnh</div>,
            // selector: row => row.image
            cell: row => <img height="50" alt={row.city} src={row.image} style={{paddingBottom:"1rem", paddingTop:"1rem"}} />
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
        {id:1,city:"Hồ Chí Minh",image:sg},
        {id:2,city:"Đà Nẵng",image:dn},
        {id:3,city:"Đà Lạt",image:dl}
    ]
    
        const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.city.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (city) => {
            setCurrentCity(city);
            setIsEditing(true);
        };
    return(
        <div className="main-container">
            {/* <section className="main section"> */}

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm thành phố" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý thành phố</div>
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
                                <h2 class="modal-title">Sửa Thành Phố</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên Thành Phố:</label>
                                        <input type="text" value={currentCity.city} onChange={(e) => setCurrentCity({ ...currentCity, city: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Hình Ảnh:</label>
                                        <input type="text" value={currentCity.image} onChange={(e) => setCurrentCity({ ...currentCity, image: e.target.value })} />
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
export default AdminCity