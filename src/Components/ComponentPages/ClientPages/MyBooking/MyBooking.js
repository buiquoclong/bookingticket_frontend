import React, { useState, useEffect, useCallback } from "react";
import "./MyBooking.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import BookingTicketInfo from "../../../ComponentParts/BookingTicketInfo";

const MyBooking = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const roundTrip = { 0: "Một chiều", 1: "Khứ hồi" };
  const isPaid = { 0: "Chưa thanh toán", 1: "Đã thanh toán", 2: "Đã hủy" };

  const formatDate1 = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(
      date.getDate()
    )}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  };

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/booking/page?page=${page}&size=5&userId=${userId}&isPaid=${searchValue}`
      );
      const data = await res.json();
      setRecords(data.bookings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [page, userId, searchValue]);

  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    const currentPath = window.location.pathname;

    if (redirectPath === currentPath) sessionStorage.removeItem("redirectPath");

    if (!userId) {
      sessionStorage.setItem("redirectPath", currentPath);
      navigate("/login");
    } else {
      fetchBookings();
    }
  }, [userId, fetchBookings, navigate]);

  const handlePayBookingClick = async (booking) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/payment/pay-boooking?total=${booking.total}&bookingId=${booking.id}`
      );
      if (!res.ok) throw new Error("Failed to get payment URL");
      const paymentURL = await res.text();
      window.location.href = paymentURL;
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi nhận URL thanh toán từ máy chủ.");
    }
  };

  const cancelBooking = async () => {
    if (!bookingToCancel) return;
    const bookingId = bookingToCancel.id;
    try {
      const res = await fetch(
        `http://localhost:8081/api/seat_reservation/booking/${bookingId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete booking");
      toast.success("Bạn đã hủy hóa đơn thành công");
      setIsCancelConfirmVisible(false);
      setRecords((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, isPaid: 2 } : b))
      );
    } catch (error) {
      console.error(error);
      toast.error("Không thể hủy hóa đơn");
    }
  };

  const handleCancelBookingClick = (booking) => {
    setBookingToCancel(booking);
    setIsCancelConfirmVisible(true);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);
  const [selectedBookingKind, setSelectedBookingKind] = useState(0);

  const handleViewDetailClick = async (booking) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking_detail/booking/${booking.id}`
      );
      const result = await response.json();
      setSelectedBookingDetail(result);
      setSelectedBookingKind(booking.roundTrip); // 0 hoặc 1
      setIsDetailVisible(true);
    } catch (error) {
      console.error("Error fetching booking detail:", error);
      toast.error("Không thể tải chi tiết vé.");
    }
  };

  const handleCloseDetail = () => {
    setIsDetailVisible(false);
    setSelectedBookingDetail(null);
  };

  return (
    <div className="mybooking-container">
      <div className="filter-section">
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Trạng thái thanh toán</InputLabel>
          <Select
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="Trạng thái thanh toán"
          >
            <MenuItem value="0">Chưa thanh toán</MenuItem>
            <MenuItem value="1">Đã thanh toán</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="booking-list">
        {records.length === 0 ? (
          <div className="emptyData">Bạn chưa có hóa đơn nào</div>
        ) : (
          records.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-card-header">
                <span className="booking-id">ID: {b.id}</span>
                <span className={`booking-status status-${b.isPaid}`}>
                  {isPaid[b.isPaid]}
                </span>
              </div>

              <div className="booking-card-body">
                <div className="booking-item">
                  <span className="label">Người đặt:</span>
                  <span className="value">{b.userName}</span>
                </div>
                <div className="booking-item">
                  <span className="label">Email:</span>
                  <span className="value">{b.email}</span>
                </div>
                <div className="booking-item">
                  <span className="label">SĐT:</span>
                  <span className="value">{b.phone}</span>
                </div>
                <div className="booking-item">
                  <span className="label">Ngày đặt:</span>
                  <span className="value">{formatDate1(b.dayBook)}</span>
                </div>
                <div className="booking-item">
                  <span className="label">Tổng tiền:</span>
                  <span className="value">
                    {b.total.toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="booking-item">
                  <span className="label">Hình thức thanh toán:</span>
                  <span className="value">{b.kindPay}</span>
                </div>
                <div className="booking-item">
                  <span className="label">Đặt vé:</span>
                  <span className="value">{roundTrip[b.roundTrip]}</span>
                </div>
              </div>

              <div className="booking-card-footer">
                <button
                  className="btn-detail"
                  onClick={() => handleViewDetailClick(b)}
                >
                  Xem chi tiết
                </button>

                {b.isPaid === 0 && (
                  <>
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancelBookingClick(b)}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn-pay"
                      onClick={() => handlePayBookingClick(b)}
                    >
                      Thanh toán
                    </button>
                  </>
                )}
                {b.isPaid === 1 && (
                  <button
                    className="btn-cancel"
                    onClick={() => handleCancelBookingClick(b)}
                  >
                    Hủy
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination-wrapper">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          boundaryCount={1}
          siblingCount={1}
          showFirstButton
          showLastButton
        />
      </div>

      {isCancelConfirmVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xác nhận hủy</h2>
            <p>Bạn có chắc chắn muốn hủy hóa đơn này?</p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setIsCancelConfirmVisible(false)}
              >
                Hủy
              </button>
              <button className="btn-confirm" onClick={cancelBooking}>
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {isDetailVisible && selectedBookingDetail && (
        <div className="modal-detail">
          <div className="modal-content-detail">
            <div className="modal-header">
              <h3>Chi tiết vé</h3>
              <button className="close-btn" onClick={handleCloseDetail}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="tickets-container">
                {selectedBookingDetail.map((ticket) => (
                  <div key={ticket.id} className="booking-ticket">
                    <BookingTicketInfo
                      kind={
                        selectedBookingKind === 0
                          ? "one_way_ticket"
                          : "round_trip_ticket"
                      }
                      data={[ticket]}
                      formatDate={(dateString) => {
                        const date = new Date(dateString);
                        return `${String(date.getDate()).padStart(
                          2,
                          "0"
                        )}/${String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        )}/${date.getFullYear()}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
