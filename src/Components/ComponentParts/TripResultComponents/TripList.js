import React, { useRef, useState } from "react";
import TripCard from "./TripCard";
import empty_list from "../../../Assets/img/empty_list.svg";
import { Link } from "react-router-dom";
import "./TripResultComponents.scss";

const TripList = ({
  data,
  selectedSeatsById,
  seats,
  setSeats,
  handleClick,
  calculateTotalPriceById,
  formatSelectedSeatsById,
  handleContinueClick,
}) => {
  const cardRefs = useRef({}); // chứa ref theo trip.id
  const [activeTripId, setActiveTripId] = useState(null); // 👈 quản lý trip nào đang mở
  const [activeTab, setActiveTab] = useState(null); // 1: chọn ghế, 3: chính sách

  const handleScrollToTrip = (tripId) => {
    const card = cardRefs.current[tripId];
    if (!card) return;

    const offset = -70; // khoảng cách chừa trên cùng

    // Kiểm tra xem đang ở admin layout không
    const adminMain = document.querySelector(".admin-main");

    if (adminMain) {
      // Scroll trong container admin
      const elementPosition = card.offsetTop;
      adminMain.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    } else {
      // Scroll window như client
      const elementPosition = card.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleOpenTripTab = (tripId, tab) => {
    // Nếu click lại cùng trip và tab đang mở → đóng
    if (activeTab?.tripId === tripId && activeTab?.tab === tab) {
      setActiveTripId(null);
      setActiveTab(null);
    } else {
      setActiveTripId(tripId);
      setActiveTab({ tripId, tab });
      // scroll sau khi render xong, đảm bảo tab cũ đã đóng
      setTimeout(() => {
        handleScrollToTrip(tripId);
      }, 50); // 50ms là đủ, có thể điều chỉnh
    }
  };
  return (
    <div className="cardListResult">
      {data && data.length > 0 ? (
        <div className="trip-cards-grid">
          {data.map((trip) => (
            <div key={trip.id} ref={(el) => (cardRefs.current[trip.id] = el)}>
              <TripCard
                key={trip.id}
                trip={trip}
                selectedSeatsById={selectedSeatsById}
                seats={seats}
                setSeats={setSeats}
                handleClick={handleClick}
                calculateTotalPriceById={calculateTotalPriceById}
                formatSelectedSeatsById={formatSelectedSeatsById}
                handleContinueClick={handleContinueClick}
                onScrollToTrip={() => handleScrollToTrip(trip.id)}
                activeTripId={activeTripId}
                activeTab={activeTab}
                onOpenTripTab={handleOpenTripTab}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty_data">
          <img src={empty_list} alt="no data" />
          <span>Không có kết quả được tìm thấy</span>
          <Link to="/">
            <button className="btn backbtn">Trở lại</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TripList;
