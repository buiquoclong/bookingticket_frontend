import React, {useState, useEffect} from "react";
import "../AdminPay/AdminPay.scss"
import success from "../../Assets/img/success.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminPay = () =>{
    
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
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [phone, setPhone] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');

    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");

    // Xử lý chọn nhập nơi đón
    const handleSelectChange = (event) => {
        setShowLocationInput(event.target.value === 'Yes');
    };
    // Xử lý chọn nhập nơi đón cho chuyến về
    const handleSelectRetrunChange = (event) => {
        setShowLocationRetrunInput(event.target.value === 'Yes');
    };

    // Xử lý input ghi chú
    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    // Xử lý input nơi đón
    const handlePickupLocationChange = (event) => {
        setPickupLocation(event.target.value);
    };

    // Xử lý input ghi chú cho chuyến về
    const handleNoteReturnChange = (event) => {
        setNoteReturn(event.target.value);
    };

    // Xử lý input nơi đón cho chuyến về
    const handlePickupLocationReturnChange = (event) => {
        setPickupLocationReturn(event.target.value);
    };

    // Xử lý khi input tên người dùng thay đổi
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    // Xử lý thay đổi cho input số điện thoại
    const handlePhoneChange = (event) => {
        // setPhone(event.target.value);
        const phoneNumber = event.target.value;
        const phonePattern = /^(0\d{9,10})$/; // Biểu thức chính quy kiểm tra số điện thoại
        
        // Kiểm tra xem số điện thoại nhập vào có khớp với biểu thức chính quy không
        if (!phonePattern.test(phoneNumber)) {
            setPhoneErrorMessage("Số điện thoại không hợp lệ.");
        } else {
            setPhoneErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
        }
        setPhone(phoneNumber);
    };

    // Xử lý thay đổi cho input email
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

    const handlePayment = () => {
        let missingInfo = [];
        if (!userName) {
            missingInfo.push("Họ và tên");
        } 
        if (!phone) {
            missingInfo.push("Số điện thoại");
        } else if (phoneErrorMessage) { // Kiểm tra nếu có errorMessage cho phone
            toast.error(phoneErrorMessage); // Hiển thị errorMessage nếu có
            return; // Dừng xử lý tiếp theo nếu có lỗi
        }
        if (!email) {
            missingInfo.push("Email");
        } else if (emailErrorMessage) { // Kiểm tra nếu có errorMessage cho email
            toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
            return; // Dừng xử lý tiếp theo nếu có lỗi
        }
        if (missingInfo.length > 0) {
            const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
            toast.error(message);
        } else {
            if (!isChecked) {
                toast.error('Vui lòng chấp nhận các điều khoản.');
            } else {
                setShowPaymentPopup(true);
            }
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
        // const userId = sessionStorage.getItem("userId");
        if (userId) {
        // Nếu có userId, thực hiện gọi API để lấy thông tin người dùng
        fetch(`http://localhost:8081/api/user/${userId}`)
            .then((response) => response.json())
            .then((userData) => {
            // Cập nhật thông tin người dùng vào các trường nhập liệu
            setUserName(userData.name);
            setPhone(userData.phone);
            setEmail(userData.email);
            })
            .catch((error) => console.error("Error fetching user data:", error));
        }
    },[kind, tripId, tripIdReturn]);

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
        try {
            // Gửi yêu cầu để lấy danh sách các ghế đã đặt cho chuyến đi
            const responseTrip = await fetch(`http://localhost:8081/api/seat_reservation/trip/${tripId}`);
            const reservedSeatsTrip = await responseTrip.json();

            // Kiểm tra từng seatId trong selectedSeatIds
            const isAnySeatBookedTrip = selectedSeatIds.some(seatId => {
                // Kiểm tra xem seatId có trong danh sách ghế đã đặt cho chuyến đi không
                return reservedSeatsTrip.some(reservedSeat => reservedSeat.seat.id === seatId);
            });

            // Nếu là chuyến đi đầu tiên (một chiều) và bất kỳ ghế nào đã được đặt
            if (kind === "Một chiều" && isAnySeatBookedTrip) {
                // Hiển thị thông báo và không tiếp tục quá trình tạo hóa đơn
                toast.error('Một hoặc nhiều ghế đã được đặt, vui lòng chọn ghế khác.');
                return;
            }

            // Nếu là chuyến đi cuối cùng trong chuyến khứ hồi và bất kỳ ghế nào đã được đặt
            if (kind === "Khứ hồi" && isAnySeatBookedTrip) {
                // Gửi yêu cầu để lấy danh sách các ghế đã đặt cho chuyến về
                const responseTripReturn = await fetch(`http://localhost:8081/api/seat_reservation/trip/${tripIdReturn}`);
                const reservedSeatsTripReturn = await responseTripReturn.json();

                // Kiểm tra từng seatId trong selectedSeatIdsReturn
                const isAnySeatBookedTripReturn = selectedSeatIdsReturn.some(seatId => {
                    // Kiểm tra xem seatId có trong danh sách ghế đã đặt cho chuyến về không
                    return reservedSeatsTripReturn.some(reservedSeat => reservedSeat.seat.id === seatId);
                });

                // Nếu bất kỳ ghế nào đã được đặt cho cả chuyến đi và chuyến về
                if (isAnySeatBookedTripReturn) {
                    // Hiển thị thông báo và không tiếp tục quá trình tạo hóa đơn
                    toast.error('Một hoặc nhiều ghế đã được đặt, vui lòng chọn ghế khác.');
                    return;
                }
            }

            if (kind === "Một chiều") {
                const bookingData = {
                    userName: userName,
                    email: email,
                    phone: phone,
                    total: totalPrice,
                    kindPay: "Thanh toán bằng tiền mặt",
                    isPaid: 1,
                    roundTrip: 0,
                };
                
                // Chỉ thêm userId nếu nó có giá trị
                if (userId) {
                    bookingData.userId =  userId ;
                }
    
                try {
                    const response = await fetch(`http://localhost:8081/api/booking`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bookingData)
                    });
    
                    if (response.ok) {
                        toast.success("Đơn hàng đã được tạo!");
                        const createdBooking = await response.json(); // Lấy thông tin của hóa đơn vừa tạo
                        await createBookingDetail(createdBooking.id, tripId, 0, selectedSeatIds.length, selectedSeatsNames, totalPrice, pickupLocation, note);
                        updateTripEmptySeat(tripId, data.route.id, data.vehicle.id, data.dayStart, data.timeStart, data.price, data.driver.id, data.emptySeat, selectedSeatIds);
                        insertSeatReservation(selectedSeatIds, tripId, createdBooking.id);
                        navigate("/admin/book-cash-payment", { state: { bookingId: createdBooking.id, kind: kind } });
                    } else {
                        throw new Error('Something went wrong with the order creation.');
                    }
                } catch (error) {
                    console.error("Error creating order:", error);
                    toast.error("Failed to create order.");
                }
            } else if (kind === "Khứ hồi") {
                const bookingData = {
                    userName: userName,
                    email: email,
                    phone: phone,
                    total: totalAmount,
                    kindPay:"Thanh toán bằng tiền mặt",
                    isPaid: 0,
                    roundTrip: 1,
                };
                // Chỉ thêm userId nếu nó có giá trị
                if (userId) {
                    bookingData.userId =  userId ;
                }
                // Tạo hóa đơn lượt đi
                try {
                    const response = await fetch(`http://localhost:8081/api/booking`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bookingData)
                    });
    
                    if (response.ok) {
                        toast.success("Đơn hàng đã được tạo!");
                        const createdBooking = await response.json(); // Lấy thông tin của hóa đơn vừa tạo
                        // tạo chi tiết và upadte lượt đi
                        await createBookingDetail(createdBooking.id, tripId, 0, selectedSeatIds.length, selectedSeatsNames, totalPrice, pickupLocation, note);
                        updateTripEmptySeat(tripId, data.route.id, data.vehicle.id, data.dayStart, data.timeStart, data.price, data.driver.id, data.emptySeat, selectedSeatIds);
                        insertSeatReservation(selectedSeatIds, tripId, createdBooking.id);
                        // tạo chi tiết và update lượt về
                        await createBookingDetail(createdBooking.id, tripIdReturn, 1, selectedSeatIdsReturn.length, selectedSeatsNamesReturn, totalPriceReturn, pickupLocationReturn, noteReturn);
                        updateTripEmptySeat(tripIdReturn, dataReturn.route.id, dataReturn.vehicle.id, dataReturn.dayStart, dataReturn.timeStart, dataReturn.price, dataReturn.driver.id, dataReturn.emptySeat, selectedSeatIdsReturn);
                        insertSeatReservation(selectedSeatIdsReturn, tripIdReturn, createdBooking.id);
                        navigate("/admin/book-cash-payment", { state: { bookingId: createdBooking.id, kind: kind } });
                    } else {
                        throw new Error('Something went wrong with the order creation.');
                    }
                } catch (error) {
                    console.error("Error creating order:", error);
                    toast.error("Lỗi tạo hóa đơn lượt đi.");
                }
                
    
            }

        } catch (error) {
            console.error('Error checking seat status:', error);
            toast.error('Lỗi kiểm tra trạng thái ghế.');
        }
    };

    // Tạo chi tiết hóa đơn
    const createBookingDetail = async (bookingId, trip,roundTrip, numSeat, seatNames, total, pickup, note) => {
        const bookingDetailData = {
            bookingId: bookingId , // Sử dụng orderId của hóa đơn chính
            tripId: trip,
            roundTrip: roundTrip,
            quantity: numSeat, // Số ghế được chọn
            seatName: seatNames,// Giá của trip
            price: total, // Tổng tiền
            pointCatch: pickup || "Tại nhà xe",
            note: note || "Không có ghi chú"
        };
    
        try {
            const response = await fetch(`http://localhost:8081/api/booking_detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetailData)
            });
    
            if (!response.ok) {
                throw new Error('Something went wrong with the order detail creation.');
            }
        } catch (error) {
            console.error("Error creating order detail:", error);
            toast.error("Failed to create order detail.");
        }
    };
    

    // Update lại số ghế trống
    const updateTripEmptySeat = async (trip, route, vehicleId, daystart, timestart, price, driver, emptyseat, selectedSeatIds) => {
        const newEmptySeat = emptyseat - selectedSeatIds.length;
        const tripUpdate = {
            routeId: route ,
            vehicleId: vehicleId,
            dayStart: daystart,
            timeStart: timestart,
            price: price,
            driverId: driver,
            emptySeat: newEmptySeat
        };
        try {
            // Gửi yêu cầu cập nhật số ghế trống
            const updateResponse = await fetch(`http://localhost:8081/api/trip/${trip}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripUpdate),
            });
    
            if (!updateResponse.ok) {
                throw new Error('Failed to update trip empty seat');
            }
    
            console.log('Trip empty seat updated successfully');
        } catch (error) {
            console.error('Error updating trip empty seat:', error);
        }
    };
    

    
    // Insert vào ghế đã đặt 
    const insertSeatReservation = async (selectedSeatIds, trip, bookingId) => {
    
        try {
            // Lặp qua từng id của ghế được chọn
            for (const seatId of selectedSeatIds) {
                // Tạo dữ liệu mới cho mỗi ghế được đặt
                const seatReservationData = {
                    bookingId:  bookingId ,
                    tripId: trip,
                    seatId: seatId
                };
    
                // Gửi yêu cầu để thêm ghế đã đặt vào bảng SeatBooked
                const response = await fetch(`http://localhost:8081/api/seat_reservation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(seatReservationData),
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    return(
        <div className="main-container">
            {showPaymentPopup && (
                <div className="modal">
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
                                        <button className="btn trasau" onClick={handleChoosePayment}>Tiền mặt</button>
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
                                <h3>Thông tin chuyến đi</h3>
                                <div className="lineInfo">
                                    <span>Tuyến:</span>
                                    <div className="rightInfo">
                                        <span>{data.route.name}</span>
                                    </div>
                                </div>
                                <div className="lineInfo">
                                    <span>Loại xe:</span>
                                        <div className="rightInfo">
                                            <span>{data.vehicle.kindVehicle.name}</span>
                                        </div>
                                    </div>
                                    <div className="lineInfo">
                                        <span>Ngày:</span>
                                        <div className="rightInfo">
                                            <span>{formatDate(data.dayStart)}</span>
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
                                                <button className="btn cancle"><Link to="/admin">Hủy</Link></button>
                                                <button className="btn pay" onClick={handlePayment}>Thanh toán</button>
                                            </div>
                                        </div>
                                        )}
                                        <div>
                                            <div className=" infoUser" style={{height:"15rem"}}>
                                                    <h3>Thông tin người đặt</h3>
                                                    <div className="lineInfo">
                                                        <span>Họ và tên<span style={{color:"red"}}>*</span>:</span>
                                                        <div className="infoInput" >
                                                            <input type="text" className="info" placeholder="Nhập họ và tên" value={userName} onChange={handleUserNameChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Số điện thoại<span style={{color:"red"}}>*</span>:</span>
                                                        <div className="infoInput" >
                                                            <input type="text" className="info" placeholder="Nhập số điện thoại" value={phone}  onChange={handlePhoneChange}/>
                                                            {phoneErrorMessage && <p style={{ color: "red", lineHeight:"2" }}>{phoneErrorMessage}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Email<span style={{color:"red"}}>*</span>:</span>
                                                        <div className="infoInput" >
                                                            <input type="text" className="info" placeholder="Nhập Email" value={email} onChange={handleEmailChange}/>
                                                            {emailErrorMessage && <p style={{ color: "red", lineHeight:"2" }}>{emailErrorMessage}</p>}
                                                        </div>
                                                    </div>
                                            </div>
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
                                                            <span>{data.vehicle.kindVehicle.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Ngày:</span>
                                                        <div className="rightInfo">
                                                            <span>{formatDate(data.dayStart)}</span>
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
                                                </div>
                                            )}
                                                <div className=" infoUser" style={{height:"15rem", marginTop:"1rem"}}>
                                                    <h3>Thông tin người đặt</h3>
                                                    <div className="lineInfo">
                                                        <span>Họ và tên<span style={{color:"red"}}>*</span>:</span>
                                                        <div  className="infoInput" >
                                                            <input type="text" className="info" placeholder="Nhập họ và tên" value={userName} onChange={handleUserNameChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Số điện thoại<span style={{color:"red"}}>*</span>:</span>
                                                        <div className="infoInput">
                                                            <input type="text" className="info" placeholder="Nhập số điện thoại" value={phone}  onChange={handlePhoneChange}/>
                                                            {phoneErrorMessage && <p style={{ color: "red", lineHeight:"2" }}>{phoneErrorMessage}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Email<span style={{color:"red"}}>*</span>:</span>
                                                        <div className="infoInput" >
                                                            <input type="email" className="info" placeholder="Nhập Email" value={email} onChange={handleEmailChange}/>
                                                            {emailErrorMessage && <p style={{ color: "red", lineHeight:"2" }}>{emailErrorMessage}</p>}
                                                        </div>
                                                    </div>
                                                </div>
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
                                                            <span>{dataReturn.vehicle.kindVehicle.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lineInfo">
                                                        <span>Ngày:</span>
                                                        <div className="rightInfo">
                                                            <span>{formatDate(dataReturn.dayStart)}</span>
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
                                                            <button className="btn cancle"><Link to="/admin">Hủy</Link></button>
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

            
            
        </div>
    )
}
export default AdminPay