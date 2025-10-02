import React, {useState, useEffect} from "react";
import "./ConfirmAccount.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ConfirmAccount  = () => {
    const [confirmCode, setConfirmCode] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState('');
    
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


    const handleSearch = async (event) => {
        event.preventDefault();
        let missingInfo = [];
        if (!confirmCode) {
            missingInfo.push("Mã xác nhận");
        } else if (confirmCodeErrorMessage) {
            toast.error(confirmCodeErrorMessage);
            return;
        }
        if (missingInfo.length > 0) {
            const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
            toast.error(message);
        } else {
            if(confirmCode === data.confirmToken){
                try {
                    // Sau khi cập nhật thành công, cập nhật lại booking
                    const updateUser = {
                        name: data.name,
                        password: data.password,
                        email: data.email,
                        phone: data.phone,
                        role: data.role,
                        status: 2,
                        type: data.type, 
                        confirmToken: data.confirmToken
                    };
                    const confirmUserResponse = await fetch(`http://localhost:8081/api/user/update/${userId}`, {
                        method: 'PUT', // hoặc 'PATCH' tùy vào API của bạn
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateUser), // Cập nhật trạng thái của booking thành 'cancelled'
                    });
    
                    if (confirmUserResponse.ok) {
                        toast.success("Bạn đã xác thực tài khoản thành công");
                        setTimeout(() => {
                            navigate("/login");
                        }, 2000);
                        
                    } else {
                        // Xử lý lỗi nếu có
                        console.error('Failed to update pass:', confirmUserResponse.statusText);
                    }
                } catch (error) {
                    console.error("Error update:", error);
                }
            }else{
                toast.error("Mã xác nhận không đúng");
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
    const changeConfirm = async (event) => {
        event.preventDefault();
        
                try {
                    // Sau khi cập nhật thành công, cập nhật lại booking
                    const changeData = {
                        userId: userId
                    };
                    const changeConfirmResponse = await fetch(`http://localhost:8081/api/user/change-confirm`, {
                        method: 'POST', // hoặc 'PATCH' tùy vào API của bạn
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(changeData), // Cập nhật trạng thái của booking thành 'cancelled'
                    });
    
                    if (changeConfirmResponse.ok) {
                        const data = await changeConfirmResponse.text();
                        if(data === "FAIL"){
                            toast.error("Lỗi không thể gửi mã xác thực");
                            return;
                        }
                        toast.success("Mã xác thực mới đã được gửi đến email của bạn");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else {
                        // Xử lý lỗi nếu có
                        console.error('Failed to update pass:', changeConfirmResponse.statusText);
                    }
                } catch (error) {
                    console.error("Error update:", error);
                }
            
        
    };

    return (
            <section className="main container section">
                <div className="searchTicket ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            XÁC THỰC TÀI KHOẢN
                        </h3>
                        {data &&(
                            <p>Chúng tôi đã gửi mã xác nhận vào email: <strong>{data.email}</strong> mà bạn đã đăng ký. Vui lòng nhập mã xác nhận để xác thực tài khoản</p>
                        )}
                        
                    </div>

                    <form className="infoTicket">
                        <div className="infoT">
                            <div className="form-feild">
                                <input type="text" className="input" placeholder=" " value={confirmCode} onChange={handleconfirmCodeChange}/>
                                <label htmlFor="name" className="label"> Nhập mã xác nhận</label>
                            </div>
                            {confirmCodeErrorMessage && <p style={{ color: "red", lineHeight:"2", paddingLeft:"1rem", fontSize:"12px" }}>{confirmCodeErrorMessage}</p>}
                        </div>
                        <div className="button-group">
                            <button className="btn search" onClick={changeConfirm}>Gửi lại mã xác nhận</button>
                            <button className="btn search" onClick={handleSearch}>Xác nhận</button>
                        </div>
                    </form>
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
export default ConfirmAccount;