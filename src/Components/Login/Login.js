import React, {useState} from "react";
import "./Login.scss";
// import { FaPhoneAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link, useNavigate   } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';


const Login  = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
    const handlePassChange = (event) => {
        const password = event.target.value;

        if (!validatePassword(password)) {
            setPassErrorMessage('Mật khẩu không đúng định dạng');
        } else {
            setPassErrorMessage('');
        }
        setPassword(password);
    };
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 32 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
    };
    const handleError = (token) => {
        if (token.includes(",")) {
            const [userId, status] = token.split(",");
            if (status === "VERIFY") {
                navigate("/confirm-account", { state: { userId } });
                return;
            }
        }
        switch (token) {
            case "NULL":
                toast.error("Không tìm thấy người dùng");
                break;
            case "LOCK":
                toast.error("Người dùng đã bị khóa");
                break;
            case "PASSWORD":
                toast.error("Sai mật khẩu");
                break;
            default:
                toast.error("Lỗi không xác định");
        }
    };
    const canLogin = email && pass;
    const ProceedLogin = async (e) => {
        e.preventDefault();
        if (emailErrorMessage) {
            toast.error(emailErrorMessage);
            return;
        }else{
            setEmailErrorMessage("");
            if (!validatePassword(pass)) {
                setPassErrorMessage('Mật khẩu không đúng định dạng');
                return;
            }else{
                setPassErrorMessage('');
                const loginDTO = {
                    email: email,
                    pass: pass // Thay đổi pass thành password
                };
            
                try {
                    const response = await fetch("http://localhost:8081/api/user/login", {
                        method: "POST",
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify(loginDTO)
                    });
            
                    if (response.ok) {
                        const token = await response.text();
                        console.log("token", token);
                        if (token === "NULL" || token === "LOCK" || token === "PASSWORD" || token.includes(",")) {
                            handleError(token); // Hiển thị thông báo lỗi tùy theo mã lỗi
                        } else{
                            localStorage.setItem('token', token);
                            // Giải mã token để lấy userId
                            const decodedToken = jwtDecode(token);
                            const userId = decodedToken.userId;
                            const userRole = decodedToken.role;

                            localStorage.setItem('userId', userId);
                            localStorage.setItem('userRole', userRole);
                            
                            const redirectPath = sessionStorage.getItem('redirectPath');
                            if (redirectPath) {
                            navigate(redirectPath);
                            sessionStorage.removeItem('redirectPath');
                            } else {
                                if (userRole  === 1) {
                                    navigate('/');
                                } else if (userRole  === 2 || userRole  === 3) {
                                    navigate('/admin');
                                    window.location.reload();
                                }
                            }
                        }
                    } else {
                        toast.error('Failed: ' + response.status);
                    }
                } catch (err) {
                    toast.error('Failed: ' + err.message);
                    // Handle and display error messages
                }
            }
        }
    };
    const googleLogin = () => {
        localStorage.setItem("googleLogin", "true"); 
        window.location.href = 'http://localhost:8081/oauth2/authorization/google';
    };
    
    
    return(
        <section className="main container section">
            <div className="login">
                <div className="wrapper">
                    <form  action="" className="infoLogin">
                        <h1>Đăng nhập</h1>
                            <div className="form-feild">
                                <input type="email" className="input" placeholder="Nhập Email" required value={email} onChange={handleEmailChange}/>
                                {emailErrorMessage && <p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".5rem"  }}>{emailErrorMessage}</p>}
                                        
                            </div>
                            <div className="form-feild">
                                <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Nhập mật khẩu" required  value={pass} onChange={handlePassChange}/>      
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} className="icon"/> : <FaEye onClick={togglePasswordVisibility} className="icon"/>}
                                {passErrorMessage ?<p style={{lineHeight:"1.5", fontSize:"12px", color:"red", paddingLeft:".5rem"  }}>{passErrorMessage}</p> : <p style={{lineHeight:"1.5", fontSize:"12px", color:"black", paddingLeft:".5rem" }}>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p> } 
                            </div>
                            <div className="forgot">
                                <Link to="/forget-pass" className="forgetLink"> Quên mật khẩu?</Link>
                            </div>
                            <div className="buttonSave">
                                    <button
                                        className={canLogin ? 'btn save' : ' disabled'}
                                        disabled={!canLogin}
                                        onClick={ProceedLogin}
                                        >
                                        Đăng nhập
                                    </button>
                                </div>

                            <div className="line-container">
                                <div className="line"></div>
                                    <span className="text" style={{paddingInline:"10px"}}>Hoặc</span>
                                <div className="line"></div>
                            </div>
                    </form>

                    <button className="btn" onClick={googleLogin} >Tiếp tục với Google</button>
                                    
                    <div className="register-link">
                        <p>Bạn chưa có tài khoản
                            <Link to="/register" className="register"> Đăng ký</Link>
                        </p>
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
export default Login;