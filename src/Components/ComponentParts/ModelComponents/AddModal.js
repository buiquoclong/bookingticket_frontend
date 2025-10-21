import React, { useState, useEffect, useRef } from "react";
import "./ModelComponents.scss";

const AddModal = ({
  visible,
  title,
  fields = [], // [{ key: "name", label: "Tên" }, { key: "startDay", label: "Ngày bắt đầu", type: "datetime" }, ...]
  onSave,
  onCancel,
  defaultValues = {}, // { status: 1 }
}) => {
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
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
      setPreviewImage(null);
      setFormData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

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

      return updated;
    });
  };
  const handleFileChange = (key, file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, [key]: file }));

    // Nếu là ảnh thì hiển thị preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData };
    // Nếu status không có, mặc định là 1
    if (!finalData.status) finalData.status = 1;
    onSave(finalData);
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
                {field.type === "select" && field.options ? (
                  <select
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">-- Chọn --</option>
                    {Array.isArray(field.options)
                      ? field.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name} {/* hoặc opt.label nếu có */}
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
                ) : field.type === "file" ? (
                  /* --- FILE UPLOAD --- */
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      accept={field.accept || "*/*"}
                      onChange={(e) =>
                        handleFileChange(field.key, e.target.files[0])
                      }
                    />
                    {previewImage && (
                      <div className="image-preview">
                        <img
                          src={previewImage}
                          alt="preview"
                          className="preview-img"
                        />
                      </div>
                    )}
                  </div>
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
