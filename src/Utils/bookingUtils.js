export const SEAT_STATUS = {
  SOLD: 1,
  RESERVED: 2,
  AVAILABLE: 0,
};

// Format ngày
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
};

/* ============ COLUM DATA TABLE ============ */
/* ============ COLUM DRIVER ============ */
const statusDriverMap = {
  1: "Đang làm",
  2: "Tạm nghỉ",
  3: "Tạm khóa",
};

export const driverFields = [
  { key: "name", label: "Tên", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "phone", label: "Số điện thoại", type: "text" },
  {
    key: "status",
    label: "Trạng thái",
    type: "select",
    options: statusDriverMap,
  },
];

export const driverColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Tên tài xế" },
  { key: "email", label: "Địa chỉ Email" },
  { key: "phone", label: "Số điện thoại" },
  { key: "status", label: "Trạng thái" },
];

/* ============ COLUM PROMOTION ============ */
export const promotionColumn = [
  { key: "id", label: "ID" },
  { key: "code", label: "Mã giảm giá" },
  { key: "description", label: "Mô tả" },
  { key: "startDay", label: "Ngày bắt đầu" },
  { key: "endDay", label: "Ngày kết thúc" },
  { key: "discount", label: "Mức giảm giá" },
];

export const promotionFields = [
  { key: "code", label: "Mã giảm giá", type: "text" },
  { key: "description", label: "Mô tả", type: "text" },
  { key: "startDay", label: "Ngày bắt đầu", type: "datetime" },
  { key: "endDay", label: "Ngày kết thúc", type: "datetime" },
  { key: "discount", label: "Mức giảm giá", type: "text" },
];

/* ============ COLUM PROMOTION ============ */
export const logColumn = [
  { key: "id", label: "ID" },
  { key: "user.name", label: "Người thực hiện" },
  { key: "message", label: "Nội dung thực hiện" },
  { key: "level", label: "Mức độ cảnh báo" },
];

/* ============ COLUM KIND VEHICLE ============ */
export const kindVehicleColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Loại xe" },
];

export const kindVehicleFields = [
  { key: "name", label: "Loại xe", type: "text" },
];

/* ============ COLUM CATCH POINT ============ */
export const catchPointColumn = [
  { key: "id", label: "ID" },
  { key: "route.name", label: "Tên chuyến" },
  { key: "name", label: "Tên điểm đón" },
  { key: "address", label: "Địa chỉ" },
];

export const catchPointFields = [
  { key: "routeId", label: "Tên tuyến", type: "select" },
  { key: "name", label: "Tên điểm đón", type: "text" },
  { key: "address", label: "Địa chỉ", type: "text" },
];
/* ============ COLUM CATCH POINT ============ */
export const seatColumn = [
  { key: "id", label: "ID" },
  { key: "kindVehicle.name", label: "Loại xe" },
  { key: "name", label: "Tên ghế" },
  { key: "status", label: "Trạng thái" },
];

export const seatFields = [
  { key: "kindVehicleId", label: "Loại xe", type: "select" },
  { key: "name", label: "Tên ghế", type: "text" },
  { key: "status", label: "Trạng thái", type: "select" },
];
