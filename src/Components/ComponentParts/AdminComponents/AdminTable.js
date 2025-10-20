import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import "./TableComponent.scss";

// 👉 Hàm định dạng thời gian
const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  const formattedDate = date
    .toLocaleDateString("vi-VN", optionsDate)
    .replace(/\//g, "/");
  const formattedTime = date
    .toLocaleTimeString("vi-VN", optionsTime)
    .replace(/:/g, ":");
  return `${formattedTime} ${formattedDate}`;
};

// 👉 Hàm lấy giá trị lồng nhau (nested)
const getValueByKey = (obj, key) => {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const AdminTable = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  statusColorMap = {},
  statusMap = {},
  roleMap = {},
  showActions = true,
}) => {
  return (
    <div className="admin-table">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {showActions && <th className="action-col">Hành động</th>}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                {columns.map((col) => {
                  let cellValue = getValueByKey(item, col.key);

                  // 👉 Format datetime
                  if (col.key === "startDay" || col.key === "endDay") {
                    cellValue = formatDateTime(cellValue);
                  }

                  // 👉 Hiển thị status/level với màu
                  if (col.key === "status" || col.key === "level") {
                    const color = statusColorMap[cellValue] || "#ccc";
                    const label =
                      statusMap[cellValue] || cellValue || "Unknown";
                    return (
                      <td key={col.key}>
                        <div
                          className="status-badge"
                          style={{ backgroundColor: color }}
                        >
                          {label}
                        </div>
                      </td>
                    );
                  }

                  if (col.key === "role") {
                    const label =
                      roleMap[cellValue] || cellValue || "Không xác định";
                    return <td key={col.key}>{label}</td>;
                  }

                  return (
                    <td key={col.key}>
                      {col.cell ? col.cell(item) : cellValue}
                    </td>
                  );
                })}

                {showActions && (
                  <td className="action-buttons">
                    {onEdit && (
                      <Tooltip title="Sửa" arrow>
                        <button
                          className="btn edit"
                          onClick={() => onEdit(item)}
                        >
                          <FaEdit />
                        </button>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title="Xóa" arrow>
                        <button
                          className="btn delete"
                          onClick={() => onDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </Tooltip>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="no-data"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          boundaryCount={1}
          siblingCount={1}
          color="primary"
          showFirstButton
          showLastButton
          onChange={(e, page) => onPageChange(page)}
        />
      </div>
    </div>
  );
};

export default AdminTable;
