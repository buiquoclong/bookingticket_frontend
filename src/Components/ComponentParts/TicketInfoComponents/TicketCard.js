import React from "react";
import "./TicketInfoComponents.scss";
import { formatDate } from "../../../Utils/bookingUtils";

const TicketCard = ({
  detail,
  kindTrip,
  statusMap,
  statusColorMap,
  handleRating,
}) => {
  return (
    <div className="ticket-card" key={detail.id}>
      <div className="ticket-header">
        <h3>Mã vé: {detail.id}</h3>
        <span className="trip-name">{detail.trip.route.name}</span>
      </div>

      <div className="ticket-body">
        <div className="line">
          <span>Loại xe:</span>
          {detail.trip.vehicle.kindVehicle.name}
        </div>
        <div className="line">
          <span>Biển số:</span>
          {detail.trip.vehicle.vehicleNumber}
        </div>
        <div className="line">
          <span>Ngày:</span>
          {formatDate(detail.trip.dayStart)}
        </div>
        <div className="line">
          <span>Giờ khởi hành:</span>
          {detail.trip.timeStart.slice(0, 5)}
        </div>
        <div className="line">
          <span>Lượt:</span>
          {kindTrip[detail.roundTrip]}
        </div>
        <div className="line seat-list">
          <span className="label">Ghế đã đặt:</span>
          <div className="seat-badges">
            {detail.seatName ? (
              detail.seatName.split(",").map((seat) => (
                <span key={seat.trim()} className="seat-badge">
                  {seat.trim()}
                </span>
              ))
            ) : (
              <span className="no-seat">Chưa có ghế</span>
            )}
          </div>
        </div>

        <div className="line">
          <span>Nơi đón:</span>
          {detail.pointCatch}
        </div>
        <div className="line">
          <span>Ghi chú:</span>
          {detail.note || "Không có"}
        </div>
        <div className="line price">
          <span>Tổng tiền:</span>
          <span className="price-value">
            {detail.price.toLocaleString("vi-VN")}đ
          </span>
        </div>

        <div className="status-section">
          {detail.booking.isPaid === 2 ? (
            <span className="status canceled">Đã hủy</span>
          ) : (
            <>
              <span
                className="status"
                style={{ color: statusColorMap[detail.trip.status] }}
              >
                {statusMap[detail.trip.status]}
              </span>
              {detail.trip.status === 2 && (
                <button
                  className="rating-btn"
                  onClick={() => handleRating(detail.trip)}
                >
                  Đánh giá
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
