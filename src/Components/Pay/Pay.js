import React, {useState} from "react";

import "./Pay.scss";
import success from "../../Assets/img/success.png";
import { Link } from 'react-router-dom';


const Pay = () =>{
    return(
        <section className="main container section">
            <div className="payContent">
                <div className="imgsucces">
                        <img src={success} alt="succes"/>                    
                </div>
                <div className="content">
                    <div className="titlePay">Thanh toán</div>
                    <div>Quý khách vui lòng lựa chọn phương thức thanh toán bên dưới để thanh toán và nhận vé</div>
                </div>
                <div className="payMent">
                    <button className="vnpay btn"><span style={{color:"#ed3237"}}>VN</span><span style={{color:"#0f62ac "}}>PAY</span></button>
                    <Link to="/"><button className="btn trasau">Trả sau</button></Link>
                    
                </div>
            </div>
        </section>
    )
}
export default Pay