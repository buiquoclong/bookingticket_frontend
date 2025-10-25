import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import { bookingColumn, bookingFieldSearch } from "../../../Utils/bookingUtils";
import BookingTicketInfo from "../../ComponentParts/TicketInfoComponents/BookingTicketInfo";

import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";

const AdminBooking = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const [selectedBookingKind, setSelectedBookingKind] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("email");
  const [searchValue, setSearchValue] = useState("");

  const statusMap = {
    0: "Chưa thanh toán",
    1: "Đã thanh toán",
    2: "Đã hủy",
  };
  const statusColorMap = {
    0: "#ffa9008a", // Chưa kích hoạt
    1: "#008000b3", // Đã kích hoạt
    2: "#ff0000c2", // Tạm khóa
  };

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/page?page=${page}&size=5&${searchCriteria}=${searchValue}`
      );
      const data = await response.json();
      setRecords(data.bookings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchCriteria, searchValue]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handlePayClick = async (booking) => {
    setIsLoading(true);
    try {
      const newBookingData = {
        isPaid: 1,
      };

      // Gọi API qua sendRequest
      const updatedBooking = await sendRequest(
        `http://localhost:8081/api/booking/${booking.id}`,
        "PUT",
        newBookingData
      );

      // ✅ Nếu không lỗi, cập nhật state
      toast.success("Hóa đơn đã được cập nhật thành công!");

      const updatedBookings = records.map((b) =>
        b.id === updatedBooking.id ? updatedBooking : b
      );

      setRecords(updatedBookings);
    } catch (error) {
      console.error("❌ Lỗi khi thanh toán:", error);
      toast.error("Có lỗi xảy ra khi cập nhật hóa đơn!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailClick = async (booking) => {
    const bookingId = booking.id;

    setIsLoading(true); // 🔹 Bắt đầu loading

    try {
      const response = await fetch(
        `http://localhost:8081/api/booking_detail/booking/${bookingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBookingDetails(data);
      console.log("Booking details:", data);

      // 🔹 Đặt thông tin lượt đi/lượt về và hiển thị modal
      setSelectedBookingKind(booking.roundTrip); // 0 hoặc 1
      setIsDetail(true);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOutsideClick = (e) => {
    // Đóng modal khi click vào phần tử có class 'modal'
    if (e.target.classList.contains("modal-detail")) {
      setIsDetail(false);
    }
  };
  const handleCloseDetail = () => {
    setIsDetail(false);
    setBookingDetails(null);
  };

  const cancelBooking = async () => {
    const bookingId = bookingToCancel.id;

    setIsLoading(true);
    try {
      const canceled = await sendRequest(
        `http://localhost:8081/api/booking/cancel/${bookingId}`,
        "PUT"
      );

      // setRecords((prev) => prev.filter((record) => record.id !== bookingId));
      toast.success("Đặt chỗ đã được hủy thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === canceled.id ? canceled : item))
      );
      setIsCancelConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelBookingClick = (booking) => {
    setBookingToCancel(booking);
    setIsCancelConfirmVisible(true);
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  return (
    <>
      <div className="main-container">
        <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
        <GenericAdminHeader
          title="Quản lý chuyến đi"
          breadcrumbLinks={[
            { label: "Admin", href: "/admin" },
            { label: "Chuyến đi", href: "/admin/trips" },
          ]}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchOptions={bookingFieldSearch}
          searchCriteria={searchCriteria}
          handleCriteriaChange={handleCriteriaChange}
        />

        <div className="HisContent">
          <div className="HistoryTick">
            <div className="devide"></div>
            <AdminTable
              columns={bookingColumn}
              data={records}
              onPay={handlePayClick}
              onCancel={handleCancelBookingClick}
              onDetail={handleDetailClick} // 👉 thêm dòng này
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              statusColorMap={statusColorMap}
              statusMap={statusMap}
            />
          </div>
        </div>

        <ConfirmDeleteModal
          visible={isCancelConfirmVisible}
          message="Bạn có chắc chắn muốn hủy hóa đơn này?"
          onConfirm={cancelBooking} // khi xác nhận
          onCancel={() => setIsCancelConfirmVisible(false)} // khi hủy
          type="delete"
        />
        {isDetail && bookingDetails && (
          <div className="modal-detail" onClick={handleOutsideClick}>
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
                  {bookingDetails.map((ticket) => (
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
    </>
  );
};
export default AdminBooking;
