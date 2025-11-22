import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import { bookingColumn, bookingFieldSearch } from "../../../Utils/bookingUtils";
import BookingTicketInfo from "../../ComponentParts/TicketInfoComponents/BookingTicketInfo";

import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  GET_BOOKING_BY_ID,
  GET_BOOKING_DETAIL_BY_BOOKING,
  CANCEL_BOOKING,
  GET_BOOKINGS_PAGE,
} from "../../../Utils/apiUrls";

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
      const data = await sendRequest(
        GET_BOOKINGS_PAGE(page, 5, searchCriteria, searchValue),
        "GET"
      );

      setRecords(data.bookings || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      toast.error("Không thể tải danh sách đặt vé!");
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

      const updatedBooking = await sendRequest(
        GET_BOOKING_BY_ID,
        "PUT",
        newBookingData
      );

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

    setIsLoading(true);

    try {
      const data = await sendRequest(
        GET_BOOKING_DETAIL_BY_BOOKING(bookingId),
        "GET"
      );
      setBookingDetails(data);

      setSelectedBookingKind(booking.roundTrip); // 0 hoặc 1
      setIsDetail(true);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOutsideClick = (e) => {
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
      const canceled = await sendRequest(CANCEL_BOOKING(bookingId), "PUT");

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
              onDetail={handleDetailClick}
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
          onConfirm={cancelBooking}
          onCancel={() => setIsCancelConfirmVisible(false)}
          type="delete"
        />
        {isDetail && bookingDetails && (
          <div className="modal-detail" onClick={handleOutsideClick}>
            <div className="modal-content-detail">
              <div className="modal-header">
                <h3>Chi tiết vé</h3>
                <button className="close-btn" onClick={handleCloseDetail}>
                  &times;
                </button>
              </div>

              {/* Body */}
              <div className="modal-body">
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
