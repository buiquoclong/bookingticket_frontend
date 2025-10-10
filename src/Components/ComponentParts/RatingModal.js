import React from "react";
import StarRatings from "react-star-ratings";
import "./Policy.scss";

const RatingModal = ({
  isOpen,
  selectedTrip,
  rating,
  setRating,
  content,
  setContent,
  handleCancelRating,
  handleCreateRating,
  ratingsDescription,
  formatDate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="rating-modal-overlay">
      <div className="rating-modal">
        <h2 className="modal-title">Đánh giá chuyến đi</h2>

        <div className="trip-info">
          <p>
            <strong>Tuyến:</strong> {selectedTrip.route.name}
          </p>
          <p>
            <strong>Ngày:</strong> {formatDate(selectedTrip.dayStart)}
          </p>
          <p>
            <strong>Giờ khởi hành:</strong> {selectedTrip.timeStart.slice(0, 5)}
          </p>
        </div>

        <div className="rating-stars">
          <StarRatings
            rating={rating}
            starRatedColor="#ffe600"
            changeRating={setRating}
            numberOfStars={5}
            starDimension="35px"
            starHoverColor="#ffe600"
          />
          {rating > 0 && (
            <p className="rating-desc">{ratingsDescription[rating - 1]}</p>
          )}
        </div>

        <textarea
          className="rating-textarea"
          placeholder="Nhập nội dung đánh giá..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn cancel" onClick={handleCancelRating}>
            Hủy
          </button>
          <button className="btn save" onClick={handleCreateRating}>
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
