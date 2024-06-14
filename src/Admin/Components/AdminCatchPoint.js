import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminTrip/AdminTrip.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminCatchPoint = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentPoint, setCurrentPoint] = useState({
        id: null,
        route: { id: "", name: "" },
        name: "",
        address: ""
    });
    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [route, setRoute] = useState('');
    const [namePoint, setNamePoint] = useState('');
    const [address, setAddress] = useState('');
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [pointToDelete, setPointToDelete] = useState(null);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên chuyến</div>,
            selector: row => row.route.name,
            sortable: true,
            // width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.route.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên điểm đón</div>,
            selector: row => row.vehicle.kindVehicle.name,
            // width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Địa chỉ</div>,
            selector: row => row.vehicle.name,
            // width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.address}</div>
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
    
    useEffect(() => {
        // Call the API to fetch cities
        fetchCatchPoint();
        fetchRoutes();
    }, [page]);

    const fetchCatchPoint = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/catch-point/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.catchPoints);
            setRecords(data.catchPoints);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    const fetchRoutes = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/route");
            const data = await response.json();
            setRoutes(data);
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (row) => {
            if (row && row.route) {
                setCurrentPoint({
                    id: row.id,
                    route: {
                        id: row.route.id,
                        name: row.route.name
                    },
                    name: row.name,
                    address: row.address
                });
                setIsEditing(true);
            }
        };
        
        const handleRoute1Change = (e) => {
            const selectedRouteId = e.target.value;
            setCurrentPoint(current => ({
                ...current,
                route: {
                    ...current.route,
                    id: selectedRouteId
                }
            }));
        };
        const handleRouteChange = (event) => {
            setRoute(event.target.value)
        };
        
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleNamePointChange = (event) => {
            setNamePoint(event.target.value)
        };
        const handleAddressChange = (event) => {
            setAddress(event.target.value)
        };
        
        const handleCreateCatchPoint = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!route) {
                missingInfo.push("Tuyến");
            }
            if (!namePoint) {
                missingInfo.push("Tên điểm đón");
            }
            if (!address) {
                missingInfo.push("Địa chỉ");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newPointData = {
                        routeId: route,
                        name: namePoint,
                        address: address
                    };
        
            
                    const response = await fetch("http://localhost:8081/api/catch-point", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newPointData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        toast.success("Điểm đón đã được tạo thành công!");
                        const newPoint = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newPoint]);
                        setRecords(prevRecords => [...prevRecords, newPoint]);
                        // Reset form hoặc làm gì đó khác
                        setRoute('');
                        setNamePoint('');
                        setAddress('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo điểm đón!");
                        toast.error("Có lỗi xảy ra khi tạo điểm đón!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const handleUpdateCatchPoint = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentPoint.route) {
                missingInfo.push("Tuyến");
            }
            if (!currentPoint.name) {
                missingInfo.push("Tên điểm đón");
            }
            if (!currentPoint.address) {
                missingInfo.push("Địa chỉ");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newPointData = {
                        routeId: currentPoint.route.id,
                        name: currentPoint.name,
                        address: currentPoint.address,
                    };
        
            
                    const response = await fetch(`http://localhost:8081/api/catch-point/${currentPoint.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newPointData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        toast.success("điểm đón đã được cập nhật thành công!");
                        const updatedTrip = await response.json();
                        const updatedTrips = records.map(trip => {
                            if (trip.id === updatedTrip.id) {
                                return updatedTrip;
                            }
                            return trip;
                        });
                        setRecords(updatedTrips);
                        // Reset form hoặc làm gì đó khác
                        setCurrentPoint({
                            id: null,
                            route: { id: "", name: "" },
                            name: "",
                            address: ""
                        });
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật điểm đón!");
                        toast.error("Có lỗi xảy ra khi cập nhật điểm đón!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const removeCatchPoint = async () => {
            const pointId = pointToDelete.id;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8081/api/catch-point/${pointId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Thêm token vào header
                }
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updatePoint = records.filter(record => record.id !== pointId);
                    setRecords(updatePoint);
                    toast.success("điểm đón đã được xóa thành công!");
                    setIsDeleteConfirmVisible(false);
                } else {
                    console.error("Có lỗi xảy ra khi xóa trip!");
                    toast.error("Có lỗi xảy ra khi xóa trip!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const handleRemoveClick = (point) => {
            setPointToDelete(point);
            setIsDeleteConfirmVisible(true);
        };
        const NoDataComponent = () => <div className="emptyData">Không có dữ liệu</div>;
    return(
        <div className="main-container">
            {/* <section className="main section"> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/admin">
                Admin
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/admin/catch-point"
                >
                Điểm đón tuyến
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý Điểm đón</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm điểm đón</button>
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
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa điểm đón</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên tuyến:</label>
                                        <select
                                            className="inputValue"
                                            value={currentPoint.route ? currentPoint.route.id : ''}
                                            onChange={handleRoute1Change}
                                        >
                                            {routes.map(route => (
                                                <option key={route.id} value={route.id}>
                                                    {route.name}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Tên điểm đón:</label>
                                        <input type="text" value={currentPoint.name} onChange={(e) => setCurrentPoint({ ...currentPoint,   name: e.target.value })}/>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Địa chỉ:</label>
                                        <input type="text" value={currentPoint.address} onChange={(e) => setCurrentPoint({ ...currentPoint,   address: e.target.value })}/>
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdateCatchPoint}>Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAdd && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Thêm điểm đón</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        {/* <input type="text" value={currentTrip.route.name} onChange={(e) => setcurrentTrip({ ...currentTrip, route: {...currentTrip.route, name: e.target.value }})} /> */}
                                        <select 
                                            className="inputValue"
                                            value={route} onChange={handleRouteChange} 
                                        >
                                            <option value="">Chọn tuyến</option>
                                            {routes.map(route => (
                                                <option key={route.id} value={route.id}>
                                                    {route.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Tên điểm đón:</label>
                                        <input type="text" value={namePoint} onChange={handleNamePointChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Địa chỉ:</label>
                                        <input type="text" value={address} onChange={handleAddressChange}/>
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreateCatchPoint}>Tạo</button>
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
                                <p className="textConfirm">Bạn có chắc chắn muốn xóa điểm đón này?</p>
                                <div className="listButton">
                                    <button type="button"  onClick={() => setIsDeleteConfirmVisible(false)} className="cancel">Hủy</button>
                                    <button type="button" className="save" onClick={removeCatchPoint}>Xóa</button>
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
export default AdminCatchPoint