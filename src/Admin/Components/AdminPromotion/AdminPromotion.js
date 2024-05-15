import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminPromotion/AdminPromotion.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminPromotion = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [description, setDescription] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [discount, setDiscount] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Mã giảm giá</div>,
            selector: row => row.code,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.code}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Mô tả</div>,
            selector: row => row.description,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.description}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày bắt đầu</div>,
            selector: row => row.startDay,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.startDay}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày kết thúc</div>,
            selector: row => row.endDay,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.endDay}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Mức giảm giá</div>,
            selector: row => row.discount,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.discount} %</div>
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
    useEffect(() => {
        // Call the API to fetch cities
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/promotion/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.promotions);
            setRecords(data.promotions);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    // const data = [
    //     { mave: 'ABC123', mahoadon: 121, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC124', mahoadon: 122, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC125', mahoadon: 123, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC126', mahoadon: 124, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC127', mahoadon: 125, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC128', mahoadon: 126, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC129', mahoadon: 127, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC130', mahoadon: 128, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC131', mahoadon: 129, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC132', mahoadon: 130, numTicket: 2, total:'600.000đ' },
    //     { mave: 'ABC133', mahoadon: 131, numTicket: 2, total:'600.000đ' }
    // ]
    
    //     const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.code.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (kindVehicle) => {
            setCurrentCity(kindVehicle);
            setIsEditing(true);
        };
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleDescriptionChange = (event) => {
            setDescription(event.target.value)
        };
        const handleStartDayChange = (event) => {
            setStartDay(event.target.value)
            if (endDay && endDay < event.target.value) {
                setEndDay('');
            }
        };
        const handleEndDayChange = (event) => {
            setEndDay(event.target.value)
        };
        const handleDiscountChange = (event) => {
            setDiscount(event.target.value)
        };
        function getCurrentDateTimeLocal() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // thêm '0' nếu cần
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        const handleCreatePromotion = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!description) {
                missingInfo.push("Mô tả");
            }
            if (!startDay) {
                missingInfo.push("Ngày bắt đầu");
            }
            if (!endDay) {
                missingInfo.push("Ngày kết thúc");
            }
            if (!discount) {
                missingInfo.push("Giảm giá");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newPromotionData = {
                        description: description,
                        startDay: startDay,
                        endDay: endDay,
                        discount: discount,
                    };
                    console.log("newPromotionData", newPromotionData);
        
            
                    const response = await fetch("http://localhost:8081/api/promotion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newPromotionData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Mã giảm giá đã được tạo thành công!");
                        toast.success("Mã giảm giá đã được tạo thành công!");
                        const newPromo = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newPromo]);
                        setRecords(prevRecords => [...prevRecords, newPromo]);
                        // Reset form hoặc làm gì đó khác
                        setDescription('');
                        setStartDay('');
                        setEndDay('');
                        setDiscount('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo mã!");
                        toast.error("Có lỗi xảy ra khi tạo mã!");
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
                Mã giảm giá
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý mã giảm giá</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Tạo mã giảm giá</button>
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

            {isAdd && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa Chi tiết vé</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Mô tả:</label>
                                        <input type="text" value={description} onChange={handleDescriptionChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">ngày bắt đầu:</label>
                                        <input className="inputValue" type="datetime-local" value={startDay} onChange={handleStartDayChange} min={getCurrentDateTimeLocal()}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Ngày kết thúc:</label>
                                        <input className="inputValue" type="datetime-local" value={endDay} onChange={handleEndDayChange} min={startDay ? startDay : undefined}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Mức giảm:</label>
                                        <input type="text" value={discount} onChange={handleDiscountChange} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreatePromotion}>Tạo</button>
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
export default AdminPromotion