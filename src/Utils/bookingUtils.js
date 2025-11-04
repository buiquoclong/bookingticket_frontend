export const SEAT_STATUS = {
  SOLD: 1,
  RESERVED: 2,
  AVAILABLE: 0,
};
export function getCurrentDateTimeLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // thêm '0' nếu cần
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Format ngày
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function formatDate1(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Đảm bảo rằng các giá trị có hai chữ số
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${year}`;
}

export const formatCurrency = (value) => {
  if (!value) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
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

/* ============ COLUMN LOG ============ */
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
        {row.trip.timeStart?.slice(0, 5)} - {formatDate(row.trip.dayStart)}
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

/* ============ COLUMN ROUTE ============ */
export const routeColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Tên tuyến" },
  { key: "khoangCach", label: "Quãng đường" },
  { key: "timeOfRoute", label: "Thời gian di chuyển" },
  { key: "status", label: "Trạng thái" },
];
export const routeField = [
  { key: "name", label: "Tên tuyến", type: "text", readOnly: true },
  { key: "diemdi", label: "Điểm đi", type: "select" },
  { key: "diemden", label: "Điểm đến", type: "select" },
  { key: "khoangCach", label: "Quãng đường", type: "text" },
  { key: "timeOfRoute", label: "Thời gian di chuyển", type: "text" },
  { key: "status", label: "Trạng thái", type: "select" },
];

/* ============ COLUMN REVIEW ============ */
export const reviewColumn = [
  { key: "id", label: "ID" },
  { key: "user.name", label: "Tên người dùng" },
  { key: "trip.route.name", label: "Chuyến đi" },
  {
    key: "trip.dayStart",
    label: "Thời gian khởi hành",
    cell: (row) => (
      <div style={{ textAlign: "center" }}>
        {row.trip.timeStart?.slice(0, 5)} - {formatDate(row.trip.dayStart)}
      </div>
    ),
  },
  {
    key: "rating",
    label: "Đánh giá",
    cell: (row) => (
      <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{
              color: index < row.rating ? "gold" : "grey",
              fontSize: "18px",
            }}
          >
            ★
          </span>
        ))}
      </div>
    ),
  },
];
export const searchReviewOptions = [
  { key: "userName", label: "Tên người dùng", type: "text" },
  {
    key: "rating",
    label: "Đánh giá",
    type: "select",
    options: {
      1: <span style={{ color: "gold" }}>★</span>,
      2: <span style={{ color: "gold" }}>★★</span>,
      3: <span style={{ color: "gold" }}>★★★</span>,
      4: <span style={{ color: "gold" }}>★★★★</span>,
      5: <span style={{ color: "gold" }}>★★★★★</span>,
    },
  },
];

/* ============ COLUMN TRIP ============ */
export const tripColumn = [
  { key: "id", label: "ID" },
  { key: "route.name", label: "Tên chuyến đi" },
  { key: "vehicle.kindVehicle.name", label: "Loại xe" },
  { key: "vehicle.name", label: "Tên xe" },
  { key: "vehicle.vehicleNumber", label: "Biển số" },
  {
    key: "dayStart",
    label: "Thời gian khởi hành",
    cell: (row) => (
      <div style={{ textAlign: "center" }}>
        {row.timeStart?.slice(0, 5)} - {formatDate(row.dayStart)}
      </div>
    ),
  },
  {
    key: "price",
    label: "Giá vé",
    cell: (row) => (
      <span style={{ fontWeight: "bold", color: "#0d6efd" }}>
        {formatCurrency(row.price)}
      </span>
    ),
  },
  { key: "driver.name", label: "Tài xế" },
  { key: "status", label: "Trạng thái" },
];
export const tripFields = [
  { key: "routeId", label: "Tên chuyến đi", type: "select" },
  { key: "dayStart", label: "Ngày khởi hành", type: "date" },
  { key: "timeStart", label: "Thời gian khởi hành", type: "time" },
  { key: "kindVehicleId", label: "Loại xe", type: "select" },
  { key: "vehicleId", label: "Tên xe", type: "select" },
  { key: "price", label: "Giá vé", type: "number" },
  { key: "driverId", label: "Tài xế", type: "select" },
  { key: "status", label: "Trạng thái", type: "select" },
];
export const tripDetailColumns = [
  { key: "seat.name", label: "Ghế đã đặt" },
  { key: "booking.userName", label: "Tên người đặt" },
  { key: "booking.email", label: "Địa chỉ Email" },
  { key: "booking.phone", label: "Số điện thoại" },
];
export const tripFieldSearch = [
  { key: "routeId", label: "Tên chuyến đi", type: "select" },
  { key: "dayStart", label: "Ngày khởi hành", type: "date" },
];

/* ============ COLUMN BOOKING ============ */
const roundTrip = {
  0: "Một chiều",
  1: "Khứ hồi",
};
export const bookingColumn = [
  { key: "id", label: "ID" },
  { key: "userName", label: "Tên người đặt" },
  { key: "email", label: "Địa chỉ Email" },
  { key: "phone", label: "Số điện thoại" },
  {
    key: "dayBook",
    label: "Thời gian đặt",
    cell: (row) => (
      <div style={{ textAlign: "center" }}>{formatDate1(row.dayBook)}</div>
    ),
  },
  { key: "total", label: "Tổng tiền" },
  {
    key: "roundTrip",
    label: "Loại vé",
    cell: (row) => (
      <div style={{ textAlign: "center" }}>
        {roundTrip[row.roundTrip] || "Unknown isPaid"}
      </div>
    ),
  },
  { key: "kindPay", label: "Hình thức thanh toán" },
  { key: "isPaid", label: "Trạng thái thanh toán" },
];

export const bookingFieldSearch = [
  { key: "userName", label: "Tên người đặt", type: "text" },
  { key: "email", label: "Địa chỉ Email", type: "text" },
  { key: "phone", label: "Số điện thoại", type: "text" },
];
