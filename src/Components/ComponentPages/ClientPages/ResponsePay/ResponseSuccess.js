import React, { useState, useEffect } from "react";
import "./ResponsePay.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

const ResponseSuccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  const bookingId = JSON.parse(localStorage.getItem("bookingId"));
  const kind = bookingDetails?.kind || "";

  const handleContinue = () => {
    if (bookingId && kind) {
      navigate("/pay-success", { state: { bookingId: bookingId, kind: kind } });
      localStorage.removeItem("bookingDetails");
    } else {
      // Xử lý khi kind không tồn tại hoặc là null
      console.error("Kind is null or undefined");
      // Thực hiện các hành động phù hợp như báo lỗi hoặc xử lý thay thế
    }
  };

  useEffect(() => {
    if (location.pathname === "/payment-success") {
      if (!bookingId) {
        navigate("/");
      }
    }
  }, [location.pathname, bookingId, navigate]);

  function LoadingOverlay() {
    return (
      <div className="loading-overlay">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="main container section">
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="reponseInfo ">
        <div className="imgsucces">
          <CheckCircleSharpIcon className="icon" />
        </div>
        <div className="secTitle">
          <p>Thanh toán thành công</p>
          <p>Giao dịch của bạn đã được ghi nhận</p>
        </div>

        <form className="infoTicket">
          <button className="btn search" onClick={handleContinue}>
            Tiếp tục
          </button>
        </form>
      </div>
    </section>
  );
};
export default ResponseSuccess;
