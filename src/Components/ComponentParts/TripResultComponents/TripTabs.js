import SeatTable from "../SeatComponents/SeatTable";
import SeatNote from "../SeatComponents/SeatNote";
import SeatInfo from "../SeatComponents/SeatInfo";
import PolicyTab from "../PolicyComponents/PolicyTab";

import "./TripResultComponents.scss";
import { sendRequest } from "../../../Utils/apiHelper";
import { GET_SEAT_BY_TRIP_AND_KIND } from "../../../Utils/apiUrls";

const TripTabs = ({
  trip,
  seats,
  setSeats,
  selectedSeatsById,
  handleClick,
  calculateTotalPriceById,
  formatSelectedSeatsById,
  handleContinueClick,
  onScrollToTrip,
  activeTab,
  onOpenTripTab,
}) => {
  const handleTabClick = async (tab, tripId, kindVehicleId) => {
    onOpenTripTab(tripId, tab);

    // ✅ Gọi scroll khi click tab chọn ghế
    if (tab === 1 && onScrollToTrip) {
      onScrollToTrip();
    }

    if (tab === 1) {
      console.log("tab1");
      console.log("tripId", tripId);
      console.log("kindVehicleId", kindVehicleId);

      try {
        const data = await sendRequest(
          GET_SEAT_BY_TRIP_AND_KIND(tripId, kindVehicleId)
        );
        console.log("Seats:", data);
        setSeats(data); // dữ liệu có sẵn status từ backend
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    }
  };

  return (
    <div className="chosseRouteTab">
      <div className="tabContainer" role="tablist">
        <div className="tabListWrapper">
          <div className="tabList">
            {/* Tab 1: Chọn ghế */}
            <button
              className={`tabItem ${
                activeTab?.tripId === trip.id && activeTab.tab === 1
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleTabClick(1, trip.id, trip.vehicle.kindVehicle.id)
              }
              role="tab"
            >
              <span className="tabName">Chọn ghế</span>
            </button>

            {/* Tab 3: Chính sách */}
            <button
              className={`tabItem ${
                activeTab?.tripId === trip.id && activeTab.tab === 3
                  ? "active"
                  : ""
              }`}
              onClick={() => handleTabClick(3, trip.id)}
              role="tab"
            >
              <span className="tabName">Chính sách</span>
            </button>
          </div>

          {/* Nút chọn chuyến */}
          <button
            className="btn chooseRouteBtn"
            onClick={() =>
              handleTabClick(1, trip.id, trip.vehicle.kindVehicle.id)
            }
          >
            Chọn chuyến
          </button>
        </div>
      </div>

      {/* Nội dung tab */}
      {activeTab?.tripId === trip.id && activeTab.tab === 1 && (
        <div className="choose-seats">
          <div className="seats-container">
            {/* Left: SeatNote + SeatTable */}
            <div className="left-seats">
              <div className="note-wrapper">
                <SeatNote />
              </div>
              <div className="table-wrapper">
                <div className="table-header">Danh sách ghế</div>
                <SeatTable
                  seats={seats}
                  selectedSeatsById={selectedSeatsById}
                  trip={trip}
                  handleClick={handleClick}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="seats-divider"></div>

            {/* Right: SeatInfo */}
            <div className="seats-right">
              <SeatInfo
                tripId={trip.id}
                selectedSeatsById={selectedSeatsById}
                calculateTotalPriceById={calculateTotalPriceById}
                formatSelectedSeatsById={formatSelectedSeatsById}
                handleContinueClick={handleContinueClick}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab?.tripId === trip.id && activeTab.tab === 3 && (
        <div className="chooseTab">
          <div className="chooseListTab">
            <div className="chooseSeatTab">
              <div className="chooseSeatContent">
                <PolicyTab />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripTabs;
