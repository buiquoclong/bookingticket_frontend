import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/TicketHistory.scss";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
// import TicketCard from "../../../ComponentParts/TicketCard";
import TicketCard from "../../ComponentParts/TicketInfoComponents/TicketCard";
import RatingModal from "../../ComponentParts/ModelComponents/RatingModal";

const TicketHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ticketId, setTicketId] = useState("");

  const [isRating, setIsRating] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // --- MAPS ---
  const kindTrip = { 0: "Lượt đi", 1: "Lượt về" };
  const statusMap = { 1: "Đã xác nhận", 2: "Đã hoàn thành" };
  const statusColorMap = { 1: "#efcf7f", 2: "green" };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  // --- FETCH DATA ---
  const fetchBookingDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking_detail/user/${userId}/booking_details/page?page=${page}&size=9&id=${ticketId}`
      );
      const data = await response.json();
      setTickets(data.bookingDetails);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching detail:", error);
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

  // --- RATING ---
  const handleRating = (trip) => {
    setSelectedTrip(trip);
    setIsRating(true);
  };

  const ratingsDescription = ["Tệ", "Trung bình", "Tốt", "Rất tốt", "Xuất sắc"];

  const handleCreateRating = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Vui lòng chọn số sao!");

    try {
      const token = localStorage.getItem("token");
      const newRating = {
        tripId: selectedTrip.id,
        userId: userId,
        rating: rating,
        content: content,
      };

      const response = await fetch("http://localhost:8081/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRating),
      });

      if (response.ok) {
        toast.success("Đánh giá thành công!");
        setRating(0);
        setContent("");
        setIsRating(false);
      } else {
        toast.error("Có lỗi xảy ra khi đánh giá!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi hệ thống!");
    }
  };

  const handleCancelRating = () => {
    setRating(0);
    setContent("");
    setIsRating(false);
  };

  return (
    <div className="ticket-history-wrapper">
      {/* Search luôn hiện */}
      <div className="search-area">
        <input
          type="text"
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="🔍 Tìm kiếm mã vé"
          className="search-input"
        />
      </div>

      <h2 className="ticket-history-title">Danh sách vé đã đặt</h2>

      {/* Nếu không có data */}
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
                formatDate={formatDate}
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

      {/* Rating modal */}
      {isRating && (
        <RatingModal
          isOpen={isRating}
          selectedTrip={selectedTrip}
          rating={rating}
          setRating={setRating}
          content={content}
          setContent={setContent}
          handleCancelRating={handleCancelRating}
          handleCreateRating={handleCreateRating}
          ratingsDescription={ratingsDescription}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default TicketHistory;
