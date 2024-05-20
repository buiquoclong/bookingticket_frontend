import React, {useState, useEffect} from "react";

import "./Paysuccess.scss";
import success from "../../Assets/img/success.png";
import { Link, useLocation } from 'react-router-dom';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';


const Paysuccess = () =>{
    const location = useLocation();
    const { bookingId, kind } = location.state || {};
    console.log(kind)
    const [data, setData] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    // const orderId = 1;
    console.log("bookingId", bookingId)
    
    // const [orders, setsetOrders] = useState([]);

    useEffect(() => {
        // Call the API to fetch cities
        fetchBookingDetail();
        fetchBooking();
    }, [bookingId]);

    const fetchBookingDetail = async () => {
        fetch(`http://localhost:8081/api/booking_detail/booking/${bookingId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const fetchBooking = async () => {
        fetch(`http://localhost:8081/api/booking/${bookingId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBookingData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return(
        <section className="main container section">
            {bookingData &&
            <div className="paySuccess">
                <div className="imgsucces">
                    <CheckCircleSharpIcon className="icon"/>              
                </div>
                <div className="content">
                    <div className="titlePay">Mua vé thành công</div>
                    <div className="text">Chúng tôi đã gửi thông tin vé về địa chỉ email {bookingData.email}. Vui lòng kiểm tra lại</div>
                </div>
                <div className="detailbooking">
                    <div className="title">THÔNG TIN MUA VÉ</div>
                    <div className="info">
                        <div className="infoBooking">
                            <div className="userInfo">
                                <div className="userline">
                                    <span className="titleuser">Họ và tên:</span>
                                    <span className="text">{bookingData.userName}</span>
                                </div>
                                <div className="userline">
                                    <span className="titleuser">Số điện thoại:</span>
                                    <span className="text">{bookingData.phone}</span>
                                </div>
                                <div className="userline">
                                    <span className="titleuser">Email:</span>
                                    <span className="text">{bookingData.email}</span>
                                </div>
                            </div>
                            <div className="PayInfo">
                                <div className="payline">
                                    <span className="titlepay">Tổng giá vé:</span>
                                    <span className="text">{bookingData.total}</span>
                                </div>
                                <div className="payline">
                                    <span className="titlepay">Phương thức thanh toán:</span>
                                    <span className="text">{bookingData.kindPay}</span>
                                </div>
                                <div className="payline">
                                    <span className="titlepay">Trang thái:</span>
                                    {bookingData.isPaid === 1 ? (
                                        <span className="text">Thanh toán thành công</span>
                                    ) : (
                                        <span className="text">Chưa thanh toán</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="devide"></div>
                    <div className="infoTicket">
                        {kind === "Một chiều" && (
                            <div className="detailBoooking">
                                {data &&
                                    data.map(detail => (
                                        <div className="infoBookingTicket" key={detail.id}>
                                            <h3>Mã vé: {detail.id}</h3>
                                            <div className="lineInfo">
                                                <span>Tuyến:</span>
                                                <div className="rightInfo">
                                                    <span>{detail.trip.route.name}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Loại xe:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.trip.vehicle.kindVehicle.name}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Ngày:</span>
                                                    <div className="rightInfo">
                                                        <span>{formatDate(detail.trip.dayStart)}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Thời gian:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.trip.timeStart.slice(0, 5)}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Số ghế:</span>
                                                    <div className="seatInfo">
                                                        <span>{detail.seatName}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Giá:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.price.toLocaleString('vi-VN')}VND</span>
                                                    </div>
                                                </div>
                                    </div>
                                        
                                    ))
                                }
                            </div>
                        )}
                        
                        {kind === "Khứ hồi" && (
                            <div className="detailBoooking">
                                {data &&
                                    data.map(detail => (
                                        <div className="infoBookingTicket" key={detail.id}>
                                            <h3>Mã vé: {detail.id}</h3>
                                            <div className="lineInfo">
                                                <span>Tuyến:</span>
                                                <div className="rightInfo">
                                                    <span>{detail.trip.route.name}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Loại xe:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.trip.vehicle.kindVehicle.name}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Ngày:</span>
                                                    <div className="rightInfo">
                                                        <span>{formatDate(detail.trip.dayStart)}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Thời gian:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.trip.timeStart.slice(0, 5)}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Số ghế:</span>
                                                    <div className="seatInfo">
                                                        <span>{detail.seatName}</span>
                                                    </div>
                                                </div>
                                                <div className="lineInfo">
                                                    <span>Giá:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.price.toLocaleString('vi-VN')}VND</span>
                                                    </div>
                                                </div>
                                    </div>
                                        
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className="devide"></div>
                    <div className="backhome">
                        <Link to="/"><button className="btn backhomebtn">Trở về</button></Link>
                    </div>
                </div>
            </div>
            }

                    {/* {kind === "Một chiều" && (
                        <div>
                            {data &&
                                data.map(detail => (
                                    <div className="payContent" key={detail.id}>
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
                                                        <span>{detail.trip.route.name}</span>
                                                    </div>
                                                </div>
                                                <div className="tripInfo">
                                                    <span>Ngày đi:</span>
                                                    <div className="rightInfo">
                                                        <span>{formatDate(detail.trip.dayStart)}</span>
                                                    </div>
                                                </div>
                                                <div className="tripInfo">
                                                    <span>Giờ khởi hành:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.trip.timeStart.slice(0, 5)}</span>
                                                    </div>
                                                </div>
                                                <div className="tripInfo">
                                                    <span>Loại xe/ Biến số:</span>
                                                    <div className="rightInfo">
                                                        <span>{detail.trip.vehicle.kindVehicle.name}/ {detail.trip.vehicle.vehicleNumber}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tripInfo">
                                                <span>Mã vé:</span>
                                                <div className="rightInfo">
                                                    <span>{detail.id}</span>
                                                </div>
                                            </div>
                                            <div className="seatInfo">
                                                <span>Ghế đã đặt: </span>
                                                <div className="rightInfo">
                                                    <span>{detail.seatName}</span>
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Tổng tiền:</span>
                                                <div className="rightInfo">
                                                    <span>{detail.booking.total.toLocaleString('vi-VN')}VND</span>
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Phương thức thanh toán:</span>
                                                <div className="rightInfo">
                                                    <span>{detail.booking.kindPay}</span>
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Trạng thái:</span>
                                                <div className="rightInfo">
                                                    {detail.booking.isPaid === 1 ? (
                                                        <span>Đã thanh toán</span>
                                                    ) : (
                                                        <span>Chưa thanh toán</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Email liên hệ:</span>
                                                <div className="rightInfo">
                                                    <span>{detail.booking.email}</span>
                                                </div>
                                            </div>
                                            <div className="text">
                                                <p>Chúng tôi đã gửi một email chứa thông tin giao dịch trên. Vui lòng kiểm tra email và lưu trữ nó, khi lên xe quý khách vui lòng xuất trình email đã gửi cho nhân viên soát vé</p>
                                            </div>
                                            <Link to="/"><button className="btn back">Trở về</button></Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        
                    )}
                    {kind === "Khứ hồi" && (
                        <div className="flex" style={{gap:"1rem"}}>
                            
                        {data &&
                            data.map((detail, index) => (
                            <div className="payContent" key={detail.id}>
                                <div className="imgsucces">
                                    <img src={success} alt="success" />
                                </div>
                                <div className="content">
                                    <div className="titlePay">Thành công</div>
                                    {detail.roundTrip === 1 ? (
                                        <div>Thông tin chi tiết lượt về</div>
                                    ) : (
                                        <div>Thông tin chi tiết lượt đi</div>
                                    )}
                                </div>
                                <div className="ticketInfo">
                                <div className="tripLabel">
                                    <div className="tripInfo">
                                        <span>Tuyến đi:</span>
                                        <div className="rightInfo">
                                            <span>{detail.trip.route.name}</span>
                                        </div>
                                    </div>
                                    <div className="tripInfo">
                                        <span>Ngày đi:</span>
                                        <div className="rightInfo">
                                            <span>{formatDate(detail.trip.dayStart)}</span>
                                        </div>
                                    </div>
                                    <div className="tripInfo">
                                        <span>Giờ khởi hành:</span>
                                        <div className="rightInfo">
                                            <span>{detail.trip.timeStart.slice(0, 5)}</span>
                                        </div>
                                    </div>
                                    <div className="tripInfo">
                                        <span>Loại xe/ Biến số:</span>
                                        <div className="rightInfo">
                                            <span>{detail.trip.vehicle.kindVehicle.name}/ {detail.trip.vehicle.vehicleNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tripInfo">
                                    <span>Mã vé:</span>
                                    <div className="rightInfo">
                                        <span>{detail.id}</span>
                                    </div>
                                </div>
                                <div className="seatInfo">
                                    <span>Ghế đã đặt: </span>
                                    <div className="rightInfo">
                                        <span>{detail.seatName}</span>
                                    </div>
                                </div>
                                {index === 0 &&(
                                    <div className="detail">
                                        <div className="tripInfo">
                                            <span>Tổng tiền:</span>
                                            <div className="rightInfo">
                                            <span>{detail.booking.total.toLocaleString('vi-VN')}VND</span>
                                            </div>
                                        </div>
                                        <div className="tripInfo">
                                            <span>Phương thức thanh toán:</span>
                                            <div className="rightInfo">
                                                <span>{detail.booking.kindPay}</span>
                                            </div>
                                        </div>
                                        <div className="tripInfo">
                                            <span>Trạng thái:</span>
                                            <div className="rightInfo">
                                                {detail.booking.isPaid === 1 ? <span>Đã thanh toán</span> : <span>Chưa thanh toán</span>}
                                            </div>
                                        </div>
                                        <div className="tripInfo">
                                            <span>Email liên hệ:</span>
                                            <div className="rightInfo">
                                                <span>{detail.booking.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                )} 
                                
                                <div className="text">
                                    <p>Chúng tôi đã gửi một email chứa thông tin giao dịch trên. Vui lòng kiểm tra email và lưu trữ nó, khi lên xe quý khách vui lòng xuất trình email đã gửi cho nhân viên soát vé</p>
                                </div>
                                {index === 0 &&<Link to="/"><button className="btn back">Trở về</button></Link>}
                                </div>
                            </div>
                            ))
                        }
                        </div>
                    )} */}
            
            
            
        </section>
    )
}
export default Paysuccess