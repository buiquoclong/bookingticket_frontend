import React, {useState} from "react";
import "./Register.scss";
// import { FaPhoneAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Register  = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    return(
        <section className="main container section">
            <div className="register">
                <div className="wrapper">
                    <form  action="" className="infoLogin">
                        <h1>Đăng ký</h1>
                            <div className="form-feild">
                                <input type="email" className="input" placeholder="Nhập số Email" required/>
                                        
                            </div>
                            <div className="form-feild">
                                <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Nhập mật khẩu" required/>
                                {showPassword ? <FaEyeSlash onClick={togglePasswordVisibility} className="icon"/> : <FaEye onClick={togglePasswordVisibility} className="icon"/>}       
                            </div>
                            <div className="form-feild">
                                <input type={showRePassword ? 'text' : 'password'} className="input" placeholder="Nhập lại mật khẩu" required/>      
                                {showRePassword ? <FaEyeSlash onClick={toggleRePasswordVisibility} className="icon"/> : <FaEye onClick={toggleRePasswordVisibility} className="icon"/>}
                            </div>
                            <button className="" type="submit" >Đăng ký</button>

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
            
        </section>
    )
}
export default Register;