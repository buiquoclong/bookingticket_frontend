import React, {useState, useEffect} from "react";

import "./BookingTicket.scss";

import success from "../../Assets/img/success.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookingTicket = () =>{
    
    const location = useLocation();
    const { tripId, selectedSeatsNames, selectedSeatIds, totalPrice, tripIdReturn, selectedSeatsNamesReturn, selectedSeatIdsReturn, totalPriceReturn, kind } = location.state || {};
    const totalAmount = totalPrice + totalPriceReturn;
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [showLocationRetrunInput, setShowLocationRetrunInput] = useState(false);
    
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [note, setNote] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    
    const [noteReturn, setNoteReturn] = useState("");
    const [pickupLocationReturn, setPickupLocationReturn] = useState("");
    
    const [data, setData] = useState(null);
    const [dataReturn, setDataReturn] = useState(null);

    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        setShowLocationInput(event.target.value === 'Yes');
    };
    const handleSelectRetrunChange = (event) => {
        setShowLocationRetrunInput(event.target.value === 'Yes');
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const handlePickupLocationChange = (event) => {
        setPickupLocation(event.target.value);
    };

    const handleNoteReturnChange = (event) => {
        setNoteReturn(event.target.value);
    };

    const handlePickupLocationReturnChange = (event) => {
        setPickupLocationReturn(event.target.value);
    };

    const handlePayment = () => {
        if (!isChecked) {
            toast.error('Vui lòng chấp nhận các điều khoản.');
        } else {
            setShowPaymentPopup(true);
        }
    };

    console.log("ui:  ",sessionStorage.getItem("userId"))

    useEffect(() => {
        // Call the API to fetch cities
        if (kind === "Một chiều") {
            fetchTripInfo();
        } else if (kind === "Khứ hồi") {
            fetchTripInfo();
            fetchTripReturnInfo();
        }
    });

    const fetchTripInfo = async () => {
        
    console.log("Selected Seat IDs:", selectedSeatIds);
        try {
            const response = await fetch(`http://localhost:8081/api/trip/${tripId}`);
            const data = await response.json();
            setData(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching:", error);
        }
    };
    const fetchTripReturnInfo = async () => {
        
        console.log("Selected Seat IDs:", selectedSeatIds);
            try {
                const response = await fetch(`http://localhost:8081/api/trip/${tripIdReturn}`);
                const dataReturn = await response.json();
                setDataReturn(dataReturn);
                console.log(dataReturn)
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };

    const handleChoosePayment = async () => {
        if (kind === "Một chiều") {
            
            const orderData = {
                
                user:{id:sessionStorage.getItem("userId")},
                dayBook: new Date().toISOString(),
                total: totalPrice,
                kindPay:"Thanh toán trả sau",
                status: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            try {
                const response = await fetch(`http://localhost:8081/api/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    toast.success("Đơn hàng đã được tạo!");
                    const createdOrder = await response.json(); // Lấy thông tin của hóa đơn vừa tạo
                    // Tạo chi tiết hóa đơn với orderId là id của hóa đơn vừa tạo
                    // await createOrderDetail(createdOrder.id, selectedSeatIds.length, selectedSeatsNames, data.price, totalPrice);
                    await createOrderDetail(createdOrder.id, tripId, selectedSeatIds.length, selectedSeatsNames, data.price, totalPrice, pickupLocation, note);
                    updateVehicleEmptySeat(data.vehicle.id, selectedSeatIds);
                    updateSeatStatus(selectedSeatIds);
                    insertSeatBooked(selectedSeatIds, tripId);
                    // navigate("/pay-success");
                    navigate("/pay-success", { state: { orderId: createdOrder.id, kind: kind } });
                } else {
                    throw new Error('Something went wrong with the order creation.');
                }
            } catch (error) {
                console.error("Error creating order:", error);
                toast.error("Failed to create order.");
            }
        } else if (kind === "Khứ hồi") {
            const fullDateTimeReturn = `${dataReturn.dayStart}T${dataReturn.timeStart}`;
            const orderData = {
                
                user:{id:sessionStorage.getItem("userId")},
                dayBook: new Date().toISOString(),
                total: totalAmount,
                kindPay:"Thanh toán trả sau",
                status: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            // Tạo hóa đơn lượt đi
            try {
                const response = await fetch(`http://localhost:8081/api/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    toast.success("Đơn hàng đã được tạo!");
                    const createdOrder = await response.json(); // Lấy thông tin của hóa đơn vừa tạo
                    // Tạo chi tiết hóa đơn với orderId là id của hóa đơn vừa tạo
                    // await createOrderDetail(createdOrder.id, selectedSeatIds.length, selectedSeatsNames, data.price, totalPrice);
                    // tạo chi tiết và upadte lượt đi
                    await createOrderDetail(createdOrder.id, tripId, selectedSeatIds.length, selectedSeatsNames, data.price, totalPrice, pickupLocation, note);

                    updateVehicleEmptySeat(data.vehicle.id, selectedSeatIds);
                    updateSeatStatus(selectedSeatIds);
                    insertSeatBooked(selectedSeatIds, tripId);
                    // tạo chi tiết và update lượt về
                    await createOrderDetail(createdOrder.id, tripIdReturn, selectedSeatIdsReturn.length, selectedSeatsNamesReturn, dataReturn.price, totalPriceReturn, pickupLocationReturn, noteReturn);
                    
                    updateVehicleEmptySeat(dataReturn.vehicle.id, selectedSeatIdsReturn);
                    updateSeatStatus(selectedSeatIdsReturn);
                    insertSeatBooked(selectedSeatIdsReturn, tripIdReturn);

                    navigate("/pay-success", { state: { orderId: createdOrder.id, kind: kind } });
                } else {
                    throw new Error('Something went wrong with the order creation.');
                }
            } catch (error) {
                console.error("Error creating order:", error);
                toast.error("Lỗi tọa hóa đơn lượt đi.");
            }
            

        }
        
    };

    // Tạo chi tiết hóa đơn
    const createOrderDetail = async (orderId, trip, numSeat, seatNames, price, total, pickup, note) => {
        console.log("orderID", orderId)
        const orderDetailId = generateOrderId();
        const orderDetailData = {
            id: orderDetailId,
            order:{id: orderId }, // Sử dụng orderId của hóa đơn chính
            trip:{id:trip},
            numSeat: numSeat, // Số ghế được chọn
            seatName: seatNames, // Tên của các ghế được chọn
            price: price, // Giá của trip
            total: total, // Tổng tiền
            pointCatch: pickup || "Tại nhà xe",
            note: note || "Không có ghi chú",
            createdAt: new Date().toISOString() // Thời gian tạo
        };
    
        try {
            const response = await fetch(`http://localhost:8081/api/orderdetail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetailData)
            });
    
            if (!response.ok) {
                throw new Error('Something went wrong with the order detail creation.');
            }
        } catch (error) {
            console.error("Error creating order detail:", error);
            toast.error("Failed to create order detail.");
        }
    };
    
    // Random mã vé
    const generateOrderId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 8;
        let ticketCode = '';
        for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        ticketCode += characters.charAt(randomIndex);
        }
        return ticketCode;
    };

    // Update lại số ghế trống
    const updateVehicleEmptySeat = async (vehicleId, selectedSeatIds) => {
        try {
            // Lấy thông tin chi tiết của phương tiện
            const response = await fetch(`http://localhost:8081/api/vehicle/${vehicleId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch vehicle details');
            }
            const vehicleData = await response.json();
    
            // Tính toán số ghế trống mới
            const newEmptySeat = vehicleData.emptySeat - selectedSeatIds.length;
    
            // Cập nhật lại trường emptySeat và giữ nguyên các trường khác
            vehicleData.emptySeat = newEmptySeat;
    
            // Gửi yêu cầu cập nhật số ghế trống
            const updateResponse = await fetch(`http://localhost:8081/api/vehicle/${vehicleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
            });
    
            if (!updateResponse.ok) {
                throw new Error('Failed to update vehicle empty seat');
            }
    
            console.log('Vehicle empty seat updated successfully');
        } catch (error) {
            console.error('Error updating vehicle empty seat:', error);
        }
    };
    

    // Update lại status ghế
    const updateSeatStatus = async (selectedSeatIds) => {
        try {
            // Lặp qua từng id của ghế được chọn
            for (const seatId of selectedSeatIds) {
                // Lấy thông tin chi tiết của ghế
                const response = await fetch(`http://localhost:8081/api/seat/${seatId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch seat details for seatId ${seatId}`);
                }
                const seatData = await response.json();
    
                // Cập nhật trạng thái của ghế từ 0 sang 1
                seatData.status = 1;
    
                // Gửi yêu cầu cập nhật trạng thái ghế
                const updateResponse = await fetch(`http://localhost:8081/api/seat/${seatId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(seatData),
                });
    
                if (!updateResponse.ok) {
                    throw new Error(`Failed to update seat status for seatId ${seatId}`);
                }
    
                console.log(`Seat status updated successfully for seatId ${seatId}`);
            }
    
        } catch (error) {
            console.error('Error updating seat status:', error);
        }
    };
    
    // Insert vào ghế đã đặt 
    const insertSeatBooked = async (selectedSeatIds, tripId) => {
        const userId = sessionStorage.getItem('userId');
    
        try {
            // Lặp qua từng id của ghế được chọn
            for (const seatId of selectedSeatIds) {
                // Tạo dữ liệu mới cho mỗi ghế được đặt
                const seatBookedData = {
                    seat: { id: seatId }, // Id của ghế
                    trip: { id: tripId }, // Id của chuyến đi
                    user: { id: userId }, // Id của người dùng
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString() // Thời gian tạo
                };
    
                // Gửi yêu cầu để thêm ghế đã đặt vào bảng SeatBooked
                const response = await fetch(`http://localhost:8081/api/seatbooked`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(seatBookedData),
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to insert seat booked for seatId ${seatId}`);
                }
    
                console.log(`Seat booked inserted successfully for seatId ${seatId}`);
            }
    
        } catch (error) {
            console.error('Error inserting seat booked:', error);
        }
    };
    
    

    return(
        <section className="main container section">
            {showPaymentPopup && (
                <div class="modal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <button className="closePopup" onClick={() => setShowPaymentPopup(false)}></button>
                                <div className="payContent">
                                    <div className="imgsucces">
                                        <img src={success} alt="succes"/>
                                    </div>
                                    <div className="content">
                                        <div className="titlePay">Thanh toán</div>
                                        <div>Quý khách vui lòng lựa chọn phương thức thanh toán bên dưới để thanh toán và nhận vé</div>
                                    </div>
                                    <div className="payMent" style={{marginBottom:"1rem"}}>
                                        <button className="vnpay btn"><span style={{ color: "#ed3237" }}>VN</span><span style={{ color: "#0f62ac " }}>PAY</span></button>
                                        <button className="btn trasau" onClick={handleChoosePayment}>Trả sau</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


                            {kind === "Một chiều" && (
                                <div>
                                    <div className="bookingContent flex">
                                        {data && (
                                        <div className="infoTicket">
                                            <div className="lineInfo">
                                                <span>Tuyến:</span>
                                                <div className="rightInfo">
                                                    <span>{data.route.name}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Loại xe:</span>
                                                <div className="rightInfo">
                                                    <span>{data.vehicle.name}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Ngày:</span>
                                                <div className="rightInfo">
                                                    <span>{new Date(data.dayStart).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Thời gian:</span>
                                                <div className="rightInfo">
                                                    <span>{data.timeStart.slice(0, 5)}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Số ghế:</span>
                                                <div className="rightInfo">
                                                    <span>{selectedSeatsNames}</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Giá:</span>
                                                <div className="rightInfo">
                                                    <span>{totalPrice.toLocaleString('vi-VN')}VND</span>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Ghi chú:</span>
                                                <div >
                                                    <input type="text" className="Note" placeholder="Thêm ghi chú ở đây" onChange={handleNoteChange}/>
                                                </div>
                                            </div>
                                            <div className="lineInfo">
                                                <span>Chọn điểm đón:</span>
                                                <div className="selectChoose">
                                                    <select onChange={handleSelectChange}>
                                                        <option value="No">Không</option>
                                                        <option value="Yes">Có</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {showLocationInput && (
                                                <div className="lineInfo">
                                                    <span>Nơi đón:</span>
                                                    <div>
                                                        <input type="text" className="Note" placeholder="Nhập nơi đón ở đây" onChange={handlePickupLocationChange}/>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="policyCheckbox">
                                                <label className="chekcBox">
                                                    <span>
                                                        <span><input type="checkbox" className="checkbox-input" value="1" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/></span>
                                                        <span className="yes" style={{marginLeft:"10px"}}>Tôi chấp nhận với các điều khoản</span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="buttonList">
                                                <button className="btn cancle"><Link to="/">Hủy</Link></button>
                                                <button className="btn pay" onClick={handlePayment}>Thanh toán</button>
                                            </div>
                                        </div>
                                        )}
                                        <div className="policyInfo">
                                            <div className="titlePolicy">
                                                <h1><span>ĐIỀU KHOẢN &</span><span style={{color:"red"}}> LƯU Ý</span></h1>
                                            </div>
                                            <div className="devide"></div>
                                            <div className="contentPolicy">
                                                <div><span style={{color:"red"}}>(*)</span> Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất <span style={{color:"red", fontWeight:"600"}}>20 phút</span> để thực hiện đổi vé.</div>
                                                <div><span style={{color:"red"}}>(*)</span> Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/ đổi vé </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {kind === "Khứ hồi" && (
                                <div>
                                    <div className="bookingContent flex">
                                        <div>
                                            {data && (
                                                <div className="infoTicket" style={{height:"31rem"}}>
                                                    <h3>Thông tin lượt đi</h3>
                                                    <div className="lineInfo">
                                                        <span>Tuyến:</span>
                                                        <div className="rightInfo">
                                                            <span>{data.route.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Loại xe:</span>
                                                        <div className="rightInfo">
                                                            <span>{data.vehicle.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Ngày:</span>
                                                        <div className="rightInfo">
                                                            <span>{new Date(data.dayStart).toLocaleDateString('vi-VN')}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Thời gian:</span>
                                                        <div className="rightInfo">
                                                            <span>{data.timeStart.slice(0, 5)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Số ghế:</span>
                                                        <div className="rightInfo">
                                                            <span>{selectedSeatsNames}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Giá:</span>
                                                        <div className="rightInfo">
                                                            <span>{totalPrice.toLocaleString('vi-VN')}VND</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Ghi chú:</span>
                                                        <div >
                                                            <input type="text" className="Note" placeholder="Thêm ghi chú ở đây" onChange={handleNoteChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Chọn điểm đón:</span>
                                                        <div className="selectChoose">
                                                            <select onChange={handleSelectChange}>
                                                                <option value="No">Không</option>
                                                                <option value="Yes">Có</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {showLocationInput && (
                                                        <div className="lineInfo">
                                                            <span>Nơi đón:</span>
                                                            <div>
                                                                <input type="text" className="Note" placeholder="Nhập nơi đón ở đây" onChange={handlePickupLocationChange}/>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* <div className="policyCheckbox">
                                                        <label className="chekcBox">
                                                            <span>
                                                                <span><input type="checkbox" className="checkbox-input" value="1" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/></span>
                                                                <span className="yes" style={{marginLeft:"10px"}}>Tôi chấp nhận với các điều khoản</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="buttonList">
                                                        <button className="btn cancle"><Link to="/">Hủy</Link></button>
                                                        <button className="btn pay" onClick={handlePayment}>Thanh toán</button>
                                                    </div> */}
                                                </div>
                                            )}
                                            <div className="policyInfo">
                                            <div className="titlePolicy">
                                                <h1><span>ĐIỀU KHOẢN &</span><span style={{color:"red"}}> LƯU Ý</span></h1>
                                            </div>
                                            <div className="devide"></div>
                                            <div className="contentPolicy">
                                                <div><span style={{color:"red"}}>(*)</span> Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất <span style={{color:"red", fontWeight:"600"}}>20 phút</span> để thực hiện đổi vé.</div>
                                                <div><span style={{color:"red"}}>(*)</span> Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/ đổi vé </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div>
                                            {dataReturn && (
                                                <div className="infoTicket" style={{height:"31rem"}}>
                                                    <h3>Thông tin lượt về</h3>
                                                    <div className="lineInfo">
                                                        <span>Tuyến:</span>
                                                        <div className="rightInfo">
                                                            <span>{dataReturn.route.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Loại xe:</span>
                                                        <div className="rightInfo">
                                                            <span>{dataReturn.vehicle.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Ngày:</span>
                                                        <div className="rightInfo">
                                                            <span>{new Date(dataReturn.dayStart).toLocaleDateString('vi-VN')}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Thời gian:</span>
                                                        <div className="rightInfo">
                                                            <span>{dataReturn.timeStart.slice(0, 5)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Số ghế:</span>
                                                        <div className="rightInfo">
                                                            <span>{selectedSeatsNamesReturn}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Giá:</span>
                                                        <div className="rightInfo">
                                                            <span>{totalPriceReturn.toLocaleString('vi-VN')}VND</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Ghi chú:</span>
                                                        <div >
                                                            <input type="text" className="Note" placeholder="Thêm ghi chú ở đây" onChange={handleNoteReturnChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Chọn điểm đón:</span>
                                                        <div className="selectChoose">
                                                            <select onChange={handleSelectRetrunChange}>
                                                                <option value="No">Không</option>
                                                                <option value="Yes">Có</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {showLocationRetrunInput && (
                                                        <div className="lineInfo">
                                                            <span>Nơi đón:</span>
                                                            <div>
                                                                <input type="text" className="Note" placeholder="Nhập nơi đón ở đây" onChange={handlePickupLocationReturnChange}/>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* <div className="policyCheckbox">
                                                        <label className="chekcBox">
                                                            <span>
                                                                <span><input type="checkbox" className="checkbox-input" value="1" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/></span>
                                                                <span className="yes" style={{marginLeft:"10px"}}>Tôi chấp nhận với các điều khoản</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="buttonList">
                                                        <button className="btn cancle"><Link to="/">Hủy</Link></button>
                                                        <button className="btn pay" onClick={handlePayment}>Thanh toán</button>
                                                    </div> */}
                                                </div>
                                            )}
                                            <div className="policyInfo" style={{height:"22rem"}}>
                                                <div className="titlePolicy">
                                                    <h1><span>Chi tiết giá</span></h1>
                                                </div>
                                                <div className="devide"></div>
                                                    <div className="contentPolicy">
                                                        <div className="lineInfo">
                                                            <span>Tổng giá lượt đi:</span>
                                                            <div className="rightInfo">
                                                                <span>{totalPrice.toLocaleString('vi-VN')}VND</span>
                                                            </div>
                                                        </div>
                                                        <div className="lineInfo">
                                                        <span>Tổng giá lượt về:</span>
                                                        <div className="rightInfo">
                                                            <span>{totalPriceReturn.toLocaleString('vi-VN')}VND</span>
                                                        </div>
                                                        </div>
                                                        <div className="devide"></div>
                                                        <div className="lineInfo" style={{marginTop:".5rem"}}>
                                                            <span>Tổng tiền:</span>
                                                            <div className="rightInfo">
                                                                <span>{totalAmount.toLocaleString('vi-VN')}VND</span>
                                                            </div>
                                                        </div>
                                                        <div className="policyCheckbox">
                                                            <label className="chekcBox">
                                                                <span>
                                                                    <span><input type="checkbox" className="checkbox-input" value="1" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/></span>
                                                                    <span className="yes" style={{marginLeft:"10px"}}>Tôi chấp nhận với các điều khoản</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="buttonList">
                                                            <button className="btn cancle"><Link to="/">Hủy</Link></button>
                                                            <button className="btn pay" onClick={handlePayment}>Thanh toán</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            )}



            
                
            
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
        
    );
}
export default BookingTicket