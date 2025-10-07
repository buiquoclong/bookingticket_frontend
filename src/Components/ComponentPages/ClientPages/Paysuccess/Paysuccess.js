// Paysuccess.jsx
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BookingTicketInfo from "../../../ComponentParts/BookingTicketInfo";
import "../../../../Assets/scss/Clients/Paysuccess.scss";

const Paysuccess = () => {
  const location = useLocation();
  const { bookingId, kind } = location.state || {};
  const [data, setData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookingDetail = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking_detail/booking/${bookingId}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  }, [bookingId]);

  const fetchBooking = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/${bookingId}`
      );
      const result = await response.json();
      setBookingData(result);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  }, [bookingId]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBooking(), fetchBookingDetail()]).finally(() =>
      setLoading(false)
    );
  }, [fetchBooking, fetchBookingDetail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <section className="pay-success container section">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải thông tin vé...</p>
        </div>
      </section>
    );
  }

  if (!bookingData) {
    return (
      <section className="pay-success container section">
        <p>Không tìm thấy thông tin vé. Vui lòng thử lại.</p>
      </section>
    );
  }

  return (
    <section className="pay-success container section">
      <div className="success-card">
        <div className="success-content">
          <div className="icon-wrapper">
            <CheckCircleOutlineIcon className="success-icon" />
            {/* 🔹 Vòng tròn phát sáng */}
            <span className="icon-glow"></span>
            <span className="icon-glow"></span>
            <span className="icon-glow"></span>
          </div>

          <div className="text-center">
            <h2 className="success-title">Mua vé thành công</h2>
            <p className="success-message">
              Chúng tôi đã gửi thông tin vé về địa chỉ email{" "}
              <strong>{bookingData?.email}</strong>. Vui lòng kiểm tra lại.
            </p>
          </div>
        </div>

        <div className="booking-info-card">
          <h3 className="section-title">THÔNG TIN MUA VÉ</h3>

          <div className="info-grid">
            <div className="info-block">
              <h4>Thông tin người mua</h4>
              <ul>
                <li>
                  <span>Họ và tên:</span>
                  <span>{bookingData.userName}</span>
                </li>
                <li>
                  <span>Số điện thoại:</span>
                  <span>{bookingData.phone}</span>
                </li>
                <li>
                  <span>Email:</span>
                  <span>{bookingData.email}</span>
                </li>
              </ul>
            </div>

            <div className="info-block">
              <h4>Thông tin thanh toán</h4>
              <ul>
                <li>
                  <span>Tổng giá vé:</span>
                  <span>{bookingData.total.toLocaleString("vi-VN")} VND</span>
                </li>
                <li>
                  <span>Phương thức:</span>
                  <span>{bookingData.kindPay}</span>
                </li>
                <li>
                  <span>Trạng thái:</span>
                  <span
                    className={
                      bookingData.isPaid === 1
                        ? "status success"
                        : "status pending"
                    }
                  >
                    {bookingData.isPaid === 1
                      ? "Thanh toán thành công"
                      : "Chưa thanh toán"}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="divider" />

          <div className="ticket-section">
            <BookingTicketInfo
              kind={kind}
              data={data}
              formatDate={formatDate}
            />
          </div>

          <div className="divider" />

          <div className="backhome">
            <Link to="/">
              <button className="btn backhome-btn">Trở về trang chủ</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Paysuccess;
