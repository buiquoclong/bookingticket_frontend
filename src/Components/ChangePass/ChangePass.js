import React, {useState, useEffect} from "react";
import "./ChangePass.scss";
import {useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePass  = () => {
    
    const [data, setData] = useState(null);
    
    const [showNowPassword, setShowNowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReNewPassword, setShowReNewPassword] = useState(false);
    
    const [nowPassErrorMessage, setNowPassErrorMessage] = useState('');
    const [newPassErrorMessage, setNewPassErrorMessage] = useState('');
    const [renewPassErrorMessage, setReNewPassErrorMessage] = useState('');

    const [nowPass, setNowPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [reNewPass, setReNewPass] = useState("");

    const navigate = useNavigate();
    const toggleNowPasswordVisibility = () => {
        setShowNowPassword(!showNowPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleReNewPasswordVisibility = () => {
        setShowReNewPassword(!showReNewPassword);
    };
    const userId = sessionStorage.getItem("userId");
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
    const handleNowPassChange = (event) => {
        setNowPass(event.target.value);
    };
    const handleNewPassChange = (event) => {
        setNewPass(event.target.value);
    };
    const handleReNewPassChange = (event) => {
        setReNewPass(event.target.value);
    };
    const canUpdatePassword = nowPass && newPass && reNewPass;
    
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 32 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
    };

    const handleupdatePass = async () => {

        if (newPass !== reNewPass) {
            setReNewPassErrorMessage('Mật khẩu nhập lại không khớp.');
            return;
        } else {
            setReNewPassErrorMessage('');
            if (!validatePassword(newPass)) {
            setNewPassErrorMessage('Mật khẩu không đúng định dạng');
            return;
            } else {
                setNewPassErrorMessage('');
                if(nowPass === data.password){
                    setNowPassErrorMessage("");
                    try {
                        // Sau khi cập nhật thành công, cập nhật lại booking
                        const updateUser = {
                            name: data.name,
                            password: newPass,
                            email: data.email,
                            phone: data.phone,
                            role: data.role,
                            status: data.status,
                            type: data.type, 
                            confirmToken: data.confirmToken
                        };
                        const updateUserResponse = await fetch(`http://localhost:8081/api/user/${userId}`, {
                            method: 'PUT', // hoặc 'PATCH' tùy vào API của bạn
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updateUser), // Cập nhật trạng thái của booking thành 'cancelled'
                        });
        
                        if (updateUserResponse.ok) {
                            toast.success("Bạn đã đổi mật khẩu thành công");
                            setTimeout(() => {
                                navigate("/login");
                            }, 2000);
                        } else {
                            // Xử lý lỗi nếu có
                            console.error('Failed to update pass:', updateUserResponse.statusText);
                        }
                    } catch (error) {
                        console.error("Error update:", error);
                    }
                }else{
                    setNowPassErrorMessage("Mật khẩu không đúng");
                }
            }
        }
    };
    

    
    return (
            <section className="main container section">
                <div className="infoContent ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            Đổi mật khẩu
                        </h3>
                    </div>
                    <div className="infoPassUser">
                        <div className="passInfo">
                            <span>Mật khẩu hiện tại:</span>
                            <div className="form-feild">
                                <input type={showNowPassword ? 'text' : 'password'} className="input" placeholder="Nhập lại mật khẩu" required  value={nowPass} onChange={handleNowPassChange}/>      
                                {showNowPassword ? <FaEyeSlash onClick={toggleNowPasswordVisibility} className="icon"/> : <FaEye onClick={toggleNowPasswordVisibility} className="icon"/>}
                                {nowPassErrorMessage && <p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".3rem"  }}>{nowPassErrorMessage}</p>}
                            </div>
                        </div>
                        <div className="passInfo">
                            <span>Mật khẩu mới:</span>
                            <div className="form-feild">
                                <input type={showNewPassword ? 'text' : 'password'} className="input" placeholder="Nhập lại mật khẩu" required  value={newPass} onChange={handleNewPassChange}/>
                                {newPassErrorMessage ?<p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".3rem"  }}>{newPassErrorMessage}</p> : <p style={{lineHeight:"1.5", fontSize:"12px", color:"black", paddingLeft:".3rem" }}>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p> }
                                {showNewPassword ? <FaEyeSlash onClick={toggleNewPasswordVisibility} className="icon"/> : <FaEye onClick={toggleNewPasswordVisibility} className="icon"/>}
                            </div>
                        </div>
                        <div className="passInfo">
                            <span>Nhập lại mật khẩu mới:</span>
                            <div className="form-feild">
                                <input type={showReNewPassword ? 'text' : 'password'} className="input" placeholder="Nhập lại mật khẩu" required  value={reNewPass} onChange={handleReNewPassChange}/>
                                {renewPassErrorMessage && <p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".3rem"  }}>{renewPassErrorMessage}</p>}
                                {showReNewPassword ? <FaEyeSlash onClick={toggleReNewPasswordVisibility} className="icon"/> : <FaEye onClick={toggleReNewPasswordVisibility} className="icon"/>}
                            </div>
                        </div>
                        
                        <div className="buttonSave">
                            <button
                                className={canUpdatePassword ? 'btn save' : ' disabled'}
                                disabled={!canUpdatePassword}
                                onClick={handleupdatePass}
                                >
                                Đổi mật khẩu
                            </button>
                        </div>
                        
                    </div>
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
export default ChangePass;