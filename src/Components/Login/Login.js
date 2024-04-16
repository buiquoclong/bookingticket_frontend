import React, {useState} from "react";
import "./Login.scss";
// import { FaPhoneAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link, useNavigate   } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login  = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const ProceedLogin = async (e) => {
        e.preventDefault();
    
        if (!validate()) {
            return;

        }
        const loginDTO = {
            email: email,
            password: pass // Thay đổi pass thành password
        };
    
        try {
            const response = await fetch("http://localhost:8081/api/user/login", {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(loginDTO)
            });
    
            if (response.ok) {
                const data = await response.text();
                if (isNaN(parseInt(data))) {
                    // Nếu dữ liệu trả về không phải là một số, nó là một thông báo lỗi
                    toast.error(data);
                }else {
                    const userId = parseInt(data);
                    sessionStorage.setItem('userId', userId);
                    if (!isNaN(userId)) {
                        sessionStorage.setItem('userId', userId);
                        const userInfoResponse = await fetch(`http://localhost:8081/api/user/${userId}`, {
                            method: "GET",
                            headers: {'content-type': 'application/json'}
                        });
                        const userInfo = await userInfoResponse.json();
                        // console.log(userInfo.role.id);
                        // navigate('/admin');
                        if (userInfo.role.id  === 1) {
                            navigate('/');
                        } else if (userInfo.role.id  === 2 || userInfo.role.id  === 3) {
                            navigate('/admin');
                        }
                        console.log(userInfo);
                        console.log(userInfo.role);
                    }
                    
                }
            } else {
                toast.error('Failed: ' + response.status);
            }
        } catch (err) {
            toast.error('Failed: ' + err.message);
            // Handle and display error messages
        }
    };
    const validate = () => {
        let result = true;

        if (email === '' || email === null) {
            result = false;
            toast.error('Please Enter Username');
        } 
        if (pass === '' || pass === null) {
            result = false;
            toast.error('Please Enter Password');
        }
        if (pass.length <8) {
            result = false;
            toast.error('Password must be at least 8 characters long');
        }
        return result;
    };
    
    
    return(
        <section className="main container section">
            <div className="login">
                <div className="wrapper">
                    <form  action="" className="infoLogin">
                        <h1>Đăng nhập</h1>
                            <div className="form-feild">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Nhập Email" required/>
                                        
                            </div>
                            <div className="form-feild">
                                <input type={showPassword ? 'text' : 'password'} value={pass} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Nhập mật khẩu" required/>      
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} className="icon"/> : <FaEye onClick={togglePasswordVisibility} className="icon"/>}
                            </div>
                            <div className="forgot">
                                <a href="#">Quên mật khẩu?</a>
                            </div>
                            <button className="" type="submit"  onClick={ProceedLogin}>Đăng nhập</button>

                            <div className="line-container">
                                <div className="line"></div>
                                    <span className="text" style={{paddingInline:"10px"}}>Hoặc</span>
                                <div className="line"></div>
                            </div>
                    </form>

                    <button className="btn" >Tiếp tục với Google</button>
                                    
                    <div className="register-link">
                        <p>Bạn chưa có tài khoản
                            <Link to="/register" className="register"> Đăng ký</Link>
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
export default Login;