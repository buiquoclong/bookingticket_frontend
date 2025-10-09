import React from "react";
import "./SeatComponents.scss";

import seat_active from "../../../Assets/img/seat_active.svg";
import seat_disabled from "../../../Assets/img/seat_disabled.svg";
import seat_selecting from "../../../Assets/img/seat_selecting.svg";
import { SEAT_STATUS } from "../../../Utils/bookingUtils";
const SeatTable = ({ seats, selectedSeatsById, trip, handleClick }) => {
  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }
  const getSeatDisplayProps = (status, isSelected) => {
    switch (status) {
      case SEAT_STATUS.SOLD: // đã bán
        return {
          src: seat_disabled,
          tdStyle: { cursor: "not-allowed" },
          spanStyle: { color: "#A2ABB3" },
        };
      case SEAT_STATUS.RESERVED: // Được chọn
        return {
          src: seat_selecting,
          tdStyle: {},
          spanStyle: { color: "#EF5222" },
        };
      case SEAT_STATUS.AVAILABLE:
      default:
        return isSelected
          ? {
              src: seat_selecting,
              tdStyle: {},
              spanStyle: { color: "#EF5222" },
            }
          : {
              src: seat_active,
              tdStyle: {},
              spanStyle: {},
            }; // Default case
    }
  };
  return (
    <table className="seatTable">
      <tbody>
        {seats &&
          seats.length > 0 &&
          chunkArray(seats, 3).map((seatRow, rowIndex) => (
            <tr className="seatNum" key={rowIndex}>
              {seatRow.map((seat, seatIndex) => {
                const { src, spanStyle, tdStyle } = getSeatDisplayProps(
                  seat.status
                );
                const isSelected = selectedSeatsById[trip.id]?.some(
                  (s) => s.id === seat.id
                );

                return (
                  <React.Fragment key={seat.id}>
                    <td
                      className="singleSeat"
                      style={tdStyle}
                      onClick={() => handleClick(seat.id, trip.id)}
                    >
                      <img
                        style={{ width: "32px" }}
                        src={isSelected ? seat_selecting : src}
                        alt="seat icon"
                      />
                      <span
                        className="numSeatA"
                        style={isSelected ? { color: "#EF5222" } : spanStyle}
                      >
                        {seat.name}
                      </span>
                    </td>
                    {seatIndex < 2 && <td style={{ width: "1.5rem" }}></td>}
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SeatTable;
