import React, {useState} from "react";
import "./Login.scss";
// import { FaPhoneAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Login  = () => {
    const [showPassword, setShowPassword] = useState(false);

    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <section className="main container section">
            <div className="login">
                <div className="wrapper">
                    <form  action="" className="infoLogin">
                        <h1>Đăng nhập</h1>
                            <div className="form-feild">
                                <input type="text" className="input" placeholder="Nhập số điện thoại" required/>
                                        
                            </div>
                            <div className="form-feild">
                                <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Nhập mật khẩu" required/>      
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} className="icon"/> : <FaEye onClick={togglePasswordVisibility} className="icon"/>}
                            </div>
                            <div className="forgot">
                                <a href="#">Quên mật khẩu?</a>
                            </div>
                            <button className="" type="submit" >Đăng nhập</button>

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
        </section>
    )
}
export default Login;