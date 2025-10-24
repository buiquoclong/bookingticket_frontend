import "./TicketInfoComponents.scss";
import { formatDate } from "../../../Utils/bookingUtils";

const BookingTicketInfo = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="booking-ticket-wrapper">
      <div className="ticket-grid">
        {data.map((detail) => (
          <div className="ticket-card" key={detail.id}>
            <h2 className="ticket-title">
              {detail.roundTrip === 0 ? "Lượt đi" : "Lượt về"}
            </h2>

            <div className="ticket-header">
              <h3>Mã vé: {detail.id}</h3>
              <span className="trip-name">{detail.trip.route.name}</span>
            </div>

            <div className="ticket-body">
              <div className="ticket-line">
                <span className="label">Loại xe:</span>
                <span>{detail.trip.vehicle.kindVehicle.name}</span>
              </div>

              <div className="ticket-line">
                <span className="label">Ngày:</span>
                <span>{formatDate(detail.trip.dayStart)}</span>
              </div>

              <div className="ticket-line">
                <span className="label">Giờ khởi hành:</span>
                <span>{detail.trip.timeStart.slice(0, 5)}</span>
              </div>

              <div className="ticket-line">
                <span className="label">Số ghế:</span>
                <span>{detail.quantity}</span>
              </div>

              <div className="ticket-line seat">
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

              <div className="ticket-line price">
                <span className="label">Giá:</span>
                <span className="price-value">
                  {detail.price.toLocaleString("vi-VN")} VND
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTicketInfo;
