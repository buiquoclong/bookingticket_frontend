import { Link } from "react-router-dom";
import "./ComponentParts.scss";

const BookingSummary = ({
  kind,
  totalPrice,
  totalPriceReturn,
  discountPercent,
  discountAmount,
  finalPrice,
  isChecked,
  setIsChecked,
  handleValidateBeforePayment,
}) => {
  return (
    <div className="booking-summary">
      <h2 className="summary-title">Chi tiết giá</h2>
      <div className="summary-divider"></div>

      <div className="summary-content">
        {kind === "Một chiều" ? (
          <>
            <div className="summary-line">
              <span>Giá vé lượt đi:</span>
              <div className="summary-value">
                {totalPrice.toLocaleString("vi-VN")} VND
              </div>
            </div>
            <div className="summary-line">
              <span>Phí thanh toán:</span>
              <div className="summary-value">0 VND</div>
            </div>
          </>
        ) : (
          <>
            <div className="summary-line">
              <span>Tổng giá lượt đi:</span>
              <div className="summary-value">
                {totalPrice.toLocaleString("vi-VN")} VND
              </div>
            </div>
            <div className="summary-line">
              <span>Tổng giá lượt về:</span>
              <div className="summary-value">
                {totalPriceReturn.toLocaleString("vi-VN")} VND
              </div>
            </div>
          </>
        )}

        {discountPercent !== null && (
          <div className="summary-line">
            <span>Giảm giá ({discountPercent}%):</span>
            <div className="summary-value discount">
              -{discountAmount.toLocaleString("vi-VN")} VND
            </div>
          </div>
        )}

        <div className="summary-divider"></div>

        <div className="summary-line total">
          <span>Tổng tiền:</span>
          <div className="summary-value total-value">
            {finalPrice.toLocaleString("vi-VN")} VND
          </div>
        </div>

        <div className="checkbox-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>Tôi chấp nhận với các điều khoản</span>
          </label>
        </div>

        <div className="summary-buttons">
          <Link to="/" className="btn cancel-btn">
            Hủy
          </Link>
          <button className="btn pay-btn" onClick={handleValidateBeforePayment}>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
