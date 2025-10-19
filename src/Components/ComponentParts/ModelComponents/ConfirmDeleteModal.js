import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./ModelComponents.scss";

const ConfirmDeleteModal = ({
  visible,
  message,
  onConfirm,
  onCancel,
  type = "warning", // 'warning' | 'delete' | 'info'
}) => {
  const [closing, setClosing] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!visible) setClosing(false);
  }, [visible]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onCancel(), 300);
  };

  const handleShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  if (!visible) return null;

  return (
    <div className="confirm-modal-overlay">
      <div
        className={`confirm-modal-content ${type} ${
          closing ? "scale-out" : "scale-in"
        } ${shake ? "shake" : ""}`}
      >
        <div className="modal-icon">
          <FaExclamationTriangle />
        </div>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button
            className="btn cancel"
            onClick={() => {
              handleShake();
              handleClose();
            }}
          >
            Hủy
          </button>
          <button className="btn confirm" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
