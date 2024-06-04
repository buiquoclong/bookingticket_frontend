import React from "react";
import "./ResponsePay.scss";
import {useNavigate } from 'react-router-dom';


const ResponseFailed  = () => {
    const navigate = useNavigate();
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));


    const handleBack = async (event) => {
        event.preventDefault();
        if (bookingDetails.kind === "Một chiều") {
            deleteWaitingSeat(bookingDetails.selectedSeatIds, bookingDetails.tripId);
        } else if (bookingDetails.kind === "Khứ hồi") {
            deleteWaitingSeat(bookingDetails.selectedSeatIds, bookingDetails.tripId);
            deleteWaitingSeat(bookingDetails.selectedSeatIdsReturn, bookingDetails.tripIdReturn);
        }
        const redirectPath = localStorage.getItem('redirectPath');
            if (redirectPath) {
                navigate(redirectPath);
                localStorage.removeItem('redirectPath');
            } else {
                navigate("/");
            }
        
            localStorage.removeItem('redirectPath');
        localStorage.removeItem('bookingDetails');
    };
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
                <div className="reponseInfo ">
                    <div className="secTitle">
                        <p>Thanh toán thất bại</p>
                        <p>Giao dịch của bạn đã bị hủy bỏ</p>
                    </div>

                    <form className="infoTicket">
                        <button className="btn search" onClick={handleBack}>Quay lại</button>
                    </form>
                </div>
            </section>
    )
}
export default ResponseFailed;