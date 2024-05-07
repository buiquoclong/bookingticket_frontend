import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminUser/AdminUser.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminUser = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    
    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    
    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '3rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Họ tên</div>,
            selector: row => row.name,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.email,
            width: '14rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Điện thoại</div>,
            selector: row => row.phone,
            width: '9rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.phone}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Quyền</div>,
            selector: row => row.role,
            width: '7rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{roleMap[row.role] || 'Unknown Role'}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tài khoản</div>,
            selector: row => row.status,
            width: '10rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',backgroundColor: statusColorMap[row.status] || 'transparent', padding:".3rem 0rem", borderRadius:"5px", fontWeight:"600", color:"" }}>{statusMap[row.status] || 'Unknown Status'}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Phương thức</div>,
            selector: row => row.type,
            sortable: true,
            width: '12rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.type}</div>
        },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <button style={{background:"#3b82f6",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button>
                </div>
            )
        }
    ]
    const roleMap = {
        1: 'Admin',
        2: 'Employee',
        3: 'User',
    };
    const statusMap = {
        1: 'Chưa kích hoạt',
        2: 'Đã kích hoạt',
        3: 'Tạm khóa',
    };
    const statusColorMap = {
        1: '#ffa9008a', // Chưa kích hoạt
        2: '#008000b3',  // Đã kích hoạt
        3: '#ff0000c2'     // Tạm khóa
    };
    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/user");
            const data = await response.json();
            setData(data);
            setRecords(data);
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
        const handleEditClick = (name) => {
            setCurrentCity(name);
            setIsEditing(true);
        };
        const handleCreateClick = () => {
            setIsAdd(true)
        };
        const handleuserNameChange = (event) => {
            setuserName(event.target.value)
        };
        const handleEmailChange = (event) => {
            // setEmail(event.target.value);
            const emailAddress = event.target.value;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Biểu thức chính quy kiểm tra email
            
            // Kiểm tra xem email nhập vào có khớp với biểu thức chính quy không
            if (!emailPattern.test(emailAddress)) {
                setEmailErrorMessage("Email không hợp lệ.");
            } else {
                setEmailErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
            }
            setEmail(emailAddress);
        };
        const handlePhoneChange = (event) => {
            setPhone(event.target.value)
        };
        const handleRoleChange = (event) => {
            setRole(event.target.value)
        };
        const handleStatusChange = (event) => {
            setStatus(event.target.value)
        };
        const handleTypeChange = (event) => {
            setType(event.target.value)
        };
        const handleCreateUser = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!userName) {
                missingInfo.push("Họ và tên");
            }
            if (!email) {
                missingInfo.push("Email");
            } else if (emailErrorMessage) { // Kiểm tra nếu có errorMessage cho email
                toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
                return; // Dừng xử lý tiếp theo nếu có lỗi
            }
            if (!phone) {
                missingInfo.push("Số điện thoại");
            }
            if (!role) {
                missingInfo.push("Quyền");
            }
            if (!status) {
                missingInfo.push("Status");
            }
            if (!type) {
                missingInfo.push("Loại tài khoản");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newUserData = {
                        name: userName,
                        password: "12345678", 
                        email: email,
                        phone: phone,
                        role: role,
                        status: status,
                        type: type,
                    };
            
                    const response = await fetch("http://localhost:8081/api/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUserData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("User đã được tạo thành công!");
                        toast.success("User đã được tạo thành công!");
                        const newUser = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newUser]);
                        setRecords(prevRecords => [...prevRecords, newUser]);
                        // Reset form hoặc làm gì đó khác
                        setuserName('');
                        setEmail('');
                        setPhone('');
                        setRole('');
                        setStatus('');
                        setType('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo user!");
                        toast.error("Có lỗi xảy ra khi tạo user!");
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
                        <div className="title">Quản lý Người dùng</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm người dùng</button>
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
                                <h2 class="modal-title">Sửa Người dùng</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Họ tên:</label>
                                        <input type="text" className="inputValue" value={currentCity.name} onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Email:</label>
                                        <input type="text" className="inputValue" value={currentCity.email} onChange={(e) => setCurrentCity({ ...currentCity, email: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điện thoại:</label>
                                        <input type="text" className="inputValue" value={currentCity.phone} onChange={(e) => setCurrentCity({ ...currentCity, phone: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Quyền:</label>
                                        {/* <input type="text" value={roleMap[currentCity.role] || 'Unknown Role'} onChange={(e) => setCurrentCity({ ...currentCity, role: e.target.value })} /> */}
                                        <select 
                                            value={currentCity.role}  className="inputValue"
                                            onChange={(e) => setCurrentCity({ ...currentCity, role: e.target.value })}
                                        >
                                            {Object.keys(roleMap).map(key => (
                                                <option key={key} value={key}>
                                                    {roleMap[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label>Tài khoản:</label>
                                        {/* <input type="text" className="inputValue" value={statusMap[currentCity.status] || 'Unknown Status'} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })} /> */}
                                        <select 
                                            value={currentCity.status}  className="inputValue"
                                            onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })}
                                        >
                                            {Object.keys(statusMap).map(key => (
                                                <option key={key} value={key}>
                                                    {statusMap[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Phương thức:</label>
                                        <input type="text" className="inputValue" value={currentCity.type} onChange={(e) => setCurrentCity({ ...currentCity, type: e.target.value })} />
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
                                <h2 class="modal-title">Thêm Người dùng</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label>Họ tên:</label>
                                        <input type="text" className="inputValue" value={userName} onChange={handleuserNameChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Email:</label>
                                        <input type="text" className="inputValue" value={email} onChange={handleEmailChange}  />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Điện thoại:</label>
                                        <input type="text" className="inputValue"  value={phone} onChange={handlePhoneChange} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Quyền:</label>
                                        {/* <input type="text" value={roleMap[currentCity.role] || 'Unknown Role'} onChange={(e) => setCurrentCity({ ...currentCity, role: e.target.value })} /> */}
                                        <select 
                                            className="inputValue"
                                            value={role} onChange={handleRoleChange} 
                                        >
                                            <option value="">Chọn quyền</option>
                                            {Object.keys(roleMap).map(key => (
                                                <option key={key} value={key}>
                                                    {roleMap[key]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="infoCity">
                                        <label>Tài khoản:</label>
                                        {/* <input type="text" className="inputValue" value={statusMap[currentCity.status] || 'Unknown Status'} onChange={(e) => setCurrentCity({ ...currentCity, status: e.target.value })} /> */}
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
                                    <div className="infoCity">
                                        <label className="info">Phương thức:</label>
                                        <input type="text" className="inputValue" value={type} onChange={handleTypeChange} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save"  onClick={handleCreateUser}>Tạo</button>
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
export default AdminUser