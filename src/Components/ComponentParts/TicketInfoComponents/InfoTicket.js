// InfoTicket.js
import { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import "./TicketInfoComponents.scss";
import { formatDate } from "../../../Utils/bookingUtils";

const InfoTicket = ({
  title,
  data,
  selectedSeatsNames,
  totalPrice,
  note,
  onNoteChange,
  showLocationInput,
  handleSwitchChange,
  pickupLocation,
  handlePickupLocationChange,
  catchPoints = [],
}) => {
  const [editing, setEditing] = useState(false);
  const [tempNote, setTempNote] = useState(note || "");

  // Đồng bộ khi note ở parent thay đổi
  useEffect(() => {
    setTempNote(note || "");
  }, [note]);

  const handleSave = () => {
    onNoteChange(tempNote);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempNote(note || "");
    setEditing(false);
  };

  if (!data) return null;
  return (
    <div className="ticket-card">
      <div className="ticket-card__header">
        <h3>{title}</h3>
      </div>

      <div className="ticket-card__body">
        {/** Thông tin cơ bản */}
        <div className="ticket-card__row">
          <span className="label">Tuyến:</span>
          <span className="value">{data.route.name}</span>
        </div>

        <div className="ticket-card__row">
          <span className="label">Loại xe:</span>
          <span className="value">{data.vehicle.kindVehicle.name}</span>
        </div>

        <div className="ticket-card__row">
          <span className="label">Ngày:</span>
          <span className="value">
            {data.dayStart && formatDate(data.dayStart)}
          </span>
        </div>

        <div className="ticket-card__row">
          <span className="label">Thời gian:</span>
          <span className="value">{data.timeStart.slice(0, 5)}</span>
        </div>

        {/** Ghế */}
        <div className="ticket-card__row">
          <span className="label">Số ghế:</span>
          <div className="ticket-card__seats">
            {selectedSeatsNames.split(",").map((seat) => (
              <span key={seat} className="ticket-card__seat">
                {seat}
              </span>
            ))}
          </div>
        </div>

        {/** Giá */}
        <div className="ticket-card__row">
          <span className="label">Giá:</span>
          <span className="value">
            {totalPrice.toLocaleString("vi-VN")} VND
          </span>
        </div>

        {/** Ghi chú */}
        <div className="ticket-card__row ticket-card__note">
          <span className="label">Ghi chú:</span>

          {editing ? (
            <div className="note-input-wrapper">
              <input
                type="text"
                className="ticket-card__input"
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                placeholder="Thêm ghi chú ở đây"
              />
              <button className="note-btn save" onClick={handleSave}>
                ✔
              </button>
              <button className="note-btn cancel" onClick={handleCancel}>
                ✖
              </button>
            </div>
          ) : (
            <span
              className="ticket-card__text"
              onClick={() => setEditing(true)}
              title={tempNote || "Thêm ghi chú"}
            >
              {tempNote || "Thêm ghi chú"}
            </span>
          )}
        </div>

        {/** Switch chọn điểm đón */}
        <div className="ticket-card__row ticket-card__switch">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showLocationInput}
                  onChange={handleSwitchChange}
                  color="primary"
                  size="medium"
                />
              }
              label="Chọn điểm đón"
              labelPlacement="start"
            />
          </FormGroup>
        </div>

        <div
          className={`ticket-card__row ticket-card__pickup ${
            showLocationInput ? "active" : ""
          }`}
        >
          <span className="label">Nơi đón:</span>
          <div className="pickup-select-wrapper">
            <select
              className="ticket-card__input ticket-card__select"
              value={pickupLocation}
              onChange={handlePickupLocationChange}
            >
              <option value="">Chọn nơi đón</option>
              {catchPoints.map((point) => (
                <option key={point.id} value={point.name}>
                  {point.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTicket;
