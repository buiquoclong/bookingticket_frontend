import React, { useState, useEffect, useRef } from "react";
import "./ModelComponents.scss";
import { getCurrentDateTimeLocal } from "../../../Utils/bookingUtils";
import { BASE_URL } from "../../../Utils/apiUrls";

const EditModal = ({
  visible,
  title = "Chỉnh sửa",
  data,
  fields = [], // [{ key: "name", label: "Tên", type: "text" }, { key: "startDay", label: "Ngày bắt đầu", type: "datetime" }, ...]
  onSave,
  onCancel,
  onFieldChange,
}) => {
  const [formData, setFormData] = useState({});
  const inputRefs = useRef({});

  // Convert table / ISO string -> input "YYYY-MM-DDTHH:mm"
  const formatToInput = (isoStr) => {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    if (isNaN(d)) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  useEffect(() => {
    if (data) {
      const newData = { ...data };

      fields.forEach((field) => {
        if (field.key === "routeId" && data.route?.id) {
          newData.routeId = data.route.id;
        }
        if (
          field.key === "kindVehicleId" &&
          (data.kindVehicle?.id || data.vehicle?.kindVehicle?.id)
        ) {
          newData.kindVehicleId =
            data.kindVehicle?.id || data.vehicle?.kindVehicle?.id;
        }
        if (field.key === "vehicleId" && data.vehicle?.id) {
          newData.vehicleId = data.vehicle.id;
        }
        if (field.key === "driverId" && data.driver?.id) {
          newData.driverId = data.driver.id;
        }
        if (field.type === "datetime" && data[field.key]) {
          newData[field.key] = formatToInput(data[field.key]);
        }
      });

      if (data.diemDi) newData.diemdi = data.diemDi.id;
      if (data.diemDen) newData.diemden = data.diemDen.id;

      setFormData(newData);
    }
  }, [data, fields]);

  if (!visible) return null;
  const cities = fields.find((f) => f.key === "diemdi")?.options || [];

  const handleChange = (key, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };

      // --- Logic startDay/endDay
      if (key === "startDay" && updated.endDay && updated.endDay < value) {
        updated.endDay = "";
      }
      if (key === "endDay" && updated.startDay && updated.startDay > value) {
        updated.startDay = "";
      }

      // --- Xử lý dayStart
      if (key === "dayStart") {
        const today = getCurrentDateTimeLocal().split("T")[0];
        if (value < today) {
          alert("Ngày khởi hành không được nhỏ hơn ngày hiện tại!");
          return prev;
        }
        updated.timeStart = ""; // reset timeStart khi đổi ngày

        // --- CHỈ GỌI CALLBACK 1 LẦN VỚI GIÁ TRỊ MỚI
        if (onFieldChange) onFieldChange(key, value, value);
      }

      // --- Logic diemdi/diemden
      if (key === "diemdi" || key === "diemden") {
        const diemDiName =
          cities.find((c) => c.id === parseInt(updated.diemdi))?.name ?? "";
        const diemDenName =
          cities.find((c) => c.id === parseInt(updated.diemden))?.name ?? "";
        updated.name = `${diemDiName} - ${diemDenName}`;
      }

      // --- Logic price
      // if (key === "price") {
      //   const numericValue = value.toString().replace(/\D/g, "");
      //   updated[key] = numericValue;
      // }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData };
    // Nếu status không có, mặc định 1
    if (!finalData.status) finalData.status = 1;
    // Gửi ISO 8601 trực tiếp, backend Spring Boot parse được LocalDateTime
    if (formData.newImage) {
      finalData.file = formData.newImage; // thêm file mới
    }
    onSave(finalData);
  };
  // const formatPrice = (value) => {
  //   if (!value) return "";
  //   return new Intl.NumberFormat("vi-VN").format(value);
  // };
  const handlePriceInput = (value) => {
    const numericValue = value.replace(/\D/g, ""); // chỉ giữ số
    setFormData((prev) => ({ ...prev, price: numericValue }));
  };
  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div className="form-group" key={field.key}>
                <label>{field.label}</label>

                {/* 🔹 Nếu là file ảnh */}
                {field.type === "file" ? (
                  <>
                    {/* Hiển thị ảnh hiện tại nếu có */}
                    {formData.imgUrl && !formData.newImage && (
                      <div className="image-preview">
                        <img
                          src={
                            formData.imgUrl.startsWith("http")
                              ? formData.imgUrl
                              : `${BASE_URL.replace("/api", "")}${
                                  formData.imgUrl
                                }`
                          }
                          alt="Current"
                          className="current-image"
                        />
                      </div>
                    )}

                    {/* Hiển thị ảnh mới nếu người dùng đã chọn */}
                    {formData.newImage && (
                      <div className="image-preview">
                        <img
                          src={formData.newImagePreview}
                          alt="New Preview"
                          className="current-image"
                        />
                      </div>
                    )}

                    {/* Input chọn ảnh mới */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const preview = URL.createObjectURL(file);
                          setFormData((prev) => ({
                            ...prev,
                            newImage: file,
                            newImagePreview: preview,
                          }));
                        }
                      }}
                    />
                  </>
                ) : field.type === "select" && field.options ? (
                  <select
                    value={
                      formData[field.key] !== undefined &&
                      formData[field.key] !== null
                        ? String(formData[field.key])
                        : ""
                    }
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">-- Chọn --</option>
                    {Array.isArray(field.options)
                      ? field.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))
                      : Object.entries(field.options).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                  </select>
                ) : field.type === "datetime" ? (
                  <div
                    className="datetime-wrapper"
                    onClick={() => inputRefs.current[field.key]?.showPicker?.()}
                  >
                    <input
                      type="datetime-local"
                      ref={(el) => (inputRefs.current[field.key] = el)}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    min={getCurrentDateTimeLocal().split("T")[0]}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : field.type === "time" ? (
                  <input
                    type="time"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : field.key === "price" ? (
                  <input
                    type="text"
                    value={formData.price ?? ""}
                    onChange={(e) => handlePriceInput(e.target.value)}
                    onBlur={() =>
                      setFormData((prev) => ({
                        ...prev,
                        price: prev.price ? Number(prev.price) : "",
                      }))
                    }
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}

            <div className="modal-actions">
              <button type="button" className="cancel" onClick={onCancel}>
                Hủy
              </button>
              <button type="submit" className="save">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
