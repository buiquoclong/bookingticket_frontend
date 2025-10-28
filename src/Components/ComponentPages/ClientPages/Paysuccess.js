// Paysuccess.jsx
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BookingTicketInfo from "../../ComponentParts/TicketInfoComponents/BookingTicketInfo";
import "../../../Assets/scss/Clients/Paysuccess.scss";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { sendRequest } from "../../../Utils/apiHelper";
import {
  GET_BOOKING_DETAIL_BY_BOOKING_ID,
  GET_BOOKING_BY_ID,
} from "../../../Utils/apiUrls";

const Paysuccess = () => {
  const location = useLocation();
  const { bookingId, kind } = location.state || {};
  const [data, setData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookingDetail = useCallback(async () => {
    if (!bookingId) return;

    try {
      setIsLoading(true);

      const result = await sendRequest(
        GET_BOOKING_DETAIL_BY_BOOKING_ID(bookingId),
        "GET"
      );

      setData(result);
    } catch (error) {
      console.error("❌ Error fetching booking details:", error);
      toast.error("Không thể tải chi tiết vé!");
    } finally {
      setIsLoading(false);
    }
  }, [bookingId]);

  const fetchBooking = useCallback(async () => {
    if (!bookingId) return;

    try {
      setIsLoading(true);

      const result = await sendRequest(GET_BOOKING_BY_ID(bookingId), "GET");

      setBookingData(result);
    } catch (error) {
      console.error("❌ Error fetching booking data:", error);
      toast.error("Không thể tải thông tin vé!");
    } finally {
      setIsLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchBooking(), fetchBookingDetail()]).finally(() =>
      setIsLoading(false)
    );
  }, [fetchBooking, fetchBookingDetail]);

  if (!bookingData) {
    return (
      <section className="pay-success container section">
        <p>Không tìm thấy thông tin vé. Vui lòng thử lại.</p>
      </section>
    );
  }

  return (
    <section className="pay-success container section">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <div className="success-card">
        <div className="success-content">
          <div className="icon-wrapper">
            <CheckCircleOutlineIcon className="success-icon" />
            <span className="icon-shadow"></span>
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
            <BookingTicketInfo kind={kind} data={data} />
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
