import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminSeatReservation/AdminSeatReservation.scss"
import {Pagination, Breadcrumbs, Link} from '@mui/material';
import useDebounce from './useDebounce';



const AdminSeatReservation = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue.trim(), 500);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Chuyến</div>,
            selector: row => row.trip.route.name,
            width: '15rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.route.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên người đặt</div>,
            selector: row => row.booking.userName,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.booking.userName}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.booking.email,
            width: '15rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.booking.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên xe</div>,
            selector: row => row.trip.vehicle.name,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.trip.vehicle.kindVehicle.name,
            width: '8rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.kindVehicle.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ghế đặt</div>,
            selector: row => row.seat.name,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.seat.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Biển số xe</div>,
            selector: row => row.trip.vehicle.vehicleNumber,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.trip.vehicle.vehicleNumber}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian khởi hành </div>,
            width: '10rem',
            cell: row => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {row.trip.timeStart.slice(0, 5)} - {formatDate(row.trip.dayStart)}
                </div>
            )
        }
    ]
    useEffect(() => {
        let mounted = true;
    
        fetchSeatReservations(searchDebounce).then((data) => {
          if (mounted && data) {
            setData(data.seatReservations);
            setRecords(data.seatReservations);
            setTotalPages(data.totalPages);
          }
        });
    
        return () => {
          mounted = false;
        };
    }, [page, searchDebounce]);

    const fetchSeatReservations = async (searchDebounce) => {
        try {
            // const response = await fetch(`http://localhost:8081/api/seat_reservation/page?page=${page}&size=10`);
            const response = await fetch(`http://localhost:8081/api/seat_reservation/page?page=${page}&size=10&name=${searchDebounce}`);
            const data = await response.json();
            return data;
            // setData(data.seatReservations);
            // setRecords(data.seatReservations);
            // setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.booking.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (email) => {
            setCurrentCity(email);
            setIsEditing(true);
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
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
                href="/admin/seat-reservation"
                >
                Ghế đặt trước
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={(e) =>  setSearchValue(e.target.value)} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý Ghế đặt trước</div>
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
                                <h2 class="modal-title">Sửa Ghế đặt trước</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Email:</label>
                                        <input type="text" value={currentCity.email} onChange={(e) => setCurrentCity({ ...currentCity, email: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Tên xe:</label>
                                        <input type="text" value={currentCity.nameVehical} onChange={(e) => setCurrentCity({ ...currentCity, nameVehical: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Ghế đặt:</label>
                                        <input type="text" value={currentCity.seatBook} onChange={(e) => setCurrentCity({ ...currentCity, seatBook: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Biển số xe:</label>
                                        <input type="text" value={currentCity.vehicleNumber} onChange={(e) => setCurrentCity({ ...currentCity, vehicleNumber: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Giờ khởi hành:</label>
                                        <input type="text" value={currentCity.timeStart} onChange={(e) => setCurrentCity({ ...currentCity, timeStart: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Ghế còn trống:</label>
                                        <input type="text" value={currentCity.seatNone} onChange={(e) => setCurrentCity({ ...currentCity, seatNone: e.target.value })} />
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
export default AdminSeatReservation