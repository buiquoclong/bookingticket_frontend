import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminVehicle/AdminVehicle.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';
import { type } from "@testing-library/user-event/dist/type";


const AdminVehicle = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentVehicle, setcurrentVehicle] = useState({
    });

    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    const [name, setName] = useState('');
    const [kindVehicle, setKindVehicle] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên xe</div>,
            selector: row => row.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.kindVehicle.name,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.vehicleNumber,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicleNumber}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Sức chứa</div>,
            selector: row => row.value,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.value}</div>
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
        fetchVehicles();
    }, [page]);

    const fetchVehicles = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/vehicle/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.vehicles);
            setRecords(data.vehicles);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    
        // const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.kindVehicle.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (kindVehicle) => {
            setcurrentVehicle(kindVehicle);
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
        const handlevehicleNumberChange = (event) => {
            setVehicleNumber(event.target.value)
        };
        const handleValueChange = (event) => {
            setValue(event.target.value)
        };
        const handleStatusChange = (event) => {
            setStatus(event.target.value)
        }
        const handleCreateVehicle = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!name) {
                missingInfo.push("Tên xe");
            }
            if (!kindVehicle) {
                missingInfo.push("Loại xe");
            }
            if (!vehicleNumber) {
                missingInfo.push("Biển số");
            }
            if (!value) {
                missingInfo.push("Sức chứa");
            }
            if (!status) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newVehicleData = {
                        name: name,
                        kindVehicleId: kindVehicle,
                        vehicleNumber: vehicleNumber,
                        value: value,
                        status: status,
                    };
            
                    const response = await fetch("http://localhost:8081/api/vehicle", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newVehicleData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("User đã được tạo thành công!");
                        toast.success("User đã được tạo thành công!");
                        const newVehicle = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newVehicle]);
                        setRecords(prevRecords => [...prevRecords, newVehicle]);
                        // Reset form hoặc làm gì đó khác
                        setName('');
                        setKindVehicle('');
                        setVehicleNumber('');
                        setValue('');
                        setStatus('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo vehicle!");
                        toast.error("Có lỗi xảy ra khi tạo vehicle!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const handleUpdateVehicle = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentVehicle.name) {
                missingInfo.push("Tên xe");
            }
            if (!currentVehicle.kindVehicle) {
                missingInfo.push("Loại xe");
            }
            if (!currentVehicle.vehicleNumber) {
                missingInfo.push("Biển số");
            }
            if (!currentVehicle.value) {
                missingInfo.push("Sức chứa");
            }
            if (currentVehicle.status === null || currentVehicle.status === undefined) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const updateVehicleData = {
                        name: currentVehicle.name,
                        kindVehicleId: currentVehicle.kindVehicle.id,
                        vehicleNumber: currentVehicle.vehicleNumber,
                        value: currentVehicle.value,
                        status: currentVehicle.status,
                    };
            
                    const response = await fetch(`http://localhost:8081/api/vehicle/${currentVehicle.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updateVehicleData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Vehicle đã được cập nhật thành công!");
                        toast.success("Vehicle đã được cập nhật thành công!");
                        const updatedVehicle = await response.json();
                        const updatedVehicles = records.map(vehicle => {
                            if (vehicle.id === updatedVehicle.id) {
                                return updatedVehicle;
                            }
                            return vehicle;
                        });
                        setRecords(updatedVehicles);
                        // Reset form hoặc làm gì đó khác
                        setName('');
                        setKindVehicle('');
                        setVehicleNumber('');
                        setValue('');
                        setStatus('');
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật vehicle!");
                        toast.error("Có lỗi xảy ra khi cập nhật vehicle!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const handleRemoveClick = async (vehicle) => {
            const vehicleId = vehicle.id;
            try {
                const response = await fetch(`http://localhost:8081/api/vehicle/${vehicleId}`, {
                method: "DELETE"
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updateVehicle = records.filter(record => record.id !== vehicleId);
                    setRecords(updateVehicle);
                    toast.success("vehicle đã được xóa thành công!");
                } else {
                    console.error("Có lỗi xảy ra khi xóa vehicle!");
                    toast.error("Có lỗi xảy ra khi xóa vehicle!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
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
                Phương tiện
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý phương tiện</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm phương tiện</button>
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    // pagination
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
                                <h2 className="modal-title">Sửa Phương tiện</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên xe:</label>
                                        <input type="text" value={currentVehicle.name} onChange={(e) => setcurrentVehicle({ ...currentVehicle, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        {/* <input type="text" value={currentVehicle.kindVehicle.name} onChange={(e) => setcurrentVehicle({ ...currentVehicle, kindVehicle: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentVehicle.kindVehicle.id} onChange={(e) => setcurrentVehicle({ ...currentVehicle, kindVehicle: {
                                                ...currentVehicle.kindVehicle,
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
                                        <label>Biển số:</label>
                                        <input type="text" value={currentVehicle.vehicleNumber} onChange={(e) => setcurrentVehicle({ ...currentVehicle, vehicleNumber: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Sức chứa:</label>
                                        <input type="text" value={currentVehicle.value} onChange={(e) => setcurrentVehicle({ ...currentVehicle, value: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        {/* <input type="text" value={currentVehicle.status} onChange={(e) => setcurrentVehicle({ ...currentVehicle, status: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentVehicle.status} onChange={(e) => setcurrentVehicle({ ...currentVehicle, status: e.target.value })}
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
                                        <button type="submit" className="save" onClick={handleUpdateVehicle}>Lưu</button>
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
                                <h2 className="modal-title">Thêm Phương tiện</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên xe:</label>
                                        <input type="text" value={name} onChange={handleNameChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        {/* <input type="text" value={currentVehicle.kindVehicle.name} onChange={(e) => setcurrentVehicle({ ...currentVehicle, kindVehicle: e.target.value })} /> */}
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
                                        <label>Biển số:</label>
                                        <input type="text" value={vehicleNumber} onChange={handlevehicleNumberChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Sức chứa:</label>
                                        <input type="text" value={value} onChange={handleValueChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        {/* <input type="text" value={currentVehicle.status} onChange={(e) => setcurrentVehicle({ ...currentVehicle, status: e.target.value })} /> */}
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
                                        <button type="submit" className="save" onClick={handleCreateVehicle}>Tạo</button>
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
export default AdminVehicle