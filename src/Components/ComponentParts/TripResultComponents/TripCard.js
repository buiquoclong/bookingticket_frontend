import React from "react";
import "./TripResultComponents.scss";
import TripTabs from "./TripTabs";
import TripCardMain from "./TripCardMain";

const TripCard = ({
  trip,
  selectedSeatsById,
  seats,
  setSeats,
  handleClick,
  calculateTotalPriceById,
  formatSelectedSeatsById,
  handleContinueClick,
  onScrollToTrip,
  activeTripId,
  activeTab,
  onOpenTripTab,
}) => {
  return (
    <div className="cardOneResult">
      <TripCardMain trip={trip} />

      {/* Tabs */}
      <div className="choseRoute">
        <TripTabs
          trip={trip}
          seats={seats}
          setSeats={setSeats}
          selectedSeatsById={selectedSeatsById}
          handleClick={handleClick}
          calculateTotalPriceById={calculateTotalPriceById}
          formatSelectedSeatsById={formatSelectedSeatsById}
          handleContinueClick={handleContinueClick}
          onScrollToTrip={onScrollToTrip}
          activeTripId={activeTripId}
          activeTab={activeTab}
          onOpenTripTab={onOpenTripTab}
        />
      </div>
    </div>
  );
};

export default TripCard;
