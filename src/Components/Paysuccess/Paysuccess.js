import React, {useState, useEffect} from "react";

import "./Paysuccess.scss";
import success from "../../Assets/img/success.png";
import { Link, useLocation } from 'react-router-dom';


const Paysuccess = () =>{
    const location = useLocation();
    const { orderDetailId } = location.state || {};
    const [data, setData] = useState(null);

    useEffect(() => {
        // Call the API to fetch cities
        fetchOrderDetail();
    }, [orderDetailId]);

    const fetchOrderDetail = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/orderdetail/${orderDetailId}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    return(
        <section className="main container section">
            {data && (
                <div className="payContent">
                <div className="imgsucces">
                        <img src={success} alt="succes"/>                    
                </div>
                <div className="content">
                    <div className="titlePay">Thành công</div>
                    <div>Thông tin chi tiết vé</div>
                </div>
                <div className="ticketInfo">
                    <div className="tripLabel">
                        <div className="tripInfo">
                            <span>Tuyến đi:</span>
                            <div className="rightInfo">
                                <span>{data.order.trip.route.name}</span>
                            </div>
                        </div>
                        <div className="tripInfo">
                            <span>Ngày đi:</span>
                            <div className="rightInfo">
                                <span>{new Date(data.order.trip.dayStart).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                        <div className="tripInfo">
                            <span>Giờ khởi hành:</span>
                            <div className="rightInfo">
                                <span>{data.order.trip.timeStart.slice(0, 5)}</span>
                            </div>
                        </div>
                        <div className="tripInfo">
                            <span>Loại xe/ Biến số:</span>
                            <div className="rightInfo">
                                <span>{data.order.trip.vehicle.name}/ {data.order.trip.vehicle.vehicleNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className="tripInfo">
                        <span>Mã vé:</span>
                        <div className="rightInfo">
                            <span>{data.id}</span>
                        </div>
                    </div>
                    <div className="seatInfo">
                        <span>Ghế đã đặt: </span>
                        <div className="rightInfo">
                            <span>{data.seatName}</span>
                        </div>
                    </div>
                    <div className="tripInfo">
                        <span>Tổng tiền:</span>
                        <div className="rightInfo">
                            <span>{data.total.toLocaleString('vi-VN')}VND</span>
                        </div>
                    </div>
                    <div className="tripInfo">
                        <span>Phương thức thanh toán:</span>
                        <div className="rightInfo">
                            <span>{data.order.kindPay}</span>
                        </div>
                    </div>
                    <div className="tripInfo">
                        <span>Trạng thái:</span>
                        <div className="rightInfo">
                            {data.order.status === 1 ? (
                                <span>Đã thanh toán</span>
                            ) : (
                                <span>Chưa thanh toán</span>
                            )}
                        </div>
                    </div>
                    <div className="tripInfo">
                        <span>Email liên hệ:</span>
                        <div className="rightInfo">
                            <span>{data.order.user.email}</span>
                        </div>
                    </div>
                    <div className="text">
                        <p>Chúng tôi đã gửi một email chứa thông tin giao dịch trên. Vui lòng kiểm tra email và lưu trữ nó, khi lên xe quý khách vui lòng xuất trình email đã gửi cho nhân viên soát vé</p>
                    </div>
                    <button className="btn back"><Link to="/">Trở về</Link></button>
                </div>
            </div>
            )}
            
        </section>
    )
}
export default Paysuccess