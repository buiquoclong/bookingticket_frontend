import React from "react";
import "./TripResultComponents.scss";
import { FaMapMarkerAlt, FaBus } from "react-icons/fa";

const TripCardMain = ({ trip }) => {
  function getTripEndTime(trip) {
    const startTime = new Date(`${trip.dayStart}T${trip.timeStart}`);
    const routeTime = parseInt(trip.route.timeOfRoute, 10);
    const endTime = new Date(startTime.getTime() + routeTime * 60 * 60 * 1000);
    const formattedEndTime = endTime
      .toLocaleTimeString("en-US", { hour12: false })
      .slice(0, 5);
    return formattedEndTime;
  }
  return (
    <div className="trip-card">
      <div className="trip-left">
        <div className="trip-route">
          {/* Điểm bắt đầu */}
          <div className="route-point start">
            <div className="top">
              <span className="time">{trip.timeStart.slice(0, 5)}</span>
              <FaBus className="icon" />
            </div>
            <span className="location">{trip.route.diemDi.name}</span>
          </div>

          {/* Giữa tuyến */}
          <div className="route-center">
            <div className="line-wrapper">
              <span className="line-dot"></span>
              <span className="duration">
                {trip.route.timeOfRoute} giờ
                <br />
                <span className="timezone">(Asia/Ho Chi Minh)</span>
              </span>
              <span className="line-dot"></span>
            </div>
          </div>

          {/* Điểm đến */}
          <div className="route-point end">
            <div className="top">
              <FaMapMarkerAlt className="icon" />
              <span className="time">{getTripEndTime(trip)}</span>
            </div>
            <span className="location">{trip.route.diemDen.name}</span>
          </div>
        </div>
      </div>

      {/* Thông tin xe, chỗ, giá */}
      <div className="trip-right">
        <div className="vehicle-info">
          <span className="dot"></span>
          <span className="vehicle-name">{trip.vehicle.kindVehicle.name}</span>
          <span className="dot"></span>
          <span className="seat-count">{trip.emptySeat} chỗ trống</span>
        </div>
        <div className="price">{trip.price.toLocaleString("vi-VN")} VND</div>
      </div>

      {/* Divider */}
      <div className="divider"></div>
    </div>
  );
};

export default TripCardMain;
