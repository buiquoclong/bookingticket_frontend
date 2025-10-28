import React, { useCallback, useState, useEffect } from "react";
import "./AdminPay.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoTicket from "../../../ComponentParts/TicketInfoComponents/InfoTicket";
import PolicyInfo from "../../../ComponentParts/PolicyComponents/PolicyInfo";
import BookingSummary from "../../../ComponentParts/BookingSummary";
import { sendRequest } from "../../../../Utils/apiHelper";
import LoadingBackdrop from "../../../ComponentParts/LoadingBackdrop";
import {
  GET_TRIP_BY_ID,
  GET_USER_BY_ID,
  GET_CATCH_POINT_BY_ROUTE_ID,
  CHECK_SEAT_ROUNDTRIP,
  CREATE_BOOKING_FOR_EMPLOYEE,
  CHECK_PROMOTION,
} from "../../../../Utils/apiUrls";

const AdminPay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const {
    tripId,
    selectedSeatsNames,
    selectedSeatIds,
    totalPrice,
    tripIdReturn,
    selectedSeatsNamesReturn,
    selectedSeatIdsReturn,
    totalPriceReturn,
    kind,
  } = location.state || {};
  const totalAmount = totalPrice + totalPriceReturn;
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showLocationReturnInput, setShowLocationReturnInput] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [note, setNote] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [noteReturn, setNoteReturn] = useState("");
  const [pickupLocationReturn, setPickupLocationReturn] = useState("");
  const [data, setData] = useState(null);
  const [dataReturn, setDataReturn] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [catchPoints, setCatchPoints] = useState([]);
  const [catchPointsReturn, setCatchPointsReturn] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [routeReturnId, setRouteReturnId] = useState("");

  // Xử lý input ghi chú
  const handleNoteChange = (newNote) => {
    setNote(newNote);
  };

  // Xử lý input ghi chú cho chuyến về
  const handleNoteReturnChange = (newNote) => {
    setNoteReturn(newNote);
  };

  // Xử lý chọn nhập nơi đón
  const handleSwitchChange = (event) => {
    setShowLocationInput(event.target.checked);
  };
  // Xử lý chọn nhập nơi đón cho chuyến về
  const handleSwitchReturnChange = (event) => {
    setShowLocationReturnInput(event.target.checked);
  };

  // Xử lý input nơi đón
  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  // Xử lý input nơi đón cho chuyến về
  const handlePickupLocationReturnChange = (event) => {
    setPickupLocationReturn(event.target.value);
  };

  // Xử lý khi input tên người dùng thay đổi
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Xử lý thay đổi cho input số điện thoại
  const handlePhoneChange = (event) => {
    // setPhone(event.target.value);
    const phoneNumber = event.target.value;
    const phonePattern = /^(0\d{9,10})$/; // Biểu thức chính quy kiểm tra số điện thoại

    // Kiểm tra xem số điện thoại nhập vào có khớp với biểu thức chính quy không
    if (!phonePattern.test(phoneNumber)) {
      setPhoneErrorMessage("Số điện thoại không hợp lệ.");
    } else {
      setPhoneErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
    }
    setPhone(phoneNumber);
  };

  // Xử lý thay đổi cho input email
  const handleEmailChange = (event) => {
    // setEmail(event.target.value);
    const emailAddress = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Biểu thức chính quy kiểm tra email

    // Kiểm tra xem email nhập vào có khớp với biểu thức chính quy không
    if (!emailPattern.test(emailAddress)) {
      setEmailErrorMessage("Email không hợp lệ.");
    } else {
      setEmailErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
    }
    setEmail(emailAddress);
  };

  const handleValidateBeforePayment = () => {
    let missingInfo = [];
    if (!userName) {
      missingInfo.push("Họ và tên");
    }
    if (!phone) {
      missingInfo.push("Số điện thoại");
    } else if (phoneErrorMessage) {
      // Kiểm tra nếu có errorMessage cho phone
      toast.error(phoneErrorMessage); // Hiển thị errorMessage nếu có
      return; // Dừng xử lý tiếp theo nếu có lỗi
    }
    if (!email) {
      missingInfo.push("Email");
    } else if (emailErrorMessage) {
      // Kiểm tra nếu có errorMessage cho email
      toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
      return; // Dừng xử lý tiếp theo nếu có lỗi
    }
    if (missingInfo.length > 0) {
      const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
        ",  "
      )}`;
      toast.error(message);
    } else {
      if (!isChecked) {
        toast.error("Vui lòng chấp nhận các điều khoản.");
      } else {
        setShowPaymentPopup(true);
      }
    }
  };

  const fetchTripInfo = useCallback(async () => {
    try {
      const data = await sendRequest(GET_TRIP_BY_ID(tripId), "GET");
      setData(data);
      setRouteId(data.route.id);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }, [tripId]);
  const fetchTripReturnInfo = useCallback(async () => {
    try {
      const dataReturn = await sendRequest(GET_TRIP_BY_ID(tripIdReturn), "GET");
      setDataReturn(dataReturn);
      setRouteReturnId(dataReturn.route.id);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }, [tripIdReturn]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Bắt đầu loading
        setIsLoading(true);

        // 🔹 Gọi API chuyến đi (một chiều hoặc khứ hồi)
        if (kind === "Khứ hồi") {
          await Promise.all([fetchTripInfo(), fetchTripReturnInfo()]);
        } else {
          await fetchTripInfo();
        }

        // 🔹 Gọi API người dùng (nếu có userId)
        if (userId) {
          const data = await sendRequest(GET_USER_BY_ID(userId), "GET");

          setUserName(data.name);
          setPhone(data.phone);
          setEmail(data.email);
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        toast.error("Không thể tải thông tin từ máy chủ!");
      } finally {
        setIsLoading(false);
      }
    };

    // ✅ Gọi hàm async
    fetchData();
  }, [kind, fetchTripInfo, fetchTripReturnInfo, userId]);

  // Lấy danh sách điểm đón khi chọn nhập điểm đón
  useEffect(() => {
    if (showLocationInput) {
      const fetchCatchPoints = async () => {
        try {
          const data = await sendRequest(
            GET_CATCH_POINT_BY_ROUTE_ID(routeId),
            "GET"
          );
          console.log(data);
          setCatchPoints(data);
        } catch (error) {
          console.error("Error fetching catch points:", error);
        }
      };
      fetchCatchPoints();
    }
    if (showLocationReturnInput) {
      const fetchCatchPointsReturn = async () => {
        try {
          const dataReturn = await sendRequest(
            GET_CATCH_POINT_BY_ROUTE_ID(routeReturnId),
            "GET"
          );
          setCatchPointsReturn(dataReturn);
        } catch (error) {
          console.error("Error fetching catch points:", error);
        }
      };
      fetchCatchPointsReturn();
    }
  }, [showLocationInput, showLocationReturnInput, routeId, routeReturnId]);

  const checkSeatsBeforeBooking = async () => {
    const requestBody = {
      tripId: tripId,
      seatIds: selectedSeatIds,
      tripIdReturn: tripIdReturn,
      seatIdsReturn: selectedSeatIdsReturn,
    };

    try {
      const result = await sendRequest(
        CHECK_SEAT_ROUNDTRIP,
        "POST",
        requestBody
      );

      if (result.conflicted) {
        toast.error(result.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking seats:", error);
      toast.error("Lỗi hệ thống. Vui lòng thử lại sau!");
      return false;
    }
  };

  // Build request gửi lên backend
  const buildBookingRequest = (kindPay) => {
    return {
      userName,
      email,
      phone,
      total: finalPrice,
      roundTrip: kind === "Khứ hồi" ? 1 : 0,
      userId: userId || null,
      sendMail: false,

      // Lượt đi
      tripId: tripId,
      selectedSeatIds: selectedSeatIds,
      selectedSeatNames: selectedSeatsNames,
      totalPrice: totalPrice,
      pickupLocation: pickupLocation || "Tại nhà xe",
      note: note,

      // Lượt về (nếu khứ hồi)
      tripIdReturn: tripIdReturn,
      selectedSeatIdsReturn: selectedSeatIdsReturn,
      selectedSeatNamesReturn: selectedSeatsNamesReturn,
      totalPriceReturn: totalPriceReturn,
      pickupLocationReturn: pickupLocationReturn || "Tại nhà xe",
      noteReturn: noteReturn,

      kindPay,
      isPaid: 1,
    };
  };

  const handlePayment = async (method) => {
    try {
      // 1️⃣ Kiểm tra ghế trước khi booking
      const isSeatsAvailable = await checkSeatsBeforeBooking();
      if (!isSeatsAvailable) return;

      setIsLoading(true);
      setShowPaymentPopup(false);

      // 2️⃣ Nếu là thanh toán khi lên xe (COD)
      if (method === "COD") {
        const bookingRequest = buildBookingRequest("CASH");
        console.log("📦 Booking request:", bookingRequest);

        // 3️⃣ Gửi request tạo booking bằng sendRequest
        const createdBooking = await sendRequest(
          CREATE_BOOKING_FOR_EMPLOYEE,
          "POST",
          bookingRequest
        );

        toast.success("🎉 Đặt vé thành công!");

        // 4️⃣ Chuyển sang trang thanh toán tiền mặt
        setTimeout(() => {
          navigate("/admin/book-cash-payment", {
            state: { bookingId: createdBooking.id, kind },
          });
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Error during payment:", error);
      toast.error(error.message || "Lỗi khi xử lý thanh toán!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleApplyDiscount = async () => {
    try {
      const response = await fetch(CHECK_PROMOTION(discountCode));
      const result = await response.text(); // Assuming the API returns text

      if (result === "NULL") {
        toast.error("Mã giảm giá không hợp lệ hoặc đã hết hạn");
      } else {
        const discount = parseInt(result, 10);
        setDiscountPercent(discount);
        const discountValue =
          kind === "Khứ hồi"
            ? totalAmount * (discount / 100)
            : totalPrice * (discount / 100);
        setDiscountAmount(discountValue);
        setIsDiscountApplied(true);
        toast.success(`Áp dụng mã giảm giá thành công: ${discount}%`);
      }
    } catch (error) {
      console.error("Error fetching discount code:", error);
      toast.error("Đã xảy ra lỗi khi kiểm tra mã giảm giá");
    }
  };
  const finalPrice =
    kind === "Khứ hồi"
      ? totalAmount - discountAmount
      : totalPrice - discountAmount;

  const handleCancelDiscount = () => {
    setDiscountCode("");
    setDiscountPercent(null);
    setDiscountAmount(0);
    setIsDiscountApplied(false);
    toast.info("Đã hủy áp dụng mã giảm giá");
  };
  return (
    <>
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />

      {showPaymentPopup && (
        <div className="payment-modal">
          <div className="modal-box">
            <button
              className="close-btn"
              onClick={() => setShowPaymentPopup(false)}
            ></button>

            <div className="payment-content">
              <div className="icon-wrapper">
                <CheckCircleOutlineIcon className="success-icon" />
                <span className="icon-shadow"></span>
              </div>
              <h2 className="title">Thanh toán</h2>
              <p className="desc">
                Quý khách vui lòng lựa chọn phương thức thanh toán bên dưới để
                nhận vé.
              </p>

              <div className="payment-actions">
                {userId && (
                  <button
                    className="btn cod"
                    onClick={() => handlePayment("COD")}
                  >
                    Thanh toán khi lên xe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="booking-section">
        <div className="booking-container">
          {/* Bên trái: vé + người đặt */}
          <div className="left-column">
            <div
              className={`ticket-info ${
                kind === "Khứ hồi" ? "round-trip" : ""
              }`}
            >
              {kind === "Một chiều" && (
                <InfoTicket
                  title="Thông tin lượt đi"
                  data={data}
                  selectedSeatsNames={selectedSeatsNames}
                  totalPrice={totalPrice}
                  note={note}
                  onNoteChange={handleNoteChange}
                  showLocationInput={showLocationInput}
                  handleSwitchChange={handleSwitchChange}
                  pickupLocation={pickupLocation}
                  handlePickupLocationChange={handlePickupLocationChange}
                  catchPoints={catchPoints}
                />
              )}
              {kind === "Khứ hồi" && (
                <>
                  <InfoTicket
                    title="Thông tin lượt đi"
                    data={data}
                    selectedSeatsNames={selectedSeatsNames}
                    totalPrice={totalPrice}
                    note={note}
                    onNoteChange={handleNoteChange}
                    showLocationInput={showLocationInput}
                    handleSwitchChange={handleSwitchChange}
                    pickupLocation={pickupLocation}
                    handlePickupLocationChange={handlePickupLocationChange}
                    catchPoints={catchPoints}
                  />
                  <InfoTicket
                    title="Thông tin lượt về"
                    data={dataReturn}
                    selectedSeatsNames={selectedSeatsNamesReturn}
                    totalPrice={totalPriceReturn}
                    note={noteReturn}
                    onNoteChange={handleNoteReturnChange}
                    showLocationInput={showLocationReturnInput}
                    handleSwitchChange={handleSwitchReturnChange}
                    pickupLocation={pickupLocationReturn}
                    handlePickupLocationChange={
                      handlePickupLocationReturnChange
                    }
                    catchPoints={catchPointsReturn}
                  />
                </>
              )}
            </div>

            <div className="user-card">
              <h3>Thông tin người đặt</h3>
              <form className="user-form">
                {[
                  {
                    label: "Họ và tên",
                    value: userName,
                    onChange: handleUserNameChange,
                    placeholder: "Nhập họ và tên",
                    error: "",
                  },
                  {
                    label: "Số điện thoại",
                    value: phone,
                    onChange: handlePhoneChange,
                    placeholder: "Nhập số điện thoại",
                    error: phoneErrorMessage,
                  },
                  {
                    label: "Email",
                    value: email,
                    onChange: handleEmailChange,
                    placeholder: "Nhập Email",
                    error: emailErrorMessage,
                  },
                ].map((field, idx) => (
                  <div className="form-row" key={idx}>
                    <label>
                      {field.label}
                      <span className="required">*</span>
                    </label>
                    <div
                      className={`input-wrapper ${
                        field.error ? "has-error" : ""
                      }`}
                    >
                      <input
                        type="text"
                        className="input-field"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <p className="error-msg">{field.error || " "}</p>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>

          {/* Bên phải: policy + discount + summary */}
          <div className="right-column">
            <div className="policy-discount-card">
              <PolicyInfo className="policy-info-card" />

              <div className="discount-card">
                <TextField
                  label="Mã giảm giá"
                  size="small"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={isDiscountApplied}
                />
                <Button
                  variant="contained"
                  onClick={
                    isDiscountApplied
                      ? handleCancelDiscount
                      : handleApplyDiscount
                  }
                >
                  {isDiscountApplied ? "Hủy" : "Áp dụng"}
                </Button>
              </div>
            </div>

            <BookingSummary
              className="bookingSummaryCard"
              kind={kind}
              totalPrice={totalPrice}
              totalPriceReturn={totalPriceReturn}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
              finalPrice={finalPrice}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              handleValidateBeforePayment={handleValidateBeforePayment}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminPay;
