import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminTrip/AdminTrip.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminTrip = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [kindVehicledata, setKindVehicledata] = useState([]);
    
    const [vehicleOfKind, setVehicleOfKind] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [records, setRecords] = useState([]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [route, setRoute] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [dayStart, setDayStart] = useState('');
    const [price, setPrice] = useState('');
    const [driver, setDriver] = useState('');
    const [status, setStatus] = useState('');
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '4rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên chuyến</div>,
            selector: row => row.route.name,
            sortable: true,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.route.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}> Loại xe</div>,
            selector: row => row.vehicle.kindVehicle.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicle.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}> Tên xe</div>,
            selector: row => row.vehicle.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số</div>,
            selector: row => row.vehicle.vehicleNumber,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.vehicle.vehicleNumber}</div>
        },
        // {
        //     name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giờ khởi hành </div>,
        //     selector: row => row.timeStart,
        //     sortable: true,
        //     width: '5rem',
        //     cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.timeStart.slice(0, 5)}</div>
        // },
        // {
        //     name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày khởi hành </div>,
        //     selector: row => row.dayStart,
        //     sortable: true,
        //     width: '8rem',
        //     cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{formatDate(row.dayStart)}</div>
        // }
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian khởi hành </div>,
            width: '10rem',
            cell: row => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {row.timeStart.slice(0, 5)} - {formatDate(row.dayStart)}
                </div>
            )
        }
        ,
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giá vé</div>,
            selector: row => row.price,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.price}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tài xế</div>,
            selector: row => row.driver.name,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.driver.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
            selector: row => row.status,
            width: '8rem',
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
        1: 'Đã xác nhận',
        2: 'Đã hoàn thành',
        3: 'Đã bị hủy',
    };
    useEffect(() => {
        // Call the API to fetch cities
        fetchTrips();
        fetchKindVehicles();
        fetchDrivers();
        fetchRoutes();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/trip");
            const data = await response.json();
            setData(data);
            setRecords(data);
        } catch (error) {
            console.error("Error fetching trips:", error);
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
    const fetchKindVehicles = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/kindVehicle");
            const data = await response.json();
            setKindVehicledata(data);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };
    const fetchDrivers = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/driver");
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.routeName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (row) => {
            if (row && row.route && row.vehicle && row.driver) {
                setCurrentCity({
                    route: {
                        id: row.route.id,
                        name: row.route.name
                    },
                    kindVehicle: {
                        id: row.vehicle.kindVehicle.id
                    },
                    vehicle: {
                        id: row.vehicle.id,
                        name: row.vehicle.name,
                        vehicleNumber: row.vehicle.vehicleNumber
                    },
                    timeStart: row.timeStart,
                    dayStart: row.dayStart,
                    price: row.price,
                    driver: {
                        id: row.driver.id,
                        name: row.driver.name
                    }
                });
                setIsEditing(true);

                fetchVehiclesByKind(row.vehicle.kindVehicle.id);
            }
        };
        
        const handleKindVehicleChange = (e) => {
            const selectedKindVehicleId = e.target.value;
            setCurrentCity(current => ({
                ...current,
                kindVehicle: {
                    ...current.kindVehicle,
                    id: selectedKindVehicleId
                }
            }));
            fetchVehiclesByKind(selectedKindVehicleId);
        };
        const fetchVehiclesByKind = async (kindVehicleId) => {
            try {
                const response = await fetch(`http://localhost:8081/api/vehicle/kind/${kindVehicleId}`);
                const data = await response.json();
                setVehicleOfKind(data);
            } catch (error) {
                console.error(`Error fetching vehicles for kind vehicle ID ${kindVehicleId}:`, error);
            }
        };
        const handleVehicleChange = (e) => {
            const selectedVehicleId = e.target.value;
            console.log(selectedVehicleId)

            const selectedVehicle = vehicleOfKind.find(vehicle => vehicle.id === selectedVehicleId);
            setCurrentCity(current => ({
                ...current,
                vehicle: {
                    ...current.vehicle,
                    id: selectedVehicleId// Cập nhật biển số
                }
            }));
        };
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleRouteChange = (event) => {
            setRoute(event.target.value)
        };
        const handleVehicle1Change = (event) => {
            setVehicle(event.target.value)
        };
        const handleDayStartChange = (event) => {
            setDayStart(event.target.value)
        };
        const handleTimeStartChange = (event) => {
            setTimeStart(event.target.value)
        };
        const handlePriceChange = (event) => {
            setPrice(event.target.value)
        }
        const handleDriverChange = (event) => {
            setDriver(event.target.value)
        }
        const handleStatusChange = (event) => {
            setStatus(event.target.value)
        };
        const handleCreateTrip = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!route) {
                missingInfo.push("Tuyến");
            }
            if (!vehicle) {
                missingInfo.push("Phương tiện");
            }
            if (!dayStart) {
                missingInfo.push("Ngày khởi hành");
            }
            if (!timeStart) {
                missingInfo.push("Thời gian khởi hành");
            }
            if (!price) {
                missingInfo.push("Giá vé");
            }
            if (!driver) {
                missingInfo.push("Tài xế");
            }
            if (!status) {
                missingInfo.push("Trạng thái");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newTripData = {
                        routeId: route,
                        vehicleId: vehicle,
                        dayStart: dayStart,
                        timeStart: timeStart,
                        price: price,
                        driverId: driver,
                        status: status,
                    };
                    console.log("newTripData", newTripData);
        
            
                    const response = await fetch("http://localhost:8081/api/trip", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newTripData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("User đã được tạo thành công!");
                        toast.success("User đã được tạo thành công!");
                        const newTrip = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newTrip]);
                        setRecords(prevRecords => [...prevRecords, newTrip]);
                        // Reset form hoặc làm gì đó khác
                        setRoute('');
                        setVehicle('');
                        setDayStart('');
                        setTimeStart('');
                        setPrice('');
                        setDriver('');
                        setStatus('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo trip!");
                        toast.error("Có lỗi xảy ra khi tạo trip!");
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
                        <div className="title">Quản lý Chuyến đi</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm chuyến đi</button>
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
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa chuyến đi</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên chuyến:</label>
                                        <input type="text" value={currentCity.route.name} onChange={(e) => setCurrentCity({ ...currentCity, route: {...currentCity.route, name: e.target.value }})} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <select
                                            className="inputValue"
                                            value={currentCity.kindVehicle ? currentCity.kindVehicle.id : ''}
                                            onChange={handleKindVehicleChange}
                                        >
                                            {kindVehicledata.map(kind => (
                                                <option key={kind.id} value={kind.id}>
                                                    {kind.name}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label>Tên xe:</label>
                                        <select  className="inputValue"
                                            value={currentCity.vehicle.id || ''}
                                            // onChange={(e) => setCurrentCity({...currentCity, vehicle: {...currentCity.vehicle, id: e.target.value }})}
                                            onChange={handleVehicleChange}
                                        >
                                                <option value="">Chọn tên xe</option>
                                            {vehicleOfKind.map(vehicle => (
                                                <option key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input className="inputValue" type="time" value={currentCity.timeStart && currentCity.timeStart.slice(0, 5)} onChange={(e) => setCurrentCity({ ...currentCity, timeStart: e.target.value })}/>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input className="inputValue" type="date" value={currentCity.dayStart} onChange={(e) => setCurrentCity({ ...currentCity, dayStart: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Giá vé:</label>
                                        <input type="text" value={currentCity.price.toLocaleString('vi-VN')} onChange={(e) => setCurrentCity({ ...currentCity, price: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Tài xế:</label>
                                        <select 
                                            className="inputValue"
                                            value={currentCity.driver ? currentCity.driver.id : ''} 
                                            onChange={(e) => setCurrentCity(current => ({
                                                ...current,
                                                driver: {
                                                    ...current.driver,
                                                    id: e.target.value
                                                }
                                            }))}
                                        >
                                            {drivers.map(driver => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.name}
                                                </option>
                                            ))}
                                        </select>
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
                                <h2 class="modal-title">Sửa chuyến đi</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Tên chuyến:</label>
                                        {/* <input type="text" value={currentCity.route.name} onChange={(e) => setCurrentCity({ ...currentCity, route: {...currentCity.route, name: e.target.value }})} /> */}
                                        <select 
                                            className="inputValue"
                                            value={route} onChange={handleRouteChange} 
                                        >
                                            <option value="">Chọn điểm đến</option>
                                            {routes.map(route => (
                                                <option key={route.id} value={route.id}>
                                                    {route.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <select
                                            className="inputValue"
                                            value={currentCity.kindVehicle ? currentCity.kindVehicle.id : ''}
                                            onChange={handleKindVehicleChange}
                                        >
                                            {kindVehicledata.map(kind => (
                                                <option key={kind.id} value={kind.id}>
                                                    {kind.name}
                                                </option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label>Tên xe:</label>
                                        <select  className="inputValue"
                                            value={vehicle}
                                            // onChange={(e) => setCurrentCity({...currentCity, vehicle: {...currentCity.vehicle, id: e.target.value }})}
                                            onChange={handleVehicle1Change}
                                        >
                                                <option value="">Chọn tên xe</option>
                                            {vehicleOfKind.map(vehicle => (
                                                <option key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input className="inputValue" type="time" value={timeStart} onChange={handleTimeStartChange}/>
                                        
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input className="inputValue" type="date" value={dayStart} onChange={handleDayStartChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Giá vé:</label>
                                        <input type="text" value={price} onChange={handlePriceChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Tài xế:</label>
                                        <select 
                                            className="inputValue"
                                            value={driver} 
                                            onChange={handleDriverChange}
                                        >
                                            <option value="">Chọn tài xế</option>
                                            {drivers.map(driver => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.name}
                                                </option>
                                            ))}
                                        </select>
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
                                        <button type="submit" className="save" onClick={handleCreateTrip}>Tạo</button>
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
export default AdminTrip