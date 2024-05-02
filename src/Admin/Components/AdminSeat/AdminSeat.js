import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminSeat/AdminSeat.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminSeat = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState({ id: null, kindVehicle: {
        id: "",
        name: ""}, image: '' });

    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    const [name, setName] = useState('');
    const [kindVehicle, setKindVehicle] = useState('');
    
    const [status, setStatus] = useState('');
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên ghế</div>,
            selector: row => row.name,
            sortable: true,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.kindVehicle.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
            selector: row => row.status,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{statusMap[row.status] || 'Unknown Status'}</div>
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
    
    const statusMap = {
        0: 'Đang hoạt động',
        1: 'Tạm dừng hoạt động'
    };
    const kindVehicleMap = {
        1: 'Giường nằm',
        2: 'Limousine',
        3: 'Ghế ngồi'
    };

    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/seat");
            const data = await response.json();
            setData(data);
            setRecords(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (seatName) => {
            setCurrentCity(seatName);
            setIsEditing(true);
        };
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleNameChange = (event) => {
            setName(event.target.value)
        };
        const handkindVehicleChange = (event) => {
            setKindVehicle(event.target.value)
        };
        const handleStatusChange = (event) => {
            setStatus(event.target.value)
        }
        const handleCreateSeat = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!name) {
                missingInfo.push("Tên ghế");
            }
            if (!kindVehicle) {
                missingInfo.push("Loại xe");
            }
            if (!status) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newSeatData = {
                        name: name,
                        kindVehicleId: kindVehicle,
                        status: status,
                    };
            
                    const response = await fetch("http://localhost:8081/api/seat", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newSeatData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Ghế đã được tạo thành công!");
                        toast.success("Ghế đã được tạo thành công!");
                        const newSeat = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newSeat]);
                        setRecords(prevRecords => [...prevRecords, newSeat]);
                        // Reset form hoặc làm gì đó khác
                        setName('');
                        setKindVehicle('');
                        setStatus('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        // console.error("Có lỗi xảy ra khi tạo ghế!");
                        // toast.error("Có lỗi xảy ra khi tạo ghế!");
                        console.error("Tên ghế đã tồn tại trong loại xe này");
                        toast.error("Tên ghế đã tồn tại trong loại xe này");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
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
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm ghế ngồi</button>
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
                                        <input type="text" value={currentCity.name} onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        {/* <input type="text" value={currentCity.kindVehicle} onChange={(e) => setCurrentCity({ ...currentCity, kindVehicle: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentCity.kindVehicle.id} onChange={(e) => setCurrentCity({ ...currentCity, kindVehicle: {
                                                ...currentCity.kindVehicle,
                                                id: e.target.value
                                            } })}
                                        >
                                            {Object.keys(kindVehicleMap).map(key => (
                                                <option key={key} value={key}>
                                                    {kindVehicleMap[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạn thái:</label>
                                        {/* <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentCity.status} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })}
                                        >
                                            {Object.keys(statusMap).map(key => (
                                                <option key={key} value={key}>
                                                    {statusMap[key]}
                                                </option>
                                            ))}
                                        </select>
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

            {isAdd && (
                <div class="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Thêm ghế ngồi</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên ghế:</label>
                                        <input type="text"  value={name} onChange={handleNameChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        {/* <input type="text" value={currentCity.kindVehicle} onChange={(e) => setCurrentCity({ ...currentCity, kindVehicle: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={kindVehicle} onChange={handkindVehicleChange}
                                        >
                                            <option value="">Chọn loại xe</option>
                                            {Object.keys(kindVehicleMap).map(key => (
                                                <option key={key} value={key}>
                                                    {kindVehicleMap[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạn thái:</label>
                                        {/* <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={status} onChange={handleStatusChange}
                                        >
                                            <option value="">Chọn trạng thái</option>
                                            {Object.keys(statusMap).map(key => (
                                                <option key={key} value={key}>
                                                    {statusMap[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreateSeat}>Tạo</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* </section> */}
            <ToastContainer
                        className="toast-container"
                        toastClassName="toast"
                        bodyClassName="toast-body"
                        progressClassName="toast-progress"
                        theme='colored'
                        transition={Zoom}
                        autoClose={500}
                        hideProgressBar={true}
                        pauseOnHover
                    ></ToastContainer>
        </div>

        
    )
}
export default AdminSeat