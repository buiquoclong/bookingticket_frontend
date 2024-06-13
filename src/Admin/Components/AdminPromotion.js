import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminPromotion/AdminPromotion.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminPromotion = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentPromotion, setcurrentPromotion] = useState();
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [description, setDescription] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [discount, setDiscount] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [promotionToDelete, setPromotionToDelete] = useState(null);
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
    
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: '2-digit', minute: '2-digit' };
    
        const formattedDate = date.toLocaleDateString('vi-VN', optionsDate).replace(/\//g, '/');
        const formattedTime = date.toLocaleTimeString('vi-VN', optionsTime).replace(/:/g, ':');
    
        return `${formattedTime} ${formattedDate}`;
    };
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
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{formatDateTime(row.startDay)}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ngày kết thúc</div>,
            selector: row => row.endDay,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{formatDateTime(row.endDay)}</div>
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
                    <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleRemoveClick(row)}> Xóa </button>
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
    
    //     const [records, setRecords] = useState(data);
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.code.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (promo) => {
            setcurrentPromotion(promo);
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
                    const token = localStorage.getItem("token");
                    const newPromotionData = {
                        description: description,
                        startDay: startDay,
                        endDay: endDay,
                        discount: discount,
                    };
        
            
                    const response = await fetch("http://localhost:8081/api/promotion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
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
        const handleUpdatePromotion = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentPromotion.code) {
                missingInfo.push("Mã giảm giá");
            }
            if (!currentPromotion.description) {
                missingInfo.push("Mô tả");
            }
            if (!currentPromotion.startDay) {
                missingInfo.push("Ngày bắt đầu");
            }
            if (!currentPromotion.endDay) {
                missingInfo.push("Ngày kết thúc");
            }
            if (!currentPromotion.discount) {
                missingInfo.push("Giảm giá");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newPromotionData = {
                        code: currentPromotion.code,
                        description: currentPromotion.description,
                        startDay: currentPromotion.startDay,
                        endDay: currentPromotion.endDay,
                        discount: currentPromotion.discount,
                    };
                    console.log("newPromotionData", newPromotionData);
        
            
                    const response = await fetch(`http://localhost:8081/api/promotion/${currentPromotion.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newPromotionData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Mã giảm giá đã được cập nhật thành công!");
                        toast.success("Mã giảm giá đã được cập nhật thành công!");
                        const updatedPromo = await response.json();
                        const updatedPromos = records.map(promo => {
                            if (promo.id === updatedPromo.id) {
                                return updatedPromo;
                            }
                            return promo;
                        });
                        setRecords(updatedPromos);
                        // Reset form hoặc làm gì đó khác
                        setDescription('');
                        setStartDay('');
                        setEndDay('');
                        setDiscount('');
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật mã!");
                        toast.error("Có lỗi xảy ra khi cập nhật mã!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const removePromotion = async () => {
            const promotionId = promotionToDelete.id;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8081/api/promotion/${promotionId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Thêm token vào header
                }
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updatedPromo = records.filter(record => record.id !== promotionId);
                    setRecords(updatedPromo);
                    toast.success("Promotion đã được xóa thành công!");
                    setIsDeleteConfirmVisible(false);
                } else {
                    console.error("Có lỗi xảy ra khi xóa Promotion!");
                    toast.error("Có lỗi xảy ra khi xóa Promotion!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const handleRemoveClick = (promotion) => {
            setPromotionToDelete(promotion);
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
                href="/admin/promotions"
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
                                <h2 className="modal-title">Sửa Chi mã giảm giá</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Mã giảm giá:</label>
                                        <input type="text" value={currentPromotion.code} onChange={(e) => setcurrentPromotion({ ...currentPromotion, code: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Mô tả:</label>
                                        <input type="text" value={currentPromotion.description} onChange={(e) => setcurrentPromotion({ ...currentPromotion, description: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Ngày bắt đầu:</label>
                                        <input className="inputValue" type="datetime-local" value={currentPromotion.startDay} onChange={(e) => setcurrentPromotion({ ...currentPromotion, startDay: e.target.value })} min={getCurrentDateTimeLocal()}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Ngày kết thúc:</label>
                                        <input className="inputValue" type="datetime-local" value={currentPromotion.endDay} onChange={(e) => setcurrentPromotion({ ...currentPromotion, endDay: e.target.value })} min={startDay ? startDay : undefined}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Mức giảm:</label>
                                        <input className="inputValue" type="number" value={currentPromotion.discount} onChange={(e) => setcurrentPromotion({ ...currentPromotion, discount: e.target.value })} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdatePromotion}>Lưu</button>
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
                                <h2 className="modal-title">Thêm mã giảm giá</h2>
                            </div>
                            <div className="modal-body">
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
                                        <input type="number" className="inputValue" value={discount} onChange={handleDiscountChange} />
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
            {isDeleteConfirmVisible && (
                <div className="modal" id="confirmDeleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Xác nhận xóa</h2>
                            </div>
                            <div className="modal-body">
                                <p className="textConfirm">Bạn có chắc chắn muốn xóa mã giảm giá này?</p>
                                <div className="listButton">
                                    <button type="button"  onClick={() => setIsDeleteConfirmVisible(false)} className="cancel">Hủy</button>
                                    <button type="button" className="save" onClick={removePromotion}>Xóa</button>
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
export default AdminPromotion