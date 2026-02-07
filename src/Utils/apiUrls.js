export const BASE_URL = "http://localhost:8081/api";
// Trip APIs
// Lấy thông tin chuyến đi theo ID
export const GET_TRIP_BY_ID = (id) => `${BASE_URL}/trip/${id}`;
// Lấy tất cả chuyến đi
export const GET_ALL_TRIPS = `${BASE_URL}/trip/all`;
// Tìm kiếm chuyến đi theo tiêu chí
export const SEARCH_TRIP = `${BASE_URL}/trip/search`;
// Lấy trang chuyến đi với phân trang và tiêu chí tìm kiếm
export const GET_TRIP_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/trip/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo chuyến đi mới
export const CREATE_TRIP = `${BASE_URL}/trip`;

// User APIs

// Lấy thông tin người dùng theo ID
export const GET_USER_BY_ID = (id) => `${BASE_URL}/user/${id}`;
// Đăng ký người dùng mới
export const REGISTER = `${BASE_URL}/user/register`;
// Lấy token người dùng
export const GET_USER_TOKEN = `${BASE_URL}/user/token`;
// Tạo người dùng bởi admin
export const CREATE_USER_ADMIN = `${BASE_URL}/user/create-by-admin`;
// Thay đổi mật khẩu người dùng
export const CHANGE_PASSWORD = (userId) =>
  `${BASE_URL}/user/${userId}/change-password`;
// Xác nhận tài khoản người dùng
export const CONFIRM_ACCOUNT = `${BASE_URL}/user/confirm-account`;
// Thay đổi mã xác nhận
export const CHANGE_CONFIRM_CODE = () => `${BASE_URL}/user/change-confirmCode`;
// Quên mật khẩu
export const FORGOT_PASSWORD = `${BASE_URL}/user/forgot-password`;
// Cập nhật thông tin người dùng
export const UPDATE_USER_CLIENT = (userId) =>
  `${BASE_URL}/user/update/${userId}`;
// Đăng nhập người dùng
export const USER_LOGIN = `${BASE_URL}/user/login`;
// Đăng nhập người dùng bằng Google
export const USER_GOOGLE_LOGIN = `${BASE_URL}/oauth2/authorization/google`;
// Lấy trang người dùng với phân trang và tiêu chí tìm kiếm
export const GET_USER_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/user/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;

// Catch Point APIs
// Lấy điểm đón trả theo routeId
export const GET_CATCH_POINT_BY_ROUTE_ID = (routeId) =>
  `${BASE_URL}/catch-point/route/${routeId}`;
// Lấy trang điểm đón trả với phân trang và tiêu chí tìm kiếm
export const GET_CATCH_POINT_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/catch-point/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo điểm đón trả mới
export const CREATE_CATCH_POINT = `${BASE_URL}/catch-point`;
// Lấy điểm đón trả theo ID
export const GET_CATCH_POINT_BY_ID = (id) => `${BASE_URL}/catch-point/${id}`;

// Seat APIs
// Kiểm tra chỗ ngồi cho chuyến đi một chiều
export const CHECK_SEAT_ROUNDTRIP = `${BASE_URL}/seat/check-roundtrip`;
// Lấy trang chỗ ngồi với phân trang và tiêu chí tìm kiếm
export const GET_SEAT_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/seat/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo chỗ ngồi mới
export const CREATE_SEAT = `${BASE_URL}/seat`;
// Lấy chỗ ngồi theo ID
export const GET_SEAT_BY_ID = (id) => `${BASE_URL}/seat/${id}`;
// Lấy chỗ ngồi theo chuyến đi và loại xe
export const GET_SEAT_BY_TRIP_AND_KIND = (tripId, kindVehicleId) =>
  `${BASE_URL}/seat/trip/${tripId}/kindVehicle/${kindVehicleId}`;

// Booking APIs
// Tạo đặt chỗ mới
export const CREATE_BOOKING = `${BASE_URL}/booking/create`;
// Tạo đặt chỗ cho nhân viên
export const CREATE_BOOKING_FOR_EMPLOYEE = `${BASE_URL}/booking/for-emp`;
// Lấy đặt chỗ theo ID
export const GET_BOOKING_BY_ID = (id) => `${BASE_URL}/booking/${id}`;
// Lấy trang đặt chỗ với phân trang và tiêu chí tìm kiếm
export const GET_BOOKINGS_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/booking/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Lấy trang đặt chỗ của người dùng với phân trang và trạng thái thanh toán
export const GET_BOOKING_PAGE = (page, size, userId, isPaid) =>
  `${BASE_URL}/booking/page?page=${page}&size=${size}&userId=${userId}&isPaid=${isPaid}`;
