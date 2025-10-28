import React, { useCallback, useState, useEffect } from "react";
import "./AdminPaySuccess.scss";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import BookingTicketInfo from "../../../ComponentParts/TicketInfoComponents/BookingTicketInfo";
import LoadingBackdrop from "../../../ComponentParts/LoadingBackdrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { sendRequest } from "../../../../Utils/apiHelper";
import { GET_BOOKING_DETAIL_BY_BOOKING_ID } from "../../../../Utils/apiUrls";
function AdminPaySuccess() {
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
