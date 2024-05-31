import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminContact/AdminContact.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminContact = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [currentContact, setcurrentContact] = useState();
    
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
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
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Nội dung</div>,
            selector: row => row.content,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.content}</div>
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
        fetchContacts();
    }, [page]);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/contact/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.contacts);
            setRecords(data.contacts);
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
            setcurrentContact(kindVehicle);
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
        const handleUpdateContact = async (e) => {
            e.preventDefault();
            let missingInfo = [];
            if (!currentContact.name) {
                missingInfo.push("Tên tài xế");
            }
            if (!currentContact.email) {
                missingInfo.push("Email");
            } else if (emailErrorMessage) { // Kiểm tra nếu có errorMessage cho email
                toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
                return; // Dừng xử lý tiếp theo nếu có lỗi
            }
            if (!currentContact.title) {
                missingInfo.push("Tiêu đề");
            }
            if (!currentContact.content) {
                missingInfo.push("Nội dung");
            }
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                try {
                    const newContactData = {
                        content: currentContact.content,
                        email: currentContact.email,
                        name: currentContact.name,
                        title: currentContact.title
                    };
            
                    const response = await fetch(`http://localhost:8081/api/contact/${currentContact.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newContactData)
                    });
            
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Contact đã được cập nhật thành công!");
                        toast.success("Contact đã được cập nhật thành công!");
                        const updatedContact = await response.json();
                        const updatedContacts = records.map(contact => {
                            if (contact.id === updatedContact.id) {
                                return updatedContact;
                            }
                            return contact;
                        });
                        setRecords(updatedContacts);
                        // Reset form hoặc làm gì đó khác
                        // setName('');
                        // setEmail('');
                        // setTitle('');
                        // setContent('');
                        setIsEditing(false);
                        // window.location.reload();
                    } else {
                        console.error("Có lỗi xảy ra khi cập nhật contact!");
                        toast.error("Có lỗi xảy ra khi cập nhật contact!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    toast.error("Lỗi:", error);
                }
            }
        };
        const handleRemoveClick = async (contact) => {
            const contactId = contact.id;
            try {
                const response = await fetch(`http://localhost:8081/api/contact/${contactId}`, {
                method: "DELETE"
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updatedContact = records.filter(record => record.id !== contactId);
                    setRecords(updatedContact);
                    toast.success("contact đã được xóa thành công!");
                } else {
                    console.error("Có lỗi xảy ra khi xóa contact!");
                    toast.error("Có lỗi xảy ra khi xóa contact!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
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
                Liên hệ
                </Link>
            </Breadcrumbs>

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
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Sửa Liên hệ</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên liên hệ:</label>
                                        <input type="text" value={currentContact.name} onChange={(e) => setcurrentContact({ ...currentContact, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label className="info">Email:</label>
                                        <input type="text" value={currentContact.email} onChange={(e) => setcurrentContact({ ...currentContact, email: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Tiêu đề:</label>
                                        <input type="text" value={currentContact.title} onChange={(e) => setcurrentContact({ ...currentContact, title: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Nội dung:</label>
                                        <input type="text" value={currentContact.content} onChange={(e) => setcurrentContact({ ...currentContact, content: e.target.value })} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdateContact}>Lưu</button>
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
                                <h2 className="modal-title">Thêm liên hệ</h2>
                            </div>
                            <div className="modal-body">
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