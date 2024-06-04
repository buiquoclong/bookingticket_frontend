import React, {useState, useEffect} from "react";
import "./ResponsePay.scss";
import {  useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResponseSuccess  = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [dataReturn, setDataReturn] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    const totalAmount = bookingDetails.totalPrice + bookingDetails.totalPriceReturn;

    useEffect(() => {
        // Call the API to fetch cities
        if (bookingDetails.kind === "Một chiều") {
            fetchTripInfo();
        } else if (bookingDetails.kind === "Khứ hồi") {
            fetchTripInfo();
            fetchTripReturnInfo();
        }
    },[bookingDetails.kind, bookingDetails.tripId, bookingDetails.tripIdReturn]);
    const fetchTripInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/trip/${bookingDetails.tripId}`);
                const data = await response.json();
                setData(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        const fetchTripReturnInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:8081/api/trip/${bookingDetails.tripIdReturn}`);
                    const dataReturn = await response.json();
                    setDataReturn(dataReturn);
                    console.log(dataReturn)
                } catch (error) {
                    console.error("Error fetching:", error);
                }
            };


    const handleChoosePayment = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Gửi yêu cầu để lấy danh sách các ghế đã đặt cho chuyến đi
            const responseTrip = await fetch(`http://localhost:8081/api/seat_reservation/trip/${bookingDetails.tripId}`);
            const reservedSeatsTrip = await responseTrip.json();

            // Kiểm tra từng seatId trong selectedSeatIds
            const isAnySeatBookedTrip = bookingDetails.selectedSeatIds.some(seatId => {
                // Kiểm tra xem seatId có trong danh sách ghế đã đặt cho chuyến đi không
                return reservedSeatsTrip.some(reservedSeat => reservedSeat.seat.id === seatId);
            });

            // Nếu là chuyến đi đầu tiên (một chiều) và bất kỳ ghế nào đã được đặt
            if (bookingDetails.kind === "Một chiều" && isAnySeatBookedTrip) {
                // Hiển thị thông báo và không tiếp tục quá trình tạo hóa đơn
                toast.error('Một hoặc nhiều ghế đã được đặt, vui lòng chọn ghế khác.');
                return;
            }

            // Nếu là chuyến đi cuối cùng trong chuyến khứ hồi và bất kỳ ghế nào đã được đặt
            if (bookingDetails.kind === "Khứ hồi" && isAnySeatBookedTrip) {
                // Gửi yêu cầu để lấy danh sách các ghế đã đặt cho chuyến về
                const responseTripReturn = await fetch(`http://localhost:8081/api/seat_reservation/trip/${bookingDetails.tripIdReturn}`);
                const reservedSeatsTripReturn = await responseTripReturn.json();

                // Kiểm tra từng seatId trong selectedSeatIdsReturn
                const isAnySeatBookedTripReturn = bookingDetails.selectedSeatIdsReturn.some(seatId => {
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

            if (bookingDetails.kind === "Một chiều") {
                const bookingData = {
                    userName: bookingDetails.userName,
                    email: bookingDetails.email,
                    phone: bookingDetails.phone,
                    total: bookingDetails.totalPrice,
                    kindPay: "Thanh toán bằng VNPay",
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
                        console.log("đã tạo booking")
                        // toast.success("Đơn hàng đã được tạo!");
                        const createdBooking = await response.json(); // Lấy thông tin của hóa đơn vừa tạo
                        await createBookingDetail(createdBooking.id, bookingDetails.tripId, 0, bookingDetails.selectedSeatIds.length, bookingDetails.selectedSeatsNames, bookingDetails.totalPrice, bookingDetails.pickupLocation, bookingDetails.note);
                        updateTripEmptySeat(bookingDetails.tripId, data.route.id, data.vehicle.id, data.dayStart, data.timeStart, data.price, data.driver.id, data.emptySeat, bookingDetails.selectedSeatIds);
                        insertSeatReservation(bookingDetails.selectedSeatIds, bookingDetails.tripId, createdBooking.id);
                        await sendMail(createdBooking.id);
                        deleteWaitingSeat(bookingDetails.selectedSeatIds, bookingDetails.tripId);
                        setTimeout(() => {
                            navigate("/pay-success", { state: { bookingId: createdBooking.id, kind: bookingDetails.kind } });
                        }, 1500);
                        
                        localStorage.removeItem('bookingDetails');
                        
                    } else {
                        throw new Error('Something went wrong with the order creation.');
                    }
                } catch (error) {
                    console.error("Error creating order:", error);
                    toast.error("Failed to create order.");
                }
            } else if (bookingDetails.kind === "Khứ hồi") {
                const bookingData = {
                    userName: bookingDetails.userName,
                    email: bookingDetails.email,
                    phone: bookingDetails.phone,
                    total: totalAmount,
                    kindPay:"Thanh toán bằng VNPay",
                    isPaid: 1,
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
                        // toast.success("Đơn hàng đã được tạo!");
                        const createdBooking = await response.json(); // Lấy thông tin của hóa đơn vừa tạo
                        // tạo chi tiết và upadte lượt đi
                        await createBookingDetail(createdBooking.id, bookingDetails.tripId, 0, bookingDetails.selectedSeatIds.length, bookingDetails.selectedSeatsNames, bookingDetails.totalPrice, bookingDetails.pickupLocation, bookingDetails.note);
                        updateTripEmptySeat(bookingDetails.tripId, data.route.id, data.vehicle.id, data.dayStart, data.timeStart, data.price, data.driver.id, data.emptySeat, bookingDetails.selectedSeatIds);
                        insertSeatReservation(bookingDetails.selectedSeatIds, bookingDetails.tripId, createdBooking.id);
                        deleteWaitingSeat(bookingDetails.selectedSeatIds, bookingDetails.tripId);
                        // tạo chi tiết và update lượt về
                        await createBookingDetail(createdBooking.id, bookingDetails.tripIdReturn, 1, bookingDetails.selectedSeatIdsReturn.length, bookingDetails.selectedSeatsNamesReturn, bookingDetails.totalPriceReturn, bookingDetails.pickupLocationReturn, bookingDetails.noteReturn);
                        updateTripEmptySeat(bookingDetails.tripIdReturn, dataReturn.route.id, dataReturn.vehicle.id, dataReturn.dayStart, dataReturn.timeStart, dataReturn.price, dataReturn.driver.id, dataReturn.emptySeat, bookingDetails.selectedSeatIdsReturn);
                        insertSeatReservation(bookingDetails.selectedSeatIdsReturn, bookingDetails.tripIdReturn, createdBooking.id);
                        deleteWaitingSeat(bookingDetails.selectedSeatIdsReturn, bookingDetails.tripIdReturn);
                        await sendMail(createdBooking.id);
                        setTimeout(() => {
                            navigate("/pay-success", { state: { bookingId: createdBooking.id, kind: bookingDetails.kind } });
                        }, 1500);
                        localStorage.removeItem('bookingDetails');
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
    // send mail
    const sendMail = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/sendBookingEmail/${bookingId}`, {
                method: 'POST',
            });
            if (response.ok) {
                console.log("Email sent successfully!");
            } else {
                throw new Error('Failed to send email: Server responded with status ' + response.status);
            }
        } catch (error) {
            console.error("Error sendmail:", error);
            toast.error("Failed to sendmail.");
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
    function LoadingOverlay() {
        return (
            <div className="loading-overlay">
                <div className="loader"></div>
            </div>
        );
    }
    // xóa ghế chờ đặt
    const deleteWaitingSeat = async (selectedSeatIds, trip) => {
    
        try {
            // Lặp qua từng id của ghế được chọn
            for (const seatId of selectedSeatIds) {
                // Tạo dữ liệu mới cho mỗi ghế được đặt
                const waitingSeatData = {
                    tripId: trip,
                    seatId: seatId
                };
    
                // Gửi yêu cầu để thêm ghế đã đặt vào bảng SeatBooked
                const response = await fetch(`http://localhost:8081/api/waiting_seat`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(waitingSeatData),
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to delete seat waiting for seatId ${seatId}`);
                }
    
                console.log(`Seat waiting delete successfully for seatId ${seatId}`);
            }
    
        } catch (error) {
            console.error('Error delete seat waiting:', error);
        }
    };

    return (
            <section className="main container section">
            {isLoading && <LoadingOverlay />}
                <div className="reponseInfo ">
                    <div className="secTitle">
                        <p>Thanh toán thành công</p>
                        <p>Giao dịch của bạn đã được ghi nhận</p>
                    </div>

                    <form className="infoTicket">
                        <button className="btn search" onClick={handleChoosePayment}>Tiếp tục</button>
                    </form>
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
export default ResponseSuccess;