import React from "react";
import "../AdminPay/AdminPay.scss"
import success from "../../Assets/img/success.png";


const AdminPay = () =>{
    return(
        <div className="main-container">
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
                    <button className="btn trasau">Tiền mặt</button>
                    
                </div>
            </div>
        </section>
        </div>

        
    )
}
export default AdminPay