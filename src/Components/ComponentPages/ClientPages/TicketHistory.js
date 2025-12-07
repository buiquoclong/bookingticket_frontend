import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/TicketHistory.scss";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
// import TicketCard from "../../../ComponentParts/TicketCard";
import TicketCard from "../../ComponentParts/TicketInfoComponents/TicketCard";
import RatingModal from "../../ComponentParts/ModelComponents/RatingModal";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import {
  GET_BOOKING_DETAILS_BY_USER,
  CREATE_REVIEW,
} from "../../../Utils/apiUrls";

const TicketHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ticketId, setTicketId] = useState("");

  const [isRating, setIsRating] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const kindTrip = { 0: "Lượt đi", 1: "Lượt về" };
  const statusMap = { 1: "Đã xác nhận", 2: "Đã hoàn thành" };
  const statusColorMap = { 1: "#efcf7f", 2: "green" };

  const fetchBookingDetails = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await sendRequest(
        GET_BOOKING_DETAILS_BY_USER(userId, page, 9, ticketId),
        "GET"
      );

      if (!data || !data.bookingDetails) {
        toast.error("Không tìm thấy chi tiết vé.");
        return;
      }

      setTickets(data.bookingDetails);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("❌ Lỗi khi tải chi tiết vé:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, page, ticketId]);

  useEffect(() => {
    if (userId) {
      fetchBookingDetails();
    } else {
      sessionStorage.setItem("redirectPath", window.location.pathname);
      navigate("/login");
    }
  }, [userId, fetchBookingDetails, navigate]);

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleRating = (trip) => {
    setSelectedTrip(trip);
    setIsRating(true);
  };

  const ratingsDescription = ["Tệ", "Trung bình", "Tốt", "Rất tốt", "Xuất sắc"];

  const handleCreateRating = async (e) => {
    e.preventDefault();

    const valid = validateFields({
      rating,
      content,
      tripId: selectedTrip?.id,
      userId: userId,
    });

    if (!valid) return;

    const newRating = {
      tripId: selectedTrip.id,
      userId,
      rating,
      content,
    };

    try {
      await sendRequest(CREATE_REVIEW, "POST", newRating);

      toast.success("Đánh giá thành công!");
      setRating(0);
      setContent("");
      setIsRating(false);
    } catch (error) {
      console.error("❌ Lỗi khi tạo đánh giá:", error);
    }
  };

  const handleCancelRating = () => {
    setRating(0);
    setContent("");
    setIsRating(false);
  };

  return (
    <div className="ticket-history-wrapper">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <div className="search-area">
        <input
          type="text"
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="🔍 Tìm kiếm mã vé"
          className="search-input"
        />
      </div>

      <h2 className="ticket-history-title">Danh sách vé đã đặt</h2>

      {!tickets || tickets.length === 0 ? (
        <div className="emptyData">
          Bạn chưa có vé nào đã đặt. Vui lòng tìm kiếm mã vé khác.
        </div>
      ) : (
        <>
          <div className="ticket-history-grid">
            {tickets.map((detail) => (
              <TicketCard
                key={detail.id}
                detail={detail}
                kindTrip={kindTrip}
                statusMap={statusMap}
                statusColorMap={statusColorMap}
                handleRating={handleRating}
              />
            ))}
          </div>

          <div className="pagination-center">
            <Pagination
              count={totalPages}
              boundaryCount={1}
              siblingCount={1}
              color="primary"
              showFirstButton
              showLastButton
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}

      {isRating && (
        <RatingModal
          isOpen={isRating}
          mode="create"
          selectedTrip={selectedTrip}
          rating={rating}
          setRating={setRating}
          content={content}
          setContent={setContent}
          onCancel={handleCancelRating}
          onSubmit={handleCreateRating}
          ratingsDescription={ratingsDescription}
        />
      )}
    </div>
  );
};

export default TicketHistory;
