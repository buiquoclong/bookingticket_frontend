import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminRoute/AdminRoute.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminRoute = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentRoute, setcurrentRoute] = useState({ id: null, city: '', image: '' });
    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [cities, setCities] = useState([]);

    const [diemDiName, setDiemDiName] = useState('');
    const [diemDenName, setDiemDenName] = useState('');
    const [diemDi, setDiemDi] = useState('');
    const [diemDen, setDiemDen] = useState('');
    const [khoangCach, setKhoangCach] = useState('');
    const [timeOfRoute, setTimeOfRoute] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [routeToDelete, setRouteToDelete] = useState(null);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên tuyến</div>,
            selector: row => row.name,
            width: '12rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Điểm đi</div>,
            selector: row => row.diemDi.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.diemDi.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Điểm đến</div>,
            selector: row => row.diemDen.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.diemDen.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Khoảng cách</div>,
            selector: row => row.khoangCach,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.khoangCach} km</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian di chuyển</div>,
            selector: row => row.timeOfRoute,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.timeOfRoute} giờ</div>
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
    useEffect(() => {
        // Call the API to fetch cities
        fetchRoutes();
        fetchCities();
    }, [page]);

    const fetchRoutes = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/route/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.routes);
            setRecords(data.routes);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/city");
            const data = await response.json();
            setCities(data);
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
        const handleEditClick = (routeName) => {
            setcurrentRoute(routeName);
            setIsEditing(true);
        };
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleDiemDiChange = (e) => {
            const selectedCity = cities.find(city => city.id === parseInt(e.target.value));
            setDiemDi(selectedCity.id);
            setDiemDiName(selectedCity.name);
        };
        const handleDiemDenChange = (e) => {
            const selectedCity = cities.find(city => city.id === parseInt(e.target.value));
            setDiemDen(selectedCity.id);
            setDiemDenName(selectedCity.name);
        };
        const handleKhoangCachChange = (event) => {
            setKhoangCach(event.target.value)
        };
        const handleTimeOfRouteChange = (event) => {
            setTimeOfRoute(event.target.value)
        };
        const handleStatusChange = (event) => {
            setStatus(event.target.value)
        };
        const nameRoute = `${diemDiName} - ${diemDenName}`;
        const handleCreateRoute = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!diemDi) {
                missingInfo.push("Điểm đi");
            }
            if (!diemDen) {
                missingInfo.push("Điểm đến");
            }
            if (!khoangCach) {
                missingInfo.push("Khoảng cách");
            }
            if (!timeOfRoute) {
                missingInfo.push("Thời gian di chuyển");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newRouteData = {
                        name: nameRoute,
                        diemdi: diemDi,
                        diemden: diemDen,
                        khoangCach: khoangCach,
                        timeOfRoute: timeOfRoute,
                        status: 0,
                    };
        
            
                    const response = await fetch("http://localhost:8081/api/route", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newRouteData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("User đã được tạo thành công!");
                        toast.success("User đã được tạo thành công!");
                        const newRoute = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newRoute]);
                        setRecords(prevRecords => [...prevRecords, newRoute]);
                        // Reset form hoặc làm gì đó khác
                        setDiemDi('');
                        setDiemDen('');
                        setKhoangCach('');
                        setTimeOfRoute('');
                        setStatus('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo route!");
                        toast.error("Có lỗi xảy ra khi tạo route!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const handleUpdateRoute = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentRoute.diemDi) {
                missingInfo.push("Điểm đi");
            }
            if (!currentRoute.diemDen) {
                missingInfo.push("Điểm đến");
            }
            if (!currentRoute.khoangCach) {
                missingInfo.push("Khoảng cách");
            }
            if (!currentRoute.timeOfRoute) {
                missingInfo.push("Thời gian di chuyển");
            }
            if (!currentRoute.status === null || currentRoute.status === undefined) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newRouteData = {
                        name: currentRoute.name,
                        diemdi: currentRoute.diemDi.id,
                        diemden: currentRoute.diemDen.id,
                        khoangCach: currentRoute.khoangCach,
                        timeOfRoute: currentRoute.timeOfRoute,
                        status: currentRoute.status,
                    };
        
            
                    const response = await fetch(`http://localhost:8081/api/route/${currentRoute.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newRouteData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("route đã được tạo thành công!");
                        toast.success("route đã được tạo thành công!");
                        const updatedRoute = await response.json();
                        const updatedRoutes = records.map(route => {
                            if (route.id === updatedRoute.id) {
                                return updatedRoute;
                            }
                            return route;
                        });
                        
                        setRecords(updatedRoutes);
                        // Reset form hoặc làm gì đó khác
                        setDiemDi('');
                        setDiemDen('');
                        setKhoangCach('');
                        setTimeOfRoute('');
                        setStatus('');
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo route!");
                        toast.error("Có lỗi xảy ra khi tạo route!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const removeRoute = async (route) => {
            const routeId = routeToDelete.id;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8081/api/route/${routeId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Thêm token vào header
                }
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updatedRoute = records.filter(record => record.id !== routeId);
                    setRecords(updatedRoute);
                    toast.success("route đã được xóa thành công!");
                    setIsDeleteConfirmVisible(false);
                } else {
                    console.error("Có lỗi xảy ra khi xóa route!");
                    toast.error("Có lỗi xảy ra khi xóa route!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        
        const handleRemoveClick = (route) => {
            setRouteToDelete(route);
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
                Tuyến
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý Tuyến xe</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm tuyến xe</button>
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
                                <h2 className="modal-title">Sửa tuyến xe</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={currentRoute.name} onChange={(e) => setcurrentRoute({ ...currentRoute, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điểm đi:</label>
                                        {/* <input type="text" value={currentRoute.diemdi} onChange={(e) => setcurrentRoute({ ...currentRoute, diemdi: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentRoute.diemDi.id} 
                                            onChange={(e) => setcurrentRoute({ ...currentRoute, diemDi: {
                                                ...currentRoute.diemDi,
                                                id: e.target.value
                                            } })}
                                        >
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label>Điểm đến:</label>
                                        {/* <input type="text" value={currentRoute.diemden} onChange={(e) => setcurrentRoute({ ...currentRoute, diemden: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentRoute.diemDen.id} 
                                            onChange={(e) => setcurrentRoute({ ...currentRoute, diemDen: {
                                                ...currentRoute.diemDen,
                                                id: e.target.value
                                            } })}
                                        >
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Khoảng cách:</label>
                                        <input type="number" className="inputValue" value={currentRoute.khoangCach.toString()} onChange={(e) => setcurrentRoute({ ...currentRoute, khoangCach: parseInt(e.target.value) || '' })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Thời gian di chuyển:</label>
                                        <input type="number" className="inputValue" value={currentRoute.timeOfRoute.toString()} onChange={(e) => setcurrentRoute({ ...currentRoute, timeOfRoute: parseInt(e.target.value) || '' })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        {/* <input type="text" value={currentRoute.status} onChange={(e) => setcurrentRoute({ ...currentRoute, status: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentRoute.status} onChange={(e) => setcurrentRoute({ ...currentRoute, status: e.target.value })}
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
                                        <button type="submit" className="save" onClick={handleUpdateRoute}>Lưu</button>
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
                                <h2 className="modal-title">Sửa tuyến xe</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={nameRoute} readOnly />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điểm đi:</label>
                                        {/* <input type="text" value={currentRoute.diemdi} onChange={(e) => setcurrentRoute({ ...currentRoute, diemdi: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={diemDi} onChange={handleDiemDiChange} 
                                        >
                                            <option value="">Chọn điểm đi</option>
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label>Điểm đến:</label>
                                        {/* <input type="text" value={currentRoute.diemden} onChange={(e) => setcurrentRoute({ ...currentRoute, diemden: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={diemDen} onChange={handleDiemDenChange} 
                                        >
                                            <option value="">Chọn điểm đến</option>
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Khoảng cách:</label>
                                        <input type="number" className="inputValue" value={khoangCach} onChange={handleKhoangCachChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Thời gian di chuyển:</label>
                                        <input type="number" className="inputValue" value={timeOfRoute} onChange={handleTimeOfRouteChange} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreateRoute}>Tạo</button>
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
                                <p className="textConfirm">Bạn có chắc chắn muốn xóa tuyến này?</p>
                                <div className="listButton">
                                    <button type="button"  onClick={() => setIsDeleteConfirmVisible(false)} className="cancel">Hủy</button>
                                    <button type="button" className="save" onClick={removeRoute}>Xóa</button>
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
export default AdminRoute