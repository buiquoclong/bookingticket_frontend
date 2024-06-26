import React, {useState, useEffect} from "react";
import "./ForgetPass.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgetPass  = () => {
    const [confirmCode, setConfirmCode] = useState('');
    const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [data, setData] = useState([]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const navigate = useNavigate();
    const location = useLocation();
    const {userId} = location.state || {};
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
        } else {
            console.error("Error fetching user data:", data.message);
        }
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
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


    const handleForget = async (event) => {
        event.preventDefault();
        let missingInfo = [];
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
                    // Sau khi cập nhật thành công, cập nhật lại booking
                    const forgetData = {
                        email: email
                    };
                    const forgetPassResponse = await fetch(`http://localhost:8081/api/user/forgot-password`, {
                        method: 'POST', // hoặc 'PATCH' tùy vào API của bạn
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(forgetData), // Cập nhật trạng thái của booking thành 'cancelled'
                    });
    
                    if (forgetPassResponse.ok) {
                        const data = await forgetPassResponse.text();
                        if(data === "Không tìm thấy người dùng với địa chỉ email này."){
                            toast.error("Không tìm thấy người dùng với địa chỉ email này.");
                            return;
                        }
                        toast.success("Mật khẩu mới đã được gửi đến email của bạn");
                        setTimeout(() => {
                            navigate("/login");
                        }, 1000);
                    } else {
                        // Xử lý lỗi nếu có
                        console.error('Failed to update pass:', forgetPassResponse.statusText);
                    }
                } catch (error) {
                    console.error("Error update:", error);
                }
            
        }
    };

    const handleconfirmCodeChange = (event) => {
        const confirmCode = event.target.value;
        
        // Kiểm tra xem mã vé có trống không
        if (confirmCode.trim() === '') {
            // Nếu trống, hiển thị thông báo lỗi
            setConfirmCodeErrorMessage('Mã xác nhận không được để trống');
        } else {
            // Nếu không trống, xóa thông báo lỗi (nếu có)
            setConfirmCodeErrorMessage('');
        }
        setConfirmCode(confirmCode);
    };

    return (
            <section className="main container section">
                <div className="searchTicket ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            QUÊN MẬT KHẨU
                        </h3>
                        <p>Vui lòng nhập địa chỉ email của bạn để có thể tiếp tục đăng nhập vào hệ thống</p>
                    </div>

                    <form className="infoTicket">
                        <div className="infoT">
                            <div className="form-feild">
                                <input type="text" className="input" placeholder=" " value={email} onChange={handleEmailChange}/>
                                <label htmlFor="name" className="label"> Nhập địa chỉ Email</label>
                            </div>
                            {emailErrorMessage && <p style={{ color: "red", lineHeight:"2", paddingLeft:"1rem", fontSize:"12px" }}>{emailErrorMessage}</p>}
                        </div>
                        
                        <button className="btn search" onClick={handleForget}>Gửi</button>
                    </form>
                </div>
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
            </section>
    )
}
export default ForgetPass;