import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/MyBooking.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import BookingTicketInfo from "../../ComponentParts/TicketInfoComponents/BookingTicketInfo";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { sendRequest } from "../../../Utils/apiHelper";
import {
  GET_BOOKING_PAGE,
  CANCEL_BOOKING,
  GET_BOOKING_DETAIL_BY_BOOKING,
  PAY_BOOKING,
} from "../../../Utils/apiUrls";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";

const MyBooking = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const roundTrip = { 0: "Một chiều", 1: "Khứ hồi" };
  const isPaid = { 0: "Chưa thanh toán", 1: "Đã thanh toán", 2: "Đã hủy" };

  const formatDate1 = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getHours())}:${pad(date.getMinutes())} - ${pad(
      date.getDate()
    )}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  };

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await sendRequest(
        GET_BOOKING_PAGE(page, 5, userId, searchValue),
        "GET"
      );

      setRecords(data.bookings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách booking:", error);
      toast.error("Không thể tải danh sách hóa đơn!");
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);

      const paymentURL = await sendRequest(
        PAY_BOOKING(booking.total, booking.id),
        "GET"
      );
      console.log("Payment URL:", paymentURL);

      // Nếu server trả về text (URL), chuyển hướng trực tiếp
      const url = paymentURL.url;
      if (!url) throw new Error("Không nhận được URL thanh toán!");

      window.location.href = url;
    } catch (error) {
      console.error("❌ Lỗi khi nhận URL thanh toán:", error);
      toast.error("Không thể tạo URL thanh toán từ máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async () => {
    if (!bookingToCancel) return;
    const bookingId = bookingToCancel.id;

    try {
      await sendRequest(CANCEL_BOOKING(bookingId), "PUT");

      toast.success("Bạn đã hủy hóa đơn thành công!");
      setIsCancelConfirmVisible(false);

      // Cập nhật trạng thái booking trên UI
      setRecords((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, isPaid: 2 } : b))
      );
    } catch (error) {
      console.error("❌ Lỗi khi hủy hóa đơn:", error);
      toast.error("Không thể hủy hóa đơn. Vui lòng thử lại!");
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
      setIsLoading(true);

      const result = await sendRequest(
        GET_BOOKING_DETAIL_BY_BOOKING(booking.id),
        "GET"
      );

      setSelectedBookingDetail(result);
      setSelectedBookingKind(booking.roundTrip); // 0 hoặc 1
      setIsDetailVisible(true);
    } catch (error) {
      console.error("❌ Lỗi khi tải chi tiết vé:", error);
      toast.error("Không thể tải chi tiết vé!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setIsDetailVisible(false);
    setSelectedBookingDetail(null);
  };

  return (
    <div className="mybooking-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
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

      <ConfirmDeleteModal
        visible={isCancelConfirmVisible}
        message="Bạn có chắc chắn muốn hủy hóa đơn này?"
        onConfirm={cancelBooking} // khi xác nhận
        onCancel={() => setIsCancelConfirmVisible(false)} // khi hủy
        type="delete"
      />

      {isDetailVisible && selectedBookingDetail && (
        <div className="modal-detail">
          <div className="modal-content-detail">
            {/* Header chỉ để tiêu đề và nút đóng */}
            <div className="modal-header">
              <h3>Chi tiết vé</h3>
              <button className="close-btn" onClick={handleCloseDetail}>
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* ✅ Đưa phần “Một chiều / Khứ hồi” vào trong body */}
              <div className="ticket-kind">
                <strong>Loại vé:</strong>{" "}
                <span className="kind-label">
                  {selectedBookingKind === 0 ? "Một chiều" : "Khứ hồi"}
                </span>
              </div>

              <div className="tickets-container">
                {selectedBookingDetail.map((ticket) => (
                  <div key={ticket.id} className="booking-ticket">
                    <BookingTicketInfo data={[ticket]} />
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
