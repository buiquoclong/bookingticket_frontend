import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminContact/AdminContact.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminKindVehicle = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentKindVehicle, setcurrentKindVehicle] = useState();
    
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [kindVehicleToDelete, setKindVehicleToDelete] = useState(null);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Loại xe</div>,
            selector: row => row.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
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
        fetchKindVehicle();
    }, [page]);

    const fetchKindVehicle = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/kindVehicle/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.kindVehicles);
            setRecords(data.kindVehicles);
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
        const handleEditClick = (kindVehicle) => {
            setcurrentKindVehicle(kindVehicle);
            setIsEditing(true);
        };
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleNameChange = (event) => {
            setName(event.target.value)
        };
        const handleCreateKindVehicle = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!name) {
                missingInfo.push("Loại xe");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newContactData = {
                        name: name
                    };
            
                    const response = await fetch("http://localhost:8081/api/kindVehicle", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newContactData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        toast.success("Loại xe mới đã được tạo thành công!");
                        const newKindvehicle = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newKindvehicle]);
                        setRecords(prevRecords => [...prevRecords, newKindvehicle]);
                        // Reset form hoặc làm gì đó khác
                        setName('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo loại xe!");
                        toast.error("Có lỗi xảy ra khi tạo loại xe!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        
        const handleUpdateKindVehicle = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentKindVehicle.name) {
                missingInfo.push("Loại xe");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const token = localStorage.getItem("token");
                    const newKindVehicleData = {
                        name: currentKindVehicle.name
                    };
            
                    const response = await fetch(`http://localhost:8081/api/kindVehicle/${currentKindVehicle.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` // Thêm token vào header
                        },
                        body: JSON.stringify(newKindVehicleData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        toast.success("Loại xe đã được cập nhật thành công!");
                        const updatedKindVehicle = await response.json();
                        const updatedKindVehicles = records.map(contact => {
                            if (contact.id === updatedKindVehicle.id) {
                                return updatedKindVehicle;
                            }
                            return contact;
                        });
                        setRecords(updatedKindVehicles);
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật loại xe!");
                        toast.error("Có lỗi xảy ra khi cập nhật loại xe!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const removeKindVehicle = async () => {
            const kindVehicleId = kindVehicleToDelete.id;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8081/api/kindVehicle/${kindVehicleId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Thêm token vào header
                }
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updatedKindVehicle = records.filter(record => record.id !== kindVehicleId);
                    setRecords(updatedKindVehicle);
                    toast.success("Loại xe đã được xóa thành công!");
                    setIsDeleteConfirmVisible(false);
                } else {
                    console.error("Có lỗi xảy ra khi xóa loại xe!");
                    toast.error("Có lỗi xảy ra khi xóa loại xe!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
        };
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        const handleRemoveClick = (kindVehicle) => {
            setKindVehicleToDelete(kindVehicle);
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
                href="/admin/kind-vehicle"
                >
                Loại xe
                </Link>
            </Breadcrumbs>

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Loại xe</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Tạo loại xe</button>
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
                                <h2 className="modal-title">Sửa loại xe</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <input type="text" value={currentKindVehicle.name} onChange={(e) => setcurrentKindVehicle({ ...currentKindVehicle, name: e.target.value })} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdateKindVehicle}>Lưu</button>
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
                                <h2 className="modal-title">Thêm loại xe</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Loại xe:</label>
                                        <input type="text" value={name} onChange={handleNameChange}/>
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreateKindVehicle}>Tạo</button>
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
                                <p className="textConfirm">Bạn có chắc chắn muốn xóa loại xe này?</p>
                                <div className="listButton">
                                    <button type="button"  onClick={() => setIsDeleteConfirmVisible(false)} className="cancel">Hủy</button>
                                    <button type="button" className="save" onClick={removeKindVehicle}>Xóa</button>
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
export default AdminKindVehicle