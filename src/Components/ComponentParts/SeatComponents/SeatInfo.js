import "../SeatComponents/SeatComponents.scss";
import { FaInfoCircle } from "react-icons/fa";
const SeatInfo = ({
  tripId,
  selectedSeatsById,
  calculateTotalPriceById,
  formatSelectedSeatsById,
  handleContinueClick,
}) => {
  const selectedSeats = selectedSeatsById[tripId] || [];

  // Nếu chưa chọn ghế → hiển thị thông báo gợi ý
  if (!selectedSeats.length) {
    return (
      <div className="seatBook-empty">
        <FaInfoCircle className="empty-icon" />
        <p>Chưa có ghế nào được chọn</p>
        <span>Vui lòng chọn ghế ở bảng bên trái để tiếp tục</span>
      </div>
    );
  }

  return (
    <div className="seatBook">
      {/* Top: Thông tin vé */}
      <div className="seatBook-top">
        <div className="ticketInfo">
          <span className="numOfTicket">{selectedSeats.length} Vé</span>
          <span className="seatNames">{formatSelectedSeatsById(tripId)}</span>
        </div>
      </div>

      {/* Bottom: Giá và nút tiếp tục */}
      <div className="seatBook-bottom">
        <span className="totalPrice">
          Tổng tiền: {calculateTotalPriceById(tripId).toLocaleString("vi-VN")}đ
        </span>
        <button
          type="button"
          className="chooseButton"
          onClick={() => handleContinueClick(tripId)}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default SeatInfo;
