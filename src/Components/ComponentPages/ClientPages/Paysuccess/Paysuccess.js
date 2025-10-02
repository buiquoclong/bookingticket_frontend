import React, { useCallback, useState, useEffect } from "react";

import "./Paysuccess.scss";
import { Link, useLocation } from "react-router-dom";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

const Paysuccess = () => {
  const location = useLocation();
  const { bookingId, kind } = location.state || {};
  console.log(kind);
  const [data, setData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  // const orderId = 1;
  console.log("bookingId", bookingId);

  // const [orders, setsetOrders] = useState([]);

  const fetchBookingDetail = useCallback(async () => {
    fetch(`http://localhost:8081/api/booking_detail/booking/${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [bookingId]);
  const fetchBooking = useCallback(async () => {
    fetch(`http://localhost:8081/api/booking/${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookingData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [bookingId]);
  useEffect(() => {
    // Call the API to fetch cities
    fetchBookingDetail();
    fetchBooking();
  }, [fetchBookingDetail, fetchBooking]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <section className="main container section">
      {bookingData && (
        <div className="paySuccess">
          <div className="imgsucces">
            <CheckCircleSharpIcon className="icon" />
          </div>
          <div className="content">
            <div className="titlePay">Mua vé thành công</div>
            <div className="text">
              Chúng tôi đã gửi thông tin vé về địa chỉ email {bookingData.email}
              . Vui lòng kiểm tra lại
            </div>
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
                    <span className="text">
                      {bookingData.total.toLocaleString("vi-VN")} VND
                    </span>
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
                    data.map((detail) => (
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
                          <div className="rightInfo">
                            <span>{detail.quantity}</span>
                          </div>
                        </div>
                        <div className="lineInfo">
                          <span>Ghế đã đặt:</span>
                          <div className="seatInfo">
                            <span>{detail.seatName}</span>
                          </div>
                        </div>
                        <div className="lineInfo">
                          <span>Giá:</span>
                          <div className="rightInfo">
                            <span>
                              {detail.price.toLocaleString("vi-VN")} VND
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {kind === "Khứ hồi" && (
                <div className="detailBoooking">
                  {data &&
                    data.map((detail) => (
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
                          <div className="rightInfo">
                            <span>{detail.quantity}</span>
                          </div>
                        </div>
                        <div className="lineInfo">
                          <span>Ghế đã đặt:</span>
                          <div className="seatInfo">
                            <span>{detail.seatName}</span>
                          </div>
                        </div>
                        <div className="lineInfo">
                          <span>Giá:</span>
                          <div className="rightInfo">
                            <span>
                              {detail.price.toLocaleString("vi-VN")}VND
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="devide"></div>
            <div className="backhome">
              <Link to="/">
                <button className="btn backhomebtn">Trở về</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Paysuccess;
