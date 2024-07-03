import React, {useState, useEffect} from "react";
import "./InfoUser.scss";
import {useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InfoUser  = () => {
    
    const [data, setData] = useState(null);
    const [userName, setUserName] = useState("");
    const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [phone, setPhone] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
        useEffect(() => {
            if (userId) {
            fetchUserInfo();
        }
    }, [userId]);
    
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/user/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setData(data);
                setUserName(data.name);
                setPhone(data.phone);
                setEmail(data.email);
            } else {
                console.error("Error fetching user data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    // Xử lý khi input tên người dùng thay đổi
    const handleUserNameChange = (event) => {
        // setUserName(event.target.value);
        const value = event.target.value;
        // Kiểm tra nếu không có giá trị
        if (!value) {
            setUserNameErrorMessage('Vui lòng nhập tên người dùng');
        } else {
            // Nếu có giá trị, đặt lại thông báo lỗi thành rỗng
            setUserNameErrorMessage('');
        }
        setUserName(value);
    };

    // Xử lý thay đổi cho input số điện thoại
    const handlePhoneChange = (event) => {
        // setPhone(event.target.value);
        const phoneNumber = event.target.value;
        const phonePattern = /^(0\d{9,10})$/; // Biểu thức chính quy kiểm tra số điện thoại
        
        // Kiểm tra xem số điện thoại nhập vào có khớp với biểu thức chính quy không
        if (!phonePattern.test(phoneNumber)) {
            setPhoneErrorMessage("Số điện thoại không hợp lệ.");
        } else {
            setPhoneErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
        }
        setPhone(phoneNumber);
    };

    // Xử lý thay đổi cho input email
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
    const handleupdateUser = async () => {
        let missingInfo = [];
        if (!userName) {
            missingInfo.push("Họ và tên");
        } else if (userNameErrorMessage) {
            toast.error(userNameErrorMessage);
            return;
        }
        if (!phone) {
            missingInfo.push("Số điện thoại");
        } else if (phoneErrorMessage) {
            toast.error(phoneErrorMessage);
            return;
        }
        if (!email) {
            missingInfo.push("Email");
        } else if (emailErrorMessage) {
            toast.error(emailErrorMessage);
            return;
        }
        if (missingInfo.length > 0) {
            const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
            toast.error(message);
        } else {
            try {
                const token = localStorage.getItem("token");
                const updateUser = {
                    name: userName,
                    password: data.password,
                    email: email,
                    phone: phone,
                    role: data.role,
                    status: data.status,
                    type: data.type, 
                    confirmToken: data.confirmToken
                };
                const updateUserResponse = await fetch(`http://localhost:8081/api/user/${userId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(updateUser), // Cập nhật trạng thái của booking thành 'cancelled'
                });

                if (updateUserResponse.ok) {
                    toast.success("Bạn đã cập nhật thông tin thành công");
                    
                } else {
                    // Xử lý lỗi nếu có
                    console.error('Failed to update user:', updateUserResponse.statusText);
                }
            } catch (error) {
                console.error("Error update:", error);
            }
        }
        
    };
    const handleChangePassClick = () => {
        navigate('/change_pass');
        
    }
    
    return (
            <section className="main container section">
                <div className="infoContent ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            THÔNG TIN CÁ NHÂN
                        </h3>
                    </div>
                    <div className="infoUser">
                        <div className="lineInfo">
                            <span>Họ và tên:</span>
                            <div >
                                <input type="text" className="Note" placeholder="Họ và tên"  value={userName} onChange={handleUserNameChange}/>
                                {userNameErrorMessage && <p style={{ color: "red", lineHeight:"1", fontSize:"12px", paddingLeft:".3rem"  }}>{userNameErrorMessage}</p>}
                            </div>
                        </div>
                        <div className="lineInfo">
                            <span>Số điện thoại:</span>
                            <div >
                                <input type="text" className="Note" placeholder="Số điện thoại" value={phone}  onChange={handlePhoneChange}/>
                                {phoneErrorMessage && <p style={{ color: "red", lineHeight:"1", fontSize:"12px", paddingLeft:".3rem"  }}>{phoneErrorMessage}</p>}
                            </div>
                        </div>
                        <div className="lineInfo">
                            <span>Email:</span>
                            <div >
                                <input type="text" className="Note" placeholder="Email" value={email} onChange={handleEmailChange}/>
                                {emailErrorMessage && <p style={{ color: "red", lineHeight:"1", fontSize:"12px", paddingLeft:".3rem"  }}>{emailErrorMessage}</p>}
                            </div>
                        </div>
                        <div className="buttonSaveInfo">
                            <button className="btn save"  onClick={handleChangePassClick}>Đổi mật khẩu</button>
                            <button className="btn save"  onClick={handleupdateUser}>Lưu thay đổi</button>
                        </div>
                        
                    </div>
                </div>
                <ToastContainer
                        containerId="main"
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
            </section>
    )
}
export default InfoUser;