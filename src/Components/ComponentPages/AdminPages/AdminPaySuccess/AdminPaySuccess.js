import React, { useCallback, useState, useEffect } from "react";
import "./AdminPaySuccess.scss";
import { Link, useLocation } from "react-router-dom";
import BookingTicketInfo from "../../../ComponentParts/TicketInfoComponents/BookingTicketInfo";
import LoadingBackdrop from "../../../ComponentParts/LoadingBackdrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function AdminPaySuccess() {
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookingDetail = useCallback(async () => {
    setIsLoading(true); // 🔹 Bắt đầu loading

    try {
      const response = await fetch(
        `http://localhost:8081/api/booking_detail/booking/${bookingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    // Call the API to fetch cities
    fetchBookingDetail();
  }, [fetchBookingDetail]);

  return (
    <>
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
            </div>
          </div>

          <div className="booking-info-card">
            <h3 className="section-title">THÔNG TIN MUA VÉ</h3>

            <div className="ticket-section">
              <BookingTicketInfo data={data} />
            </div>

            <div className="divider" />

            <div className="backhome">
              <Link to="/admin/book-ticket">
                <button className="btn backhome-btn">Trở về trang chủ</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminPaySuccess;
