import React, {useState, useEffect} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill}
from 'react-icons/bs'
import 
{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
from 'recharts';
import { GrLocation } from "react-icons/gr";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { HiFilter } from "react-icons/hi";
import "../AdminPaySuccess/AdminPaySuccess.scss"
import success from "../../Assets/img/success.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminPaySuccess() {
    const location = useLocation();
    const { orderId, kind } = location.state || {};
    console.log(kind)
    const [data, setData] = useState(null);
    // const orderId = 1;
    console.log("orderId", orderId)
    
    // const [orders, setsetOrders] = useState([]);

    useEffect(() => {
        // Call the API to fetch cities
        fetchOrderDetail();
    }, [orderId]);

    const fetchOrderDetail = async () => {
        fetch(`http://localhost:8081/api/order/${orderId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return (
    <main className='main-container'>
        {kind === "Một chiều" && (
                        <div>
                            {data &&
                                data.orderDetails.map(detail => (
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
                                                        <span>{new Date(detail.trip.dayStart).toLocaleDateString('vi-VN')}</span>
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
                                                        <span>{detail.trip.vehicle.name}/ {detail.trip.vehicle.vehicleNumber}</span>
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
                                                    <span>{detail.total.toLocaleString('vi-VN')}VND</span>
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Phương thức thanh toán:</span>
                                                <div className="rightInfo">
                                                    <span>{data.kindPay}</span>
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Trạng thái:</span>
                                                <div className="rightInfo">
                                                    {data.status === 1 ? (
                                                        <span>Đã thanh toán</span>
                                                    ) : (
                                                        <span>Chưa thanh toán</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="tripInfo">
                                                <span>Email liên hệ:</span>
                                                <div className="rightInfo">
                                                    <span>{data.user.email}</span>
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
                            data.orderDetails.map((detail, index) => (
                            <div className="payContent" key={detail.id}>
                                <div className="imgsucces">
                                    <img src={success} alt="success" />
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
                                            <span>{new Date(detail.trip.dayStart).toLocaleDateString('vi-VN')}</span>
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
                                            <span>{detail.trip.vehicle.name}/ {detail.trip.vehicle.vehicleNumber}</span>
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
                                            {/* Hiển thị tổng tiền chỉ khi index === 0 */}
                                            {index === 0 && <span>{detail.total.toLocaleString('vi-VN')}VND</span>}
                                            </div>
                                        </div>
                                        <div className="tripInfo">
                                            <span>Phương thức thanh toán:</span>
                                            <div className="rightInfo">
                                                <span>{data.kindPay}</span>
                                            </div>
                                        </div>
                                        <div className="tripInfo">
                                            <span>Trạng thái:</span>
                                            <div className="rightInfo">
                                                {data.status === 1 ? <span>Đã thanh toán</span> : <span>Chưa thanh toán</span>}
                                            </div>
                                        </div>
                                        <div className="tripInfo">
                                            <span>Email liên hệ:</span>
                                            <div className="rightInfo">
                                                {/* Hiển thị email chỉ khi index === 0 */}
                                                {index === 0 && <span>{data.user.email}</span>}
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
                    )}
    </main>
    )
}

export default AdminPaySuccess