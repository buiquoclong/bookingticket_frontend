import React, {useState} from "react";
import "./Register.scss";
// import { FaPhoneAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register  = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [newPassErrorMessage, setNewPassErrorMessage] = useState('');
    const [renewPassErrorMessage, setReNewPassErrorMessage] = useState('');

    const [email, setEmail] = useState("");
    const [newPass, setNewPass] = useState("");
    const [reNewPass, setReNewPass] = useState("");
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
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
    const handleNewPassChange = (event) => {
        setNewPass(event.target.value);
    };
    const handleReNewPassChange = (event) => {
        setReNewPass(event.target.value);
    };
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 32 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
    };
    const canRegister = email && newPass && reNewPass;
    const handleRegister = async (e) => {
        e.preventDefault();
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
                    const registerUser = {
                        name: "",
                        password: newPass,
                        email: email,
                        phone: "",
                        role: 1,
                        status: 1,
                        type: "Đăng ký"
                    };
                    try {
                        const regiterUserResponse = await fetch(`http://localhost:8081/api/user`, {
                            method: 'POST', // hoặc 'PATCH' tùy vào API của bạn
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(registerUser), // Cập nhật trạng thái của booking thành 'cancelled'
                        });
        
                        if (regiterUserResponse.ok) {
                            const data = await regiterUserResponse.text();
                            if(data === "Email đã tồn tại"){
                                toast.error("Email đã tồn tại");
                                return;
                            }
                            toast.success("Bạn đã tạo tài khoản thành công");
                            
                        } else {
                            // Xử lý lỗi nếu có
                            console.error('Failed to register:', regiterUserResponse.statusText);
                        }
                    } catch (error) {
                        console.error("Error register:", error);
                    }
                
            }
        }
    };

    return(
        <section className="main container section">
            <div className="register">
                <div className="wrapper">
                    <form  action="" className="infoRegister">
                        <h1>Đăng ký</h1>
                            <div className="form-feild">
                                <input type="email" className="input" placeholder="Nhập Email" required value={email} onChange={handleEmailChange}/>
                                {emailErrorMessage && <p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".5rem"  }}>{emailErrorMessage}</p>}
                                        
                            </div>
                            <div className="form-feild">
                                <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Nhập mật khẩu" required  value={newPass} onChange={handleNewPassChange}/>
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} className="icon"/> : <FaEye onClick={togglePasswordVisibility} className="icon"/>}      
                                {newPassErrorMessage ?<p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".5rem"  }}>{newPassErrorMessage}</p> : <p style={{lineHeight:"1.5", fontSize:"12px", color:"black", paddingLeft:".5rem" }}>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p> } 
                            </div>
                            <div className="form-feild">
                                <input type={showRePassword ? 'text' : 'password'} className="input" placeholder="Nhập lại mật khẩu" required  value={reNewPass} onChange={handleReNewPassChange}/>      
                                {showRePassword ? <FaEyeSlash onClick={toggleRePasswordVisibility} className="icon"/> : <FaEye onClick={toggleRePasswordVisibility} className="icon"/>}
                                {renewPassErrorMessage && <p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".5rem"  }}>{renewPassErrorMessage}</p>}
                            </div>
                                <div className="buttonSave">
                                    <button
                                        className={canRegister ? 'btn save' : ' disabled'}
                                        disabled={!canRegister}
                                        onClick={handleRegister}
                                        >
                                        Đăng ký
                                    </button>
                                </div>

                            <div className="line-container">
                                <div className="line"></div>
                                    <span className="text" style={{paddingInline:"10px"}}>Hoặc</span>
                                <div className="line"></div>
                            </div>
                    </form>

                    <button className="btn" >Tiếp tục với Google</button>
                                    
                    <div className="register-link">
                        <p>Bạn đã có tài khoản
                            <Link to="/login" className="register"> Đăng nhập</Link>
                        </p>
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
export default Register;