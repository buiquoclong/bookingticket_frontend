import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import "./TripResultComponents.scss";
import { formatDate } from "../../../Utils/bookingUtils";
const SearchResultsHeader = ({
  diemDiName,
  diemDenName,
  kind,
  dayStart,
  kindVehicledata,
  handleTimeChange,
  handleSortChange,
  handleKindChange,
  isReturn,
  onBackClick,
}) => {
  const timeOptions = [
    { value: "", text: "Chọn giờ" },
    { value: "1", text: "00:01 - 06:00" },
    { value: "2", text: "06:01 - 12:00" },
    { value: "3", text: "12:01 - 18:00" },
    { value: "4", text: "18:01 - 23:59" },
  ];

  const sortOptions = [
    { value: "", text: "Xếp giá" },
    { value: "-1", text: "Cao - Thấp" },
    { value: "1", text: "Thấp - Cao" },
  ];

  const vehicleOptions = [
    { value: "", text: "Loại xe" },
    ...kindVehicledata.map((kind) => ({ value: kind.id, text: kind.name })),
  ];

  // Tập hợp các filter để map dễ dàng
  const filters = [
    {
      label: "Chọn khung giờ đi:",
      options: timeOptions,
      onChange: handleTimeChange,
    },
    { label: "Xếp giá vé:", options: sortOptions, onChange: handleSortChange },
    { label: "Chọn xe:", options: vehicleOptions, onChange: handleKindChange },
  ];

  const displayDiName = isReturn ? diemDenName : diemDiName;
  const displayDenName = isReturn ? diemDiName : diemDenName;

  return (
    <div className="results-header">
      {/* Back link */}
      <button className="back-link" onClick={onBackClick}>
        <span className="icon-wrapper">
          <FaAngleLeft className="icon" />
        </span>
        <span className="link-text">Trở lại</span>
      </button>

      {/* Trip info */}
      <div className="trip-info">
        <h1>
          Chuyến: {displayDiName} - {displayDenName}
          {kind === "Khứ hồi" && !isReturn && <span> (Lượt đi)</span>}
          {kind === "Khứ hồi" && isReturn && <span> (Lượt về)</span>}
        </h1>
        <h1>Ngày: {formatDate(dayStart)}</h1>
      </div>

      {/* Filters */}
      <div className="filters">
        {filters.map((filter, index) => (
          <div className="filter-item" key={index}>
            <label>{filter.label}</label>
            <select onChange={filter.onChange}>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsHeader;
