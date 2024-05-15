import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminRoute/AdminRoute.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminRoute = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState({ id: null, city: '', image: '' });
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
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.khoangCach}</div>
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
                    <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}}> Xóa </button>
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
            setCurrentCity(routeName);
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
            if (!status) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newRouteData = {
                        name: nameRoute,
                        diemdi: diemDi,
                        diemden: diemDen,
                        khoangCach: khoangCach,
                        timeOfRoute: timeOfRoute,
                        status: status,
                    };
                    console.log("newRouteData", newRouteData);
        
            
                    const response = await fetch("http://localhost:8081/api/route", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
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
                                <h2 class="modal-title">Sửa tuyến xe</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={currentCity.name} onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điểm đi:</label>
                                        {/* <input type="text" value={currentCity.diemdi} onChange={(e) => setCurrentCity({ ...currentCity, diemdi: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentCity.diemDi.id} 
                                            onChange={(e) => setCurrentCity({ ...currentCity, diemDi: {
                                                ...currentCity.diemDi,
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
                                        {/* <input type="text" value={currentCity.diemden} onChange={(e) => setCurrentCity({ ...currentCity, diemden: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={currentCity.diemDen.id} 
                                            onChange={(e) => setCurrentCity({ ...currentCity, diemDen: {
                                                ...currentCity.diemDen,
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
                                        <input type="text" value={currentCity.khoangCach} onChange={(e) => setCurrentCity({ ...currentCity, khoangCach: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Thời gian di chuyển:</label>
                                        <input type="text" value={currentCity.timeOfRoute+ " giờ"} giờ onChange={(e) => setCurrentCity({ ...currentCity, timeOfRoute: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        {/* <input type="text" value={currentCity.status} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })} /> */}
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
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa tuyến xe</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên tuyến:</label>
                                        <input type="text" value={nameRoute}/>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điểm đi:</label>
                                        {/* <input type="text" value={currentCity.diemdi} onChange={(e) => setCurrentCity({ ...currentCity, diemdi: e.target.value })} /> */}
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
                                        {/* <input type="text" value={currentCity.diemden} onChange={(e) => setCurrentCity({ ...currentCity, diemden: e.target.value })} /> */}
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
                                        <input type="text"value={khoangCach} onChange={handleKhoangCachChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Thời gian di chuyển:</label>
                                        <input type="text"value={timeOfRoute} onChange={handleTimeOfRouteChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Trạng thái:</label>
                                        {/* <input type="text" value={currentCity.status} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })} /> */}
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
                                        <button type="submit" className="save" onClick={handleCreateRoute}>Tạo</button>
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
export default AdminRoute