// Hủy đặt chỗ
export const CANCEL_BOOKING = (bookingId) =>
  `${BASE_URL}/booking/cancel/${bookingId}`;
// Lấy chi tiết đặt chỗ theo đặt chỗ
export const GET_BOOKING_DETAIL_BY_BOOKING = (bookingId) =>
  `${BASE_URL}/booking_detail/booking/${bookingId}`;

// Payment
// Thanh toán qua VNPAY
export const PAY_VNPAY = (total, bookingId) =>
  `${BASE_URL}/payment/pay?total=${total}&bookingId=${bookingId}`;
// Thanh toán đặt chỗ
export const PAY_BOOKING = (total, bookingId) =>
  `${BASE_URL}/payment/pay-booking?total=${total}&bookingId=${bookingId}`;

// Promotion APIs
// Kiểm tra mã khuyến mãi
export const CHECK_PROMOTION = (code) =>
  `${BASE_URL}/promotion/check?code=${code}`;
// Lấy trang khuyến mãi với phân trang và tiêu chí tìm kiếm
export const GET_PROMOTION_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/promotion/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo khuyến mãi mới
export const CREATE_PROMOTION = `${BASE_URL}/promotion`;
// Lấy khuyến mãi theo ID
export const GET_PROMOTION_BY_ID = (id) => `${BASE_URL}/promotion/${id}`;

// Contact APIs
// Lấy tất cả liên hệ
export const CREATE_CONTACT = `${BASE_URL}/contact`;
// Lấy trang liên hệ với phân trang và tiêu chí tìm kiếm
export const GET_CONTACT_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/contact/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Lấy liên hệ theo ID
export const GET_CONTACT_BY_ID = (id) => `${BASE_URL}/contact/${id}`;

