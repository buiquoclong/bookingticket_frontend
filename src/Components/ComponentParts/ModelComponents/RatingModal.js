import StarRatings from "react-star-ratings";
import "./ModelComponents.scss";
import { formatDate } from "../../../Utils/bookingUtils";

const RatingModal = ({
  isOpen,
  title,
  selectedTrip,
  rating,
  setRating,
  content,
  setContent,
  onCancel,
  onSubmit,
  ratingsDescription = [],
  mode = "create", // "create" hoặc "edit"
}) => {
  if (!isOpen) return null;

  const buttonLabel = mode === "create" ? "Gửi đánh giá" : "Lưu thay đổi";
  const headerTitle =
    title || (mode === "create" ? "Đánh giá chuyến đi" : "Chỉnh sửa đánh giá");

  return (
    <div className="rating-modal-overlay">
      <div className="rating-modal">
        <h2 className="modal-title">{headerTitle}</h2>

        {/* Thông tin chuyến đi chỉ hiển thị nếu có */}
        {selectedTrip && (
          <div className="trip-info">
            {selectedTrip.route && (
              <p>
                <strong>Tuyến:</strong> {selectedTrip.route.name}
              </p>
            )}
            {selectedTrip.dayStart && (
              <p>
                <strong>Ngày:</strong> {formatDate(selectedTrip.dayStart)}
              </p>
            )}
            {selectedTrip.timeStart && (
              <p>
                <strong>Giờ khởi hành:</strong>{" "}
                {selectedTrip.timeStart.slice(0, 5)}
              </p>
            )}
          </div>
        )}

        {/* Đánh giá sao */}
        <div className="rating-stars">
          <StarRatings
            rating={rating}
            starRatedColor="#ffe600"
            changeRating={setRating}
            numberOfStars={5}
            starDimension="35px"
            starHoverColor="#ffe600"
          />
          {rating > 0 && ratingsDescription.length > 0 && (
            <p className="rating-desc">{ratingsDescription[rating - 1]}</p>
          )}
        </div>

        {/* Nội dung đánh giá */}
        <textarea
          className="rating-textarea"
          placeholder="Nhập nội dung đánh giá..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn cancel" onClick={onCancel}>
            Hủy
          </button>
          <button className="btn save" onClick={onSubmit}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
