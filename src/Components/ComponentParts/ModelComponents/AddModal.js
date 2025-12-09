import React, { useState, useEffect, useRef } from "react";
import "./ModelComponents.scss";
import { getCurrentDateTimeLocal } from "../../../Utils/bookingUtils";
import { BASE_URL } from "../../../Utils/apiUrls";

const AddModal = ({
  visible,
  title,
  fields = [],
  onSave,
  onCancel,
  defaultValues = {},
  onFieldChange,
}) => {
  const [formData, setFormData] = useState({});
  const inputRefs = useRef({});

  // Convert table "HH:mm DD/MM/YYYY" -> "YYYY-MM-DDTHH:mm" (input)
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

  // Khi mở modal, set default values + format datetime
  useEffect(() => {
    if (visible) {
      const newData = {};
      fields.forEach((field) => {
        const val = defaultValues?.[field.key];
        if (field.type === "datetime" && val) {
          newData[field.key] = formatToInput(val);
        } else {
          newData[field.key] = val ?? "";
        }
      });
      setFormData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;
  const cities = fields.find((f) => f.key === "diemdi")?.options || [];
  const handleChange = (key, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };

      // Nếu chỉnh startDay và endDay < startDay thì reset endDay
      if (key === "startDay" && updated.endDay && updated.endDay < value) {
        updated.endDay = "";
      }

      // Nếu chỉnh endDay và startDay > endDay thì reset startDay
      if (key === "endDay" && updated.startDay && updated.startDay > value) {
        updated.startDay = "";
      }

      if (key === "diemdi" || key === "diemden") {
        const diemDiName =
          cities.find((c) => c.id === parseInt(updated.diemdi))?.name ?? "";
        const diemDenName =
          cities.find((c) => c.id === parseInt(updated.diemden))?.name ?? "";
        updated.name = `${diemDiName} - ${diemDenName}`;
      }
      if (onFieldChange) {
        // lấy dayStart hiện tại: nếu key đang thay đổi là "dayStart" thì lấy value mới, còn không lấy formData.dayStart
        const currentDayStart = key === "dayStart" ? value : formData.dayStart;

        // chỉ gọi nếu dayStart hợp lệ
        if (currentDayStart) {
          onFieldChange(key, value, currentDayStart);
        }
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData };
    // Nếu status không có, mặc định là 1
    if (finalData.status == null || finalData.status === "") {
      finalData.status = 1;
    }
    if (formData.newImage) {
      finalData.file = formData.newImage; // thêm file mới
    }
    onSave(finalData);
  };
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

                {field.type === "file" ? (
                  <>
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

                    {formData.newImage && (
                      <div className="image-preview">
                        <img
                          src={formData.newImagePreview}
                          alt="New Preview"
                          className="current-image"
                        />
                      </div>
                    )}

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
                    min={getCurrentDateTimeLocal()}
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
                Tạo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
