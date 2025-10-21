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

/* ============ COLUMN DATA TABLE ============ */
/* ============ COLUMN DRIVER ============ */
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

/* ============ COLUMN PROMOTION ============ */
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

/* ============ COLUMN PROMOTION ============ */
export const logColumn = [
  { key: "id", label: "ID" },
  { key: "user.name", label: "Người thực hiện" },
  { key: "message", label: "Nội dung thực hiện" },
  { key: "level", label: "Mức độ cảnh báo" },
];

/* ============ COLUMN KIND VEHICLE ============ */
export const kindVehicleColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Loại xe" },
];

export const kindVehicleFields = [
  { key: "name", label: "Loại xe", type: "text" },
];

/* ============ COLUMN CATCH POINT ============ */
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
/* ============ COLUMN CATCH POINT ============ */
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

/* ============ COLUMN VEHICLE ============ */
export const vehicleColumn = [
  { key: "id", label: "ID" },
  { key: "kindVehicle.name", label: "Loại xe" },
  { key: "name", label: "Tên xe" },
  { key: "vehicleNumber", label: "Biển số" },
  { key: "value", label: "Sức chứa" },
  { key: "status", label: "Trạng thái" },
];

export const vehicleFields = [
  { key: "kindVehicleId", label: "Loại xe", type: "select" },
  { key: "name", label: "Tên xe", type: "text" },
  { key: "vehicleNumber", label: "Biển số", type: "text" },
  { key: "value", label: "Sức chứa", type: "text" },
  { key: "status", label: "Trạng thái", type: "select" },
];

/* ============ COLUMN USER ============ */
export const userColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Tên người dùng" },
  { key: "email", label: "Địa chỉ Email" },
  { key: "phone", label: "Số điện thoại" },
  { key: "role", label: "Quyền hạn người dùng" },
  { key: "status", label: "Trạng thái tài khoản" },
  { key: "type", label: "Phương thức đăng ký " },
];
export const userFieldCreate = [
  { key: "name", label: "Tên người dùng", type: "text" },
  { key: "email", label: "Địa chỉ Email", type: "text" },
  { key: "phone", label: "Số điện thoại", type: "text" },
  { key: "role", label: "Quyền hạn người dùng", type: "select" },
];

export const userFieldQuery = [
  { key: "name", label: "Tên người dùng" },
  { key: "email", label: "Địa chỉ Email" },
  { key: "phone", label: "Số điện thoại" },
  { key: "status", label: "Trạng thái tài khoản", type: "select" },
  { key: "role", label: "Quyền hạn người dùng", type: "select" },
];

export const userFields = [
  { key: "role", label: "Quyền hạn người dùng", type: "select" },
  { key: "status", label: "Trạng thái tài khoản", type: "select" },
];

/* ============ COLUMN CONTACT ============ */
export const contactColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Người liên hệ" },
  { key: "email", label: "Địa chỉ Email" },
  { key: "title", label: "Tiêu đề liên hệ" },
  { key: "content", label: "Nội dung liên hệ" },
];
export const contactField = [
  { key: "name", label: "Người liên hệ", type: "text" },
  { key: "email", label: "Địa chỉ Email", type: "text" },
  { key: "title", label: "Tiêu đề liên hệ", type: "text" },
  { key: "content", label: "Nội dung liên hệ", type: "text" },
];

/* ============ COLUMN SEAT RESERVATION ============ */
export const seatReservationColumn = [
  { key: "id", label: "ID" },
  { key: "trip.route.name", label: "Tên chuyến đi" },
  { key: "booking.userName", label: "Tên người đặt" },
  { key: "booking.email", label: "Địa chỉ Email" },
  { key: "trip.vehicle.kindVehicle.name", label: "Loại xe" },
  { key: "seat.name", label: "Ghế đã đặt" },
  {
    key: "trip.dayStart",
    label: "Thời gian khởi hành",
    cell: (row) => (
      <div style={{ textAlign: "center" }}>
        {row.trip.timeStart?.slice(0, 5)} -{" "}
        {new Date(row.trip.dayStart).toLocaleDateString("vi-VN")}
      </div>
    ),
  },
];
export const seatReservationField = [
  { key: "user.name", label: "Người dùng", type: "text" },
  { key: "seat.name", label: "Ghế", type: "text" },
  { key: "status", label: "Trạng thái", type: "select" },
];

/* ============ COLUMN CITY ============ */
export const cityColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Tên thành phố" },
  {
    key: "imgUrl",
    label: "Ảnh",
    cell: (row) => (
      <img
        src={row.imgUrl}
        alt={row.name}
        height="50"
        style={{ borderRadius: "8px" }}
      />
    ),
  },
];
