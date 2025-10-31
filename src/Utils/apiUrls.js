export const BASE_URL = "http://localhost:8081/api";
// Trip APIs
export const GET_TRIP_BY_ID = (id) => `${BASE_URL}/trip/${id}`;
export const GET_ALL_TRIPS = `${BASE_URL}/trip/all`;
export const SEARCH_TRIP = `${BASE_URL}/trip/search`;
export const GET_TRIP_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/trip/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

export const CREATE_TRIP = `${BASE_URL}/trip`;

// User APIs
export const GET_USER_BY_ID = (id) => `${BASE_URL}/user/${id}`;
export const REGISTER = `${BASE_URL}/user/register`;
export const GET_USER_TOKEN = `${BASE_URL}/user/token`;
export const CREATE_USER_ADMIN = `${BASE_URL}/user/create-by-admin`;
export const CHANGE_PASSWORD = (userId) =>
  `${BASE_URL}/user/${userId}/change-password`;
export const CONFIRM_ACCOUNT = `${BASE_URL}/user/confirm-account`;
export const CHANGE_CONFIRM_CODE = () => `${BASE_URL}/user/change-confirmCode`;
export const FORGOT_PASSWORD = `${BASE_URL}/user/forgot-password`;
export const UPDATE_USER_CLIENT = (userId) =>
  `${BASE_URL}/user/update/${userId}`;
export const USER_LOGIN = `${BASE_URL}/user/login`;
export const USER_GOOGLE_LOGIN = `${BASE_URL}/oauth2/authorization/google`;
export const GET_USER_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/user/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

// Catch Point APIs
export const GET_CATCH_POINT_BY_ROUTE_ID = (routeId) =>
  `${BASE_URL}/catch-point/route/${routeId}`;
export const GET_CATCH_POINT_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/catch-point/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

export const CREATE_CATCH_POINT = `${BASE_URL}/catch-point`;
export const GET_CATCH_POINT_BY_ID = (id) => `${BASE_URL}/catch-point/${id}`;

// Seat APIs
export const CHECK_SEAT_ROUNDTRIP = `${BASE_URL}/seat/check-roundtrip`;
export const GET_SEAT_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/seat/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_SEAT = `${BASE_URL}/seat`;
export const GET_SEAT_BY_ID = (id) => `${BASE_URL}/seat/${id}`;
export const GET_SEAT_BY_TRIP_AND_KIND = (tripId, kindVehicleId) =>
  `${BASE_URL}/seat/trip/${tripId}/kindVehicle/${kindVehicleId}`;

// Booking APIs
export const CREATE_BOOKING = `${BASE_URL}/booking/create`;
export const CREATE_BOOKING_FOR_EMPLOYEE = `${BASE_URL}/booking/for-emp`;
export const GET_BOOKING_BY_ID = (id) => `${BASE_URL}/booking/${id}`;
export const GET_BOOKINGS_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/booking/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

export const GET_BOOKING_PAGE = (page, size, userId, isPaid) =>
  `${BASE_URL}/booking/page?page=${page}&size=${size}&userId=${userId}&isPaid=${isPaid}`;

export const CANCEL_BOOKING = (bookingId) =>
  `${BASE_URL}/booking/cancel/${bookingId}`;

export const GET_BOOKING_DETAIL_BY_BOOKING = (bookingId) =>
  `${BASE_URL}/booking_detail/booking/${bookingId}`;

// Payment
export const PAY_VNPAY = (total, bookingId) =>
  `${BASE_URL}/payment/pay?total=${total}&bookingId=${bookingId}`;

export const PAY_BOOKING = (total, bookingId) =>
  `${BASE_URL}/payment/pay-booking?total=${total}&bookingId=${bookingId}`;

// Promotion APIs
export const CHECK_PROMOTION = (code) =>
  `${BASE_URL}/promotion/check?code=${code}`;
export const GET_PROMOTION_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/promotion/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_PROMOTION = `${BASE_URL}/promotion`;
export const GET_PROMOTION_BY_ID = (id) => `${BASE_URL}/promotion/${id}`;

