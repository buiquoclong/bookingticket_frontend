import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminLog/AdminLog.scss"
import {Pagination, Breadcrumbs, Link} from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import useDebounce from './useDebounce';


const AdminLog = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchCriteria, setSearchCriteria] = useState('userName');
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue.trim(), 500);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Người thực hiện</div>,
            selector: row => row.user.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.user.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nội dung log</div>,
            selector: row => row.message,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign:"center" }}>{row.message}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Level</div>,
            selector: row => row.level,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',backgroundColor: levelColorMap[row.level] || 'transparent', padding:".3rem 0rem", borderRadius:"5px", fontWeight:"600", color:"" }}>{LevelMap[row.level] || 'Unknown Status'}</div>
        }
    ]
        const LevelMap = {
            1: 'INFO',
            2: 'WARNING',
            3: 'DANGER',
        };
        const levelColorMap = {
        1: '#008000b3',  // Đang làm
        2: '#ffa9008a', // Tạm nghỉ
        3: '#ff0000c2'     // Tạm khóa
        };
        useEffect(() => {
            let mounted = true;
    
            fetchLogs(searchDebounce).then((data) => {
          if (mounted && data) {
            setData(data.logs);
            setRecords(data.logs);
            setTotalPages(data.totalPages);
          }
        });
    
        return () => {
          mounted = false;
        };
        }, [page, searchCriteria, searchDebounce]);
    
        const fetchLogs = async (searchDebounce) => {
            try {
                // const response = await fetch(`http://localhost:8081/api/log/page?page=${page}&size=10`);
                const response = await fetch(`http://localhost:8081/api/log/page?page=${page}&${searchCriteria}=${searchDebounce}`);
                const data = await response.json();
                return data;
                // setData(data.logs);
                // setRecords(data.logs);
                // setTotalPages(data.totalPages)
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.user.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (kindVehicle) => {
            setCurrentCity(kindVehicle);
            setIsEditing(true);
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const NoDataComponent = () => <div className="emptyData">Không có dữ liệu</div>;
        const handleCriteriaChange = (event) => {
            setSearchCriteria(event.target.value);
        };
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
                href="/admin/logs"
                >
                Logs
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    {/* <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/> */}
                    <input
                    type="text"
                    onChange={(e) =>  setSearchValue(e.target.value)}
                    placeholder={`Tìm kiếm `}
                    value={searchValue}
                    className="findTuyen" style={{marginRight:"1rem"}}
                />
                <FormControl sx={{ minWidth: 150 }} variant="outlined" className="searchCriteria" size="small">
                    <InputLabel id="search-criteria-label">Tìm kiếm bằng</InputLabel>
                    <Select
                        labelId="search-criteria-label"
                        id="search-criteria"
                        value={searchCriteria}
                        onChange={handleCriteriaChange}
                        label="Tiềm kiếm bằng"
                    >
                        <MenuItem value="userName">Tên</MenuItem>
                        <MenuItem value="level">Level</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý Nhật ký</div>
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
                                <h2 class="modal-title">Sửa Chi tiết vé</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Mã vé:</label>
                                        <input type="text" value={currentCity.mave} onChange={(e) => setCurrentCity({ ...currentCity, mave: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Mã hóa đơn:</label>
                                        <input type="text" value={currentCity.mahoadon} onChange={(e) => setCurrentCity({ ...currentCity, mahoadon: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Số lượng vé:</label>
                                        <input type="text" value={currentCity.numTicket} onChange={(e) => setCurrentCity({ ...currentCity, numTicket: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Tổng tiền:</label>
                                        <input type="text" value={currentCity.total} onChange={(e) => setCurrentCity({ ...currentCity, total: e.target.value })} />
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
export default AdminLog