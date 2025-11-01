import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/MyRating.scss";
import StarRatings from "react-star-ratings";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import RatingModal from "../../ComponentParts/ModelComponents/RatingModal";
import { formatDate } from "../../../Utils/bookingUtils";
import {
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import {
  GET_REVIEW_OF_USER_PAGE,
  GET_REVIEW_BY_ID,
} from "../../../Utils/apiUrls";

const MyRating = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await sendRequest(
        GET_REVIEW_OF_USER_PAGE(page, 10, userId, searchValue),
        "GET"
      );

      setRecords(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("❌ Error fetching reviews:", error);
      toast.error("Không thể tải danh sách đánh giá!");
    } finally {
      setIsLoading(false);
    }
  }, [page, searchValue, userId]);

  useEffect(() => {
    if (userId) {
      fetchReviews();
    } else {
      localStorage.setItem("redirectPath", window.location.pathname);
      navigate("/login");
    }
  }, [userId, fetchReviews, navigate]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  // Xử lý chỉnh sửa
  const handleEdit = (review) => {
    setSelectedReview(review);
    setRating(review.rating);
    setContent(review.content);
    setIsEditing(true);
  };

  // ✅ Cập nhật đánh giá
  const handleUpdateRating = async (e) => {
    e.preventDefault();
    const reviewId = selectedReview?.id;

    // 🔹 Kiểm tra dữ liệu bắt buộc
    const isValid = validateFields({
      "Mức đánh giá": rating,
      "ID đánh giá": reviewId,
    });
    if (!isValid) return;

    try {
      const updatedReview = await sendRequest(
        GET_REVIEW_BY_ID(reviewId),
        "PUT",
        {
          rating,
          content,
        }
      );

      // 🔹 Cập nhật lại danh sách review trong state
      setRecords((prev) =>
        prev.map((r) => (r.id === updatedReview.id ? updatedReview : r))
      );

      toast.success("Cập nhật đánh giá thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật đánh giá:", error);
      // sendRequest tự xử lý toast lỗi
    }
  };

  // ✅ Xử lý xóa review
  const handleDelete = (id) => {
    const review = records.find((r) => r.id === id);
    setReviewToDelete(review);
    setIsDeleteConfirmVisible(true);
  };

  // ✅ Gửi request xóa review
  const removeReview = async () => {
    const reviewId = reviewToDelete?.id;

    if (!reviewId) {
      toast.error("Không tìm thấy đánh giá để xóa!");
      return;
    }

    try {
      await sendRequest(GET_REVIEW_BY_ID(reviewId), "DELETE");

      // 🔹 Cập nhật lại danh sách sau khi xóa
      setRecords((prev) => prev.filter((r) => r.id !== reviewId));
      setIsDeleteConfirmVisible(false);
      toast.success("Xóa đánh giá thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa đánh giá:", error);
      // sendRequest đã tự xử lý toast lỗi
    }
  };

  return (
    <div className="my-rating-wrapper">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
      <div className="HisContent">
        {/* Bộ lọc đánh giá */}
        <div className="searchIn">
          <FormControl sx={{ minWidth: 150 }} variant="outlined" size="small">
            <InputLabel id="search-criteria-label">Đánh giá</InputLabel>
            <Select
              labelId="search-criteria-label"
              id="search-criteria"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              label="Đánh giá"
            >
              <MenuItem value="">Tất cả</MenuItem>
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem
                  key={num}
                  value={num}
                  style={{ justifyContent: "center" }}
                >
                  <span style={{ color: "gold", fontSize: "20px" }}>
                    {"★".repeat(num)}
                  </span>
                  <span style={{ color: "grey", fontSize: "20px" }}>
                    {"★".repeat(5 - num)}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Tiêu đề */}
        <div className="contentTicket">
          <div className="title">Đánh giá của tôi</div>
        </div>
        <div className="devide"></div>

        {/* Danh sách đánh giá */}
        <div className="rating-list">
          {records.length > 0 ? (
            records.map((item) => (
              <div key={item.id} className="rating-card">
                <div className="rating-info">
                  <div className="lineInfo">
                    <span className="label">Tuyến:</span>
                    <span className="value">{item.trip.route.name}</span>
                  </div>
                  <div className="lineInfo">
                    <span className="label">Loại xe:</span>
                    <span className="value">
                      {item.trip.vehicle.kindVehicle.name}
                    </span>
                  </div>
                  <div className="lineInfo">
                    <span className="label">Ngày:</span>
                    <span className="value">
                      {formatDate(item.trip.dayStart)}
                    </span>
                  </div>
                  <div className="lineInfo">
                    <span className="label">Thời gian:</span>
                    <span className="value">
                      {item.trip.timeStart.slice(0, 5)}
                    </span>
                  </div>
                </div>

                <div className="rating-stars">
                  <StarRatings
                    rating={item.rating}
                    starRatedColor="#ffd700"
                    numberOfStars={5}
                    starDimension="22px"
                    starSpacing="2px"
                    name={`rating-${item.id}`}
                  />
                </div>

                <div className="rating-comment">
                  “{item.content || "Không có nội dung"}”
                </div>

                <div className="rating-actions">
                  <button className="btn edit" onClick={() => handleEdit(item)}>
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrashAlt /> Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">Bạn chưa có đánh giá nào.</div>
          )}
        </div>

        {/* Phân trang */}
        <div className="center-pagination">
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

        {/* Hộp xác nhận xóa */}
        <ConfirmDeleteModal
          visible={isDeleteConfirmVisible}
          message="Bạn có chắc muốn xóa đánh giá này không?"
          onConfirm={removeReview}
          onCancel={() => setIsDeleteConfirmVisible(false)}
          type="delete"
        />

        {/* Hộp chỉnh sửa */}
        {isEditing && (
          <RatingModal
            isOpen={isEditing}
            mode="edit"
            title="Chỉnh sửa đánh giá"
            selectedTrip={selectedReview.trip}
            rating={rating}
            setRating={setRating}
            content={content}
            setContent={setContent}
            onCancel={() => setIsEditing(false)}
            onSubmit={handleUpdateRating}
          />
        )}
      </div>
    </div>
  );
};

export default MyRating;