// City APIs
// Lấy tất cả thành phố
export const GET_ALL_CITIES = `${BASE_URL}/city`;
// Lấy trang thành phố với phân trang và tiêu chí tìm kiếm
export const GET_CITY_PAGE = (page, size, searchValue) =>
  `${BASE_URL}/city/page?page=${page}&size=${size}&name=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo thành phố mới
export const CREATE_CITY = `${BASE_URL}/city`;
// Lấy thành phố theo ID
export const GET_CITY_BY_ID = (id) => `${BASE_URL}/city/${id}`;

// Driver APIs
// Lấy tất cả tài xế
export const GET_ALL_DRIVERS = `${BASE_URL}/driver`;
// Lấy trang tài xế với phân trang và tiêu chí tìm kiếm
export const GET_DRIVER_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/driver/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo tài xế mới
export const CREATE_DRIVER = `${BASE_URL}/driver`;
// Lấy tài xế theo ID
export const GET_DRIVER_BY_ID = (id) => `${BASE_URL}/driver/${id}`;
// Lấy tài xế có sẵn cho ngày bắt đầu
export const GET_DRIVER_AVAILABLE_FOR_DAYSTART = (dayStart) =>
  `${BASE_URL}/driver/available?dayStart=${dayStart}`;

// Route APIs
// Lấy tất cả tuyến đường
export const GET_ACTIVE_ROUTES = `${BASE_URL}/route/active`;
// Lấy tất cả tuyến đường
export const GET_ALL_ROUTES = `${BASE_URL}/route`;
// Lấy trang tuyến đường với phân trang và tiêu chí tìm kiếm
export const GET_ROUTE_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/route/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo tuyến đường mới
export const CREATE_ROUTE = `${BASE_URL}/route`;
// Lấy tuyến đường theo ID
export const GET_ROUTE_BY_ID = (id) => `${BASE_URL}/route/${id}`;

// Review APIs
// Lấy trang đánh giá của người dùng với phân trang và đánh giá
export const GET_REVIEW_OF_USER_PAGE = (page, size, userId, rating) =>
  `${BASE_URL}/review/page?page=${page}&size=${size}&userId=${userId}&rating=${rating}`;
// Lấy trang đánh giá với phân trang và tiêu chí tìm kiếm
export const GET_REVIEW_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/review/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo đánh giá mới
export const CREATE_REVIEW = `${BASE_URL}/review`;
// Lấy đánh giá theo ID
export const GET_REVIEW_BY_ID = (id) => `${BASE_URL}/review/${id}`;

// Booking Detail APIs
// Lấy chi tiết đặt chỗ theo bookingId
export const GET_BOOKING_DETAIL_BY_BOOKING_ID = (bookingId) =>
  `${BASE_URL}/booking_detail/booking/${bookingId}`;
// Lấy chi tiết đặt chỗ theo ID
export const GET_BOOKING_DETAIL_BY_ID = (id) =>
  `${BASE_URL}/booking_detail/${id}`;
// Lấy trang chi tiết đặt chỗ của người dùng với phân trang và ticketId
export const GET_BOOKING_DETAILS_BY_USER = (userId, page, size, ticketId) =>
  `${BASE_URL}/booking_detail/user/${userId}/booking_details/page?page=${page}&size=${size}&id=${ticketId}`;

// kind Vehicle APIs
// Lấy tất cả loại xe
export const GET_ALL_KIND_VEHICLE = `${BASE_URL}/kindVehicle`;
// Lấy trang loại xe với phân trang và tiêu chí tìm kiếm
export const GET_KIND_VEHICLE_PAGE = (page, size, searchValue) =>
  `${BASE_URL}/kindVehicle/page?page=${page}&size=${size}&name=${encodeURIComponent(
    searchValue,
  )}`;
// Tạo loại xe mới
export const CREATE_KIND_VEHICLE = `${BASE_URL}/kindVehicle`;
// Lấy loại xe theo ID
export const GET_KIND_VEHICLE_BY_ID = (id) => `${BASE_URL}/kindVehicle/${id}`;

// Seat Reservation APIs
// Lấy trang đặt chỗ chỗ ngồi với phân trang
export const GET_SEAT_RESERVATION_PAGE = (page, size) =>
  `${BASE_URL}/seat_reservation/page?page=${page}&size=${size}`;
// Lấy đặt chỗ chỗ ngồi theo ID
export const GET_SEAT_RESERVATION_BY_TRIP_ID = (id) =>
  `${BASE_URL}/seat_reservation/trip/${id}`;

// Logs APIs
// Lấy trang log với phân trang và tiêu chí tìm kiếm
export const GET_LOG_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/log/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;

// Vehicle APIs
// Lấy tất cả xe
export const GET_VEHICLE_AVAILABLE_BY_KIND_AND_DAYSTART = (
  kindVehicleId,
  dayStart,
) => `${BASE_URL}/vehicle/available/${kindVehicleId}?dayStart=${dayStart}`;
// Lấy trang xe với phân trang và tiêu chí tìm kiếm
export const GET_VEHICLE_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/vehicle/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue,
  )}`;

// Tạo xe mới
export const CREATE_VEHICLE = `${BASE_URL}/vehicle`;
// Lấy xe theo ID
export const GET_VEHICLE_BY_ID = (id) => `${BASE_URL}/vehicle/${id}`;

// ================== DASHBOARD API ==================
// Tổng doanh thu theo ngày
export const GET_TOTAL_BY_DAY = (date) =>
  `${BASE_URL}/booking/total-by-day?date=${date}`;

export const GET_TOTAL_BY_MONTH = (yearMonth) =>
  `${BASE_URL}/booking/total-by-month?yearMonth=${yearMonth}`;

export const GET_TOTAL_USER = `${BASE_URL}/user/totalUser`;

export const GET_TOTAL_BOOKINGS = `${BASE_URL}/booking/total-bookings`;

export const GET_TOTAL_ALL = `${BASE_URL}/booking/totalAll`;

export const GET_TOTAL_LAST_NINE_MONTHS = `${BASE_URL}/booking/total/lastNineMonths`;

export const GET_COUNT_PAID_BY_MONTH = (yearMonth) =>
  `${BASE_URL}/booking/count-paid-by-month?yearMonth=${yearMonth}`;

export const GET_COUNT_CANCELLED_BY_MONTH = (yearMonth) =>
  `${BASE_URL}/booking/count-cancelled-by-month?yearMonth=${yearMonth}`;
