import React, { useEffect } from "react";
import "../../../../Assets/scss/Clients/ResponsePay.scss";
import { useNavigate, useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ResponseSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ localStorage một lần, fallback về null nếu không có
  const bookingDetails = (() => {
    try {
      return JSON.parse(localStorage.getItem("bookingDetails"));
    } catch {
      return null;
    }
  })();

  const bookingId = (() => {
    try {
      return JSON.parse(localStorage.getItem("bookingId"));
    } catch {
      return null;
    }
  })();

  const kind = bookingDetails?.kind || "";

  const handleContinue = () => {
    if (bookingId && kind) {
      navigate("/pay-success", { state: { bookingId, kind } });
      localStorage.removeItem("bookingDetails");
      localStorage.removeItem("bookingId"); // Nếu muốn dọn luôn bookingId
    } else {
      console.error("BookingId hoặc kind không hợp lệ");
    }
  };

  // Tự động redirect nếu truy cập trực tiếp vào page thành công mà không có bookingId
  useEffect(() => {
    if (location.pathname === "/payment-success" && !bookingId) {
      navigate("/");
    }
  }, [location.pathname, bookingId, navigate]);

  return (
    <section className="payment-success section">
      <div className="success-card">
        <div className="icon-wrapper">
          <CheckCircleOutlineIcon className="success-icon" />
          <span className="icon-shadow"></span>
        </div>

        <div className="success-content">
          <h2 className="title">Thanh toán thành công</h2>
          <p className="message">Giao dịch của bạn đã được ghi nhận</p>
        </div>

        <div className="action-wrapper">
          <button className="btn continue-btn" onClick={handleContinue}>
            Tiếp tục
          </button>
        </div>
      </div>
    </section>
  );
};
export default ResponseSuccess;
