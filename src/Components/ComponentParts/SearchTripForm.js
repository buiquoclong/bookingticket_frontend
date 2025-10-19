import React, { useRef, useEffect } from "react";
import { HiFilter } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ComponentParts.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ComponentParts.scss";

const SearchTripForm = (
  { formValues, setFormValues, cities, navigateTo },
  ref
) => {
  const navigate = useNavigate();
  const startRef = useRef(null);
  const returnRef = useRef(null);
  const {
    kind,
    origin,
    destination,
    originId,
    destinationId,
    dayStart,
    dayReturn,
  } = formValues;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChangeKind = (e) => {
    setFormValues((prev) => ({ ...prev, kind: e.target.value }));
  };

  const handleOriginChange = (e) => {
    const selected = cities.find((c) => c.name === e.target.value);
    if (!selected) return;

    if (destinationId && selected.id === destinationId) {
      toast.error("Điểm đi và điểm đến không được giống nhau");
      return;
    }
    setFormValues((prev) => ({
      ...prev,
      originId: selected.id,
      origin: selected.name,
    }));
  };

  const handleDestinationChange = (e) => {
    const selected = cities.find((c) => c.name === e.target.value);
    if (!selected) return;

    if (originId && selected.id === originId) {
      toast.error("Điểm đi và điểm đến không được giống nhau");
      return;
    }
    setFormValues((prev) => ({
      ...prev,
      destinationId: selected.id,
      destination: selected.name,
    }));
  };

  const handleDayStartChange = (e) => {
    const val = e.target.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(val) < today) {
      toast.error("Bạn không thể chọn ngày trong quá khứ!");
      return;
    }
    setFormValues((prev) => ({ ...prev, dayStart: val }));
  };

  const handleDayReturnChange = (e) => {
    const val = e.target.value;
    const today = new Date();
    if (new Date(val) < today) {
      toast.error("Bạn không thể chọn ngày trong quá khứ!");
      return;
    }
    if (new Date(dayStart) > new Date(val)) {
      toast.error("Ngày về phải là ngày sau ngày đi!");
      return;
    }
    setFormValues((prev) => ({ ...prev, dayReturn: val }));
  };

  const sendData = (e) => {
    e.preventDefault();
    let missing = [];

    if (!formValues.originId) missing.push("Địa điểm xuất phát");
    if (!formValues.destinationId) missing.push("Địa điểm đến");
    if (!formValues.dayStart) missing.push("Ngày đi");
    if (formValues.kind === "Khứ hồi" && !formValues.dayReturn)
      missing.push("Ngày về");

    if (missing.length > 0) {
      toast.error(
        `Vui lòng điền thông tin còn thiếu:\n- ${missing.join(", ")}`
      );
      return;
    }

    // Map formValues sang format cũ
    navigate(navigateTo, {
      state: {
        diemDiId: formValues.originId,
        diemDiName: formValues.origin,
        diemDenId: formValues.destinationId,
        diemDenName: formValues.destination,
        dayStart: formValues.dayStart,
        dayReturn: formValues.dayReturn,
        kind: formValues.kind,
      },
    });
  };
  function getCurrentDateTimeLocal() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // thêm '0' nếu cần
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const form = document.querySelector(".trip-form");
    if (form) {
      form.classList.add("transitioning");
      const timeout = setTimeout(
        () => form.classList.remove("transitioning"),
        450
      );
      return () => clearTimeout(timeout);
    }
  }, [kind]);
  return (
    <div
      className="cardDiv"
      data-aos="fade-up" // hiệu ứng từ dưới lên
      data-aos-duration="1000" // thời gian animation
    >
      <div className="trip-type-card">
        <h3 className="trip-type-title">Loại chuyến đi</h3>

        <div className="trip-type-toggle">
          <label
            className={`trip-option ${kind === "Một chiều" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="kind"
              value="Một chiều"
              checked={kind === "Một chiều"}
              onChange={handleChangeKind}
            />
            <span>Một chiều</span>
          </label>

          <label
            className={`trip-option ${kind === "Khứ hồi" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="kind"
              value="Khứ hồi"
              checked={kind === "Khứ hồi"}
              onChange={handleChangeKind}
            />
            <span>Khứ hồi</span>
          </label>

          <div
            className={`active-bg ${kind === "Khứ hồi" ? "right" : "left"}`}
          ></div>
        </div>
      </div>
      {/* Form chọn chuyến đi */}
      <div
        className={`trip-form ${kind === "Khứ hồi" ? "round-trip" : "one-way"}`}
      >
        {/* Điểm xuất phát */}
        <div className="trip-field">
          <label>Điểm xuất phát</label>
          <select
            className="trip-input"
            value={origin}
            onChange={handleOriginChange}
          >
            <option value="">Chọn địa điểm xuất phát...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Điểm đến */}
        <div className="trip-field">
          <label>Điểm đến</label>
          <select
            className="trip-input"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">Chọn địa điểm muốn đến...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày đi */}
        <div className="trip-field">
          <label>Ngày đi</label>
          <input
            type="date"
            ref={startRef}
            value={dayStart}
            onChange={handleDayStartChange}
            min={getCurrentDateTimeLocal()}
            className="trip-input"
          />
        </div>

        {/* Ngày về (chỉ hiển thị khi là Khứ hồi) */}
        {kind === "Khứ hồi" && (
          <div
            className={`trip-field return-field ${
              kind === "Khứ hồi" ? "active" : ""
            }`}
          >
            <label>Ngày về</label>
            <input
              type="date"
              ref={returnRef}
              value={dayReturn}
              onChange={handleDayReturnChange}
              min={dayStart ? dayStart : undefined}
              className="trip-input"
            />
          </div>
        )}
      </div>
      {/* Nút tìm chuyến */}
      <div className="searchOption" onClick={sendData}>
        <HiFilter className="icon" />
        <span>Tìm chuyến</span>
      </div>
    </div>
  );
};

export default SearchTripForm;
