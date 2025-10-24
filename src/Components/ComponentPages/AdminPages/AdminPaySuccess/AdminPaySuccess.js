import React, { useCallback, useState, useEffect } from "react";
import "./AdminPaySuccess.scss";
import { Link, useLocation } from "react-router-dom";
import BookingTicketInfo from "../../../ComponentParts/TicketInfoComponents/BookingTicketInfo";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function AdminPaySuccess() {
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const [orders, setsetOrders] = useState([]);

  const fetchBookingDetail = useCallback(async () => {
    fetch(`http://localhost:8081/api/booking_detail/booking/${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [bookingId]);
  useEffect(() => {
    // Call the API to fetch cities
    fetchBookingDetail();
  }, [fetchBookingDetail]);

  return (
    <>
      <section className="pay-success container section">
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
