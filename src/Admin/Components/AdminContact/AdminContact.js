import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminContact/AdminContact.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminContact = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentCity, setCurrentCity] = useState();
    
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên liên hệ</div>,
            selector: row => row.name,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Email</div>,
            selector: row => row.email,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.email}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tiêu đề</div>,
            selector: row => row.title,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.title}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nồij dung</div>,
            selector: row => row.content,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.content}</div>
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
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/contact");
            const data = await response.json();
            setData(data);
            setRecords(data);
            console.log("Contact:", data);
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    };
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
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
        const handleNameChange = (event) => {
            setName(event.target.value)
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
        const handleTitleChange = (event) => {
            setTitle(event.target.value)
        };
        const handleContentChange = (event) => {
            setContent(event.target.value)
        };
        const handleCreateContact = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!name) {
                missingInfo.push("Tên tài xế");
            }
            if (!email) {
                missingInfo.push("Email");
            } else if (emailErrorMessage) { // Kiểm tra nếu có errorMessage cho email
                toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
                return; // Dừng xử lý tiếp theo nếu có lỗi
            }
            if (!title) {
                missingInfo.push("Tiêu đề");
            }
            if (!content) {
                missingInfo.push("Nội dung");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newContactData = {
                        content: content,
                        email: email,
                        name: name,
                        title: title
                    };
            
                    const response = await fetch("http://localhost:8081/api/contact", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newContactData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Contact đã được tạo thành công!");
                        toast.success("Contact đã được tạo thành công!");
                        const newContact = await response.json(); // Nhận thông tin của người dùng mới từ phản hồi
                        // Thêm người dùng mới vào danh sách
                        setData(prevData => [...prevData, newContact]);
                        setRecords(prevRecords => [...prevRecords, newContact]);
                        // Reset form hoặc làm gì đó khác
                        setName('');
                        setEmail('');
                        setTitle('');
                        setContent('');
                        setIsAdd(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi tạo contact!");
                        toast.error("Có lỗi xảy ra khi tạo contact!");
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
                        <div className="title">Liên hệ</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Tạo liên hệ</button>
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
                                <h2 class="modal-title">Thêm liên hệ</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên:</label>
                                        <input type="text" value={name} onChange={handleNameChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Email:</label>
                                        <input type="text" value={email} onChange={handleEmailChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Tiêu đề:</label>
                                        <input type="text" value={title} onChange={handleTitleChange}/>
                                    </div>
                                    <div className="infoCity">
                                        <label>Nội dung:</label>
                                        <input type="text" value={content} onChange={handleContentChange}/>
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleCreateContact}>Tạo</button>
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
export default AdminContact