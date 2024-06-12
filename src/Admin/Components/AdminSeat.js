import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminSeat/AdminSeat.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminSeat = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentSeat, setcurrentSeat] = useState({ id: null, kindVehicle: {
        id: "",
        name: ""}, image: '' });

    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    const [name, setName] = useState('');
    const [kindVehicle, setKindVehicle] = useState('');
    
    const [status, setStatus] = useState('');
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [seatToDelete, setSeatToDelete] = useState(null);
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
                    <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleRemoveClick(row)}> Xóa </button>
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
        fetchSeats();
    }, [page]);

    const fetchSeats = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/seat/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.seats);
            setRecords(data.seats);
            setTotalPages(data.totalPages)
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
            setcurrentSeat(seatName);
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
        const handleCreateSeat = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!name) {
                missingInfo.push("Tên ghế");
            }
            if (!kindVehicle) {
                missingInfo.push("Loại xe");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newSeatData = {
                        name: name,
                        kindVehicleId: kindVehicle,
                        status: 0,
                    };
            
                    const response = await fetch("http://localhost:8081/api/seat", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
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
        const handleUpdateSeat = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentSeat.name) {
                missingInfo.push("Tên ghế");
            }
            if (!currentSeat.kindVehicle) {
                missingInfo.push("Loại xe");
            }
            if (currentSeat.status === null || currentSeat.status === undefined) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const updateSeatData = {
                        name: currentSeat.name,
                        kindVehicleId: currentSeat.kindVehicle.id,
                        status: currentSeat.status,
                    };
            
                    const response = await fetch(`http://localhost:8081/api/seat/${currentSeat.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updateSeatData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Ghế đã được cập nhật thành công!");
                        toast.success("Ghế đã được cập nhật thành công!");
                        const updatedSeat = await response.json();
                        const updatedSeats = records.map(seat => {
                            if (seat.id === updatedSeat.id) {
                                return updatedSeat;
                            }
                            return seat;
                        });
                        setRecords(updatedSeats);
                        // Reset form hoặc làm gì đó khác
                        setcurrentSeat({
                            id: null, 
                            kindSeat: { id: "", name: "" },
                            name: "",
                            seatNumber: "",
                            value: "",
                            status: ""
                        });
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật ghế!");
                        toast.error("Có lỗi xảy ra khi cập nhật ghế!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        
        const removeSeat = async () => {
            const seatId = seatToDelete.id;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8081/api/seat/${seatId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Thêm token vào header
                }
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updateSeat = records.filter(record => record.id !== seatId);
                    setRecords(updateSeat);
                    toast.success("seat đã được xóa thành công!");
                    setIsDeleteConfirmVisible(false);
                } else {
                    console.error("Có lỗi xảy ra khi xóa seat!");
                    toast.error("Có lỗi xảy ra khi xóa seat!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
        };
        const handleChangePage = (event, value) => {
            setPage(value);
        };
        const handleRemoveClick = (seat) => {
            setSeatToDelete(seat);
            setIsDeleteConfirmVisible(true);
        };
        const NoDataComponent = () => <div className="emptyData">Không có dữ liệu</div>;
    return(
        <div className="main-container">
            {/* <section className="main section"> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                Admin
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/admin"
                >
                Ghế ngồi
                </Link>
            </Breadcrumbs>

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
                    // pagination
                    noDataComponent={<NoDataComponent />}
                    ></DataTable>
                    <Pagination 
                        count={totalPages}
                        boundaryCount={1}
                        siblingCount={1} 
                        color="primary"
                        showFirstButton showLastButton 
                        style={{float:"right", padding:"1rem"}}
                        page={page}
                        onChange={handleChangePage}
                        /> 
                </div>
            </div>
            
            {isEditing && (
                <div className="modal" id="deleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Sửa ghế ngồi</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên ghế:</label>
                                        <input type="text" value={currentSeat.name} onChange={(e) => setcurrentSeat({ ...currentSeat, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        {/* <input type="text" value={currentSeat.kindVehicle} onChange={(e) => setcurrentSeat({ ...currentSeat, kindVehicle: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentSeat.kindVehicle.id} onChange={(e) => setcurrentSeat({ ...currentSeat, kindVehicle: {
                                                ...currentSeat.kindVehicle,
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
                                        {/* <input type="text" value={currentSeat.vehicleNumber} onChange={(e) => setcurrentSeat({ ...currentSeat, vehicleNumber: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentSeat.status} onChange={(e) => setcurrentSeat({ ...currentSeat, status: e.target.value })}
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
                                        <button type="submit" className="save" onClick={handleUpdateSeat}>Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAdd && (
                <div className="modal" id="deleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Thêm ghế ngồi</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên ghế:</label>
                                        <input type="text"  value={name} onChange={handleNameChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        {/* <input type="text" value={currentSeat.kindVehicle} onChange={(e) => setcurrentSeat({ ...currentSeat, kindVehicle: e.target.value })} /> */}
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
            {isDeleteConfirmVisible && (
                <div className="modal" id="confirmDeleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Xác nhận xóa</h2>
                            </div>
                            <div className="modal-body">
                                <p className="textConfirm">Bạn có chắc chắn muốn xóa ghế này?</p>
                                <div className="listButton">
                                    <button type="button"  onClick={() => setIsDeleteConfirmVisible(false)} className="cancel">Hủy</button>
                                    <button type="button" className="save" onClick={removeSeat}>Xóa</button>
                                </div>
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