// Contact APIs
export const CREATE_CONTACT = `${BASE_URL}/contact`;
export const GET_CONTACT_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/contact/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

export const GET_CONTACT_BY_ID = (id) => `${BASE_URL}/contact/${id}`;

// City APIs
export const GET_ALL_CITIES = `${BASE_URL}/city`;
export const GET_CITY_PAGE = (page, size, searchValue) =>
  `${BASE_URL}/city/page?page=${page}&size=${size}&name=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_CITY = `${BASE_URL}/city`;
export const GET_CITY_BY_ID = (id) => `${BASE_URL}/city/${id}`;

// Driver APIs
export const GET_ALL_DRIVERS = `${BASE_URL}/driver`;
export const GET_DRIVER_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/driver/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_DRIVER = `${BASE_URL}/driver`;
export const GET_DRIVER_BY_ID = (id) => `${BASE_URL}/driver/${id}`;
export const GET_DRIVER_AVAILABLE_FOR_DAYSTART = (dayStart) =>
  `${BASE_URL}/driver/available?dayStart=${dayStart}`;

// Route APIs
export const GET_ACTIVE_ROUTES = `${BASE_URL}/route/active`;
export const GET_ALL_ROUTES = `${BASE_URL}/route`;
export const GET_ROUTE_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/route/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_ROUTE = `${BASE_URL}/route`;
export const GET_ROUTE_BY_ID = (id) => `${BASE_URL}/route/${id}`;

// 📝 Review APIs
export const GET_REVIEW_OF_USER_PAGE = (page, size, userId, rating) =>
  `${BASE_URL}/review/page?page=${page}&size=${size}&userId=${userId}&rating=${rating}`;

export const GET_REVIEW_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/review/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_REVIEW = `${BASE_URL}/review`;
export const GET_REVIEW_BY_ID = (id) => `${BASE_URL}/review/${id}`;

// Booking Detail APIs
export const GET_BOOKING_DETAIL_BY_BOOKING_ID = (bookingId) =>
  `${BASE_URL}/booking_detail/booking/${bookingId}`;
export const GET_BOOKING_DETAIL_BY_ID = (id) =>
  `${BASE_URL}/booking_detail/${id}`;

export const GET_BOOKING_DETAILS_BY_USER = (userId, page, size, ticketId) =>
  `${BASE_URL}/booking_detail/user/${userId}/booking_details/page?page=${page}&size=${size}&id=${ticketId}`;

// kind Vehicle APIs
export const GET_ALL_KIND_VEHICLE = `${BASE_URL}/kindVehicle`;
export const GET_KIND_VEHICLE_PAGE = (page, size, searchValue) =>
  `${BASE_URL}/kindVehicle/page?page=${page}&size=${size}&name=${encodeURIComponent(
    searchValue
  )}`;
export const CREATE_KIND_VEHICLE = `${BASE_URL}/kindVehicle`;
export const GET_KIND_VEHICLE_BY_ID = (id) => `${BASE_URL}/kindVehicle/${id}`;

// Seat Reservation APIs
export const GET_SEAT_RESERVATION_PAGE = (page, size) =>
  `${BASE_URL}/seat_reservation/page?page=${page}&size=${size}`;

export const GET_SEAT_RESERVATION_BY_TRIP_ID = (id) =>
  `${BASE_URL}/seat_reservation/trip/${id}`;

// Logs APIs
export const GET_LOG_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/log/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

// Vehicle APIs
export const GET_VEHICLE_AVAILABLE_BY_KIND_AND_DAYSTART = (
  kindVehicleId,
  dayStart
) => `${BASE_URL}/vehicle/available/${kindVehicleId}?dayStart=${dayStart}`;
export const GET_VEHICLE_PAGE = (page, size, searchCriteria, searchValue) =>
  `${BASE_URL}/vehicle/page?page=${page}&size=${size}&${searchCriteria}=${encodeURIComponent(
    searchValue
  )}`;

export const CREATE_VEHICLE = `${BASE_URL}/vehicle`;
export const GET_VEHICLE_BY_ID = (id) => `${BASE_URL}/vehicle/${id}`;

// ================== 📊 DASHBOARD API ==================
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
