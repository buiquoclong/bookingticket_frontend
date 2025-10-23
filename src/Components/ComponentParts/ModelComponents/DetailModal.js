import React from "react";
import "./ModelComponents.scss";
import AdminTable from "../AdminComponents/AdminTable";

const DetailModal = ({
  visible,
  title = "Chi tiết",
  data = [],
  columns = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onClose,
}) => {
  if (!visible) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("detail-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="detail-modal-overlay" onClick={handleOutsideClick}>
      <div className="detail-modal-dialog">
        <div className="detail-modal-content">
          <div className="detail-modal-header">
            <h2>{title}</h2>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="detail-modal-body">
            <AdminTable
              columns={columns}
              data={data}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showActions={false}
              disablePagination={true}
              isDetail={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
