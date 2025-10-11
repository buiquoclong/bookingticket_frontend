import React, { useCallback, useState, useEffect } from "react";

import "../../../../Assets/scss/Clients/BookingTicket.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InfoTicket from "../../../ComponentParts/TicketInfoComponents/InfoTicket";
import PolicyInfo from "../../../ComponentParts/PolicyComponents/PolicyInfo";
import BookingSummary from "../../../ComponentParts/BookingSummary";

const BookingTicket = () => {
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

  // Xử lý input nơi đón
  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  // Xử lý input ghi chú cho chuyến về
  const handleNoteReturnChange = (newNote) => {
    setNoteReturn(newNote);
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
  // Xử lý chọn nhập nơi đón
  const handleSwitchChange = (event) => {
    setShowLocationInput(event.target.checked);
  };
  // Xử lý chọn nhập nơi đón cho chuyến về
  const handleSwitchReturnChange = (event) => {
    setShowLocationReturnInput(event.target.checked);
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
      const response = await fetch(`http://localhost:8081/api/trip/${tripId}`);
      const data = await response.json();
      setData(data);
      setRouteId(data.route.id);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }, [tripId]);
  const fetchTripReturnInfo = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/trip/${tripIdReturn}`
      );
      const dataReturn = await response.json();
      setDataReturn(dataReturn);
      setRouteReturnId(dataReturn.route.id);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }, [tripIdReturn]);

  // Lấy thông tin chuyến và thông tin người dùng khi component được tải
  useEffect(() => {
    // Call the API to fetch cities
    if (kind === "Một chiều") {
      fetchTripInfo();
    } else if (kind === "Khứ hồi") {
      fetchTripInfo();
      fetchTripReturnInfo();
    }
    // const userId = localStorage.getItem("userId");
    if (userId) {
      // Nếu có userId, thực hiện gọi API để lấy thông tin người dùng
      fetch(`http://localhost:8081/api/user/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
          // Cập nhật thông tin người dùng vào các trường nhập liệu
          setUserName(userData.name);
          setPhone(userData.phone);
          setEmail(userData.email);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [kind, fetchTripInfo, fetchTripReturnInfo, userId]);

  // Lấy danh sách điểm đón khi chọn nhập điểm đón
  useEffect(() => {
    if (showLocationInput) {
      const fetchCatchPoints = async () => {
        try {
          const response = await fetch(
            `http://localhost:8081/api/catch-point/route/${routeId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
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
          const response = await fetch(
            `http://localhost:8081/api/catch-point/route/${routeReturnId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const dataReturn = await response.json();
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

    const response = await fetch(
      "http://localhost:8081/api/seat/check-roundtrip",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();

    if (result.conflicted) {
      toast.error(result.message);
      return false;
    }
    return true;
  };

  // Build request gửi lên backend
  const buildBookingRequest = (kindPay) => {
    return {
      userName,
      email,
      phone,
      total: finalPrice,
      kind: kind,
      roundTrip: kind === "Khứ hồi" ? 1 : 0,
      userId: userId || null,
      sendMail: true,

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

      kindPay, // "CASH" hoặc "VNPAY"
      isPaid: 0, // lúc tạo booking đều 0, backend xử lý gửi mail hoặc chờ callback
    };
  };

  const handlePayment = async (method) => {
    console.log(method);
    try {
      // 1. Kiểm tra ghế trước khi booking
      const isSeatsAvailable = await checkSeatsBeforeBooking();
      if (!isSeatsAvailable) return;

      setIsLoading(true);
      setShowPaymentPopup(false);

      if (method === "COD") {
        // Thanh toán khi lên xe
        const bookingRequest = buildBookingRequest("CASH");
        console.log("abc ", bookingRequest);

        const response = await fetch(
          "http://localhost:8081/api/booking/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingRequest),
          }
        );

        if (!response.ok) throw new Error("Lỗi khi tạo booking!");

        const createdBooking = await response.json();
        toast.success("Đặt vé thành công! Mail xác nhận đã được gửi.");

        setTimeout(() => {
          navigate("/pay-success", {
            state: { bookingId: createdBooking.id, kind },
          });
        }, 1500);
      } else if (method === "VNPAY") {
        // Thanh toán online VNPAY
        const bookingRequest = buildBookingRequest("VNPAY");

        // Lưu booking tạm vào backend trước khi redirect VNPay
        const responseBooking = await fetch(
          "http://localhost:8081/api/booking/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingRequest),
          }
        );

        if (!responseBooking.ok) throw new Error("Lỗi khi tạo booking!");
        const createdBooking = await responseBooking.json();

        // Lưu booking ID để callback
        localStorage.setItem("bookingId", createdBooking.id);
        // Lưu booking tạm để xử lý khi callback
        localStorage.setItem("bookingDetails", JSON.stringify(bookingRequest));

        // Gọi backend lấy URL thanh toán
        const response = await fetch(
          `http://localhost:8081/api/payment/pay?total=${finalPrice}&bookingId=${createdBooking.id}`
        );
        if (!response.ok) throw new Error("Lỗi khi gọi API thanh toán!");

        const paymentUrl = await response.text();

        // Chuyển hướng tới cổng thanh toán
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error(error.message || "Lỗi khi xử lý thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyDiscount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/promotion/check?code=${discountCode}`
      );
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
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            transition: "all 0.3s ease",
          }}
          open={isLoading}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              animation: "pulse 1.2s infinite ease-in-out",
            }}
          >
            <CircularProgress
              thickness={5}
              size={60}
              sx={{
                color: "#00e676",
                filter: "drop-shadow(0 0 8px rgba(0, 230, 118, 0.8))",
              }}
            />
            <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>
              Đang tải dữ liệu...
            </span>
          </div>
        </Backdrop>
      )}

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
                <button
                  className="btn vnpay"
                  onClick={() => handlePayment("VNPAY")}
                >
                  <span className="vnpay-red">VN</span>
                  <span className="vnpay-blue">PAY</span>
                </button>

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
export default BookingTicket;
