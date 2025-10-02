import React, {useState, useEffect} from "react";
import "./ResponsePay.scss";
import {useNavigate } from 'react-router-dom';


const ResponseFailed  = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState(null);
    const [dataReturn, setDataReturn] = useState(null);
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    useEffect(() => {
        const fetchData = async () => {

          // Kiểm tra bookingDetails có tồn tại và có thuộc tính kind không
            if (bookingDetails && bookingDetails.kind) {
                if (bookingDetails.kind === "Một chiều") {
                await fetchTripInfo();
                } else if (bookingDetails.kind === "Khứ hồi") {
                await fetchTripInfo();
                await fetchTripReturnInfo();
                }
            }
        };

        if (bookingDetails) {
            fetchData();
        }
    }, [bookingDetails]);
    
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


    const handleBack = async (event) => {
        event.preventDefault();
        if (bookingDetails) {
            if (bookingDetails.kind === "Một chiều") {
                deleteWaitingSeat(bookingDetails.selectedSeatIds, bookingDetails.tripId);
                updateTripEmptySeat(bookingDetails.tripId, data.route.id, data.vehicle.id, data.dayStart, data.timeStart, data.price, data.driver.id, data.emptySeat, bookingDetails.selectedSeatIds, data.status);
            } else if (bookingDetails.kind === "Khứ hồi") {
                deleteWaitingSeat(bookingDetails.selectedSeatIds, bookingDetails.tripId);
                deleteWaitingSeat(bookingDetails.selectedSeatIdsReturn, bookingDetails.tripIdReturn);
                updateTripEmptySeat(bookingDetails.tripId, data.route.id, data.vehicle.id, data.dayStart, data.timeStart, data.price, data.driver.id, data.emptySeat, bookingDetails.selectedSeatIds, data.status);
                updateTripEmptySeat(bookingDetails.tripIdReturn, dataReturn.route.id, dataReturn.vehicle.id, dataReturn.dayStart, dataReturn.timeStart, dataReturn.price, dataReturn.driver.id, dataReturn.emptySeat, bookingDetails.selectedSeatIdsReturn, dataReturn.status);
            }
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
    const updateTripEmptySeat = async (trip, route, vehicleId, daystart, timestart, price, driver, emptyseat, selectedSeatIds, status) => {
        const newEmptySeat = emptyseat + selectedSeatIds.length;
        const tripUpdate = {
            routeId: route ,
            vehicleId: vehicleId,
            dayStart: daystart,
            timeStart: timestart,
            price: price,
            driverId: driver,
            emptySeat: newEmptySeat,
            status: status

        };
        try {
            // Gửi yêu cầu cập nhật số ghế trống
            const updateResponse = await fetch(`http://localhost:8081/api/trip/p1/${trip}`, {
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