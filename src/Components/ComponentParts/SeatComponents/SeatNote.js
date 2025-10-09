import React from "react";
import "./SeatComponents.scss";

const SeatNote = () => (
  <div className="seatNoteColumn">
    <div className="seatNoteItem">
      <div className="seatIcon seatSaled"></div>
      <span>Đã bán</span>
    </div>
    <div className="seatNoteItem">
      <div className="seatIcon seatNonChose"></div>
      <span>Còn trống</span>
    </div>
    <div className="seatNoteItem">
      <div className="seatIcon seatChosing"></div>
      <span>Đang chọn</span>
    </div>
  </div>
);

export default SeatNote;
