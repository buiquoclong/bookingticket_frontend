import React, { useCallback, useState, useEffect } from "react";

import "./BookingTicket.scss";

import success from "../../../../Assets/img/success.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [showLocationRetrunInput, setShowLocationRetrunInput] = useState(false);
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
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  // Xử lý input nơi đón
  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  // Xử lý input ghi chú cho chuyến về
  const handleNoteReturnChange = (event) => {
    setNoteReturn(event.target.value);
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
    if (showLocationRetrunInput) {
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
  }, [showLocationInput, showLocationRetrunInput, routeId, routeReturnId]);

  // Xử lý chọn nhập nơi đón
  const handleSwitchChange = (event) => {
    setShowLocationInput(event.target.checked);
  };
  // Xử lý chọn nhập nơi đón cho chuyến về
  const handleSwitchReturnChange = (event) => {
    setShowLocationRetrunInput(event.target.checked);
  };
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
      pickupLocation: pickupLocation,
      note: note,

      // Lượt về (nếu khứ hồi)
      tripIdReturn: tripIdReturn,
      selectedSeatIdsReturn: selectedSeatIdsReturn,
      selectedSeatNamesReturn: selectedSeatsNamesReturn,
      totalPriceReturn: totalPriceReturn,
      pickupLocationReturn: pickupLocationReturn,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    <section className="main container section">
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {showPaymentPopup && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  className="closePopup"
                  onClick={() => setShowPaymentPopup(false)}
                ></button>
                <div className="payContent">
                  <div className="imgsucces">
                    <img src={success} alt="succes" />
                  </div>
                  <div className="content">
                    <div className="titlePay">Thanh toán</div>
                    <div>
                      Quý khách vui lòng lựa chọn phương thức thanh toán bên
                      dưới để thanh toán và nhận vé
                    </div>
                  </div>
                  <div className="payMent" style={{ marginBottom: "1rem" }}>
                    <button
                      className="vnpay btn"
                      onClick={() => handlePayment("VNPAY")}
                    >
                      <span style={{ color: "#ed3237" }}>VN</span>
                      <span style={{ color: "#0f62ac " }}>PAY</span>
                    </button>
                    {userId && (
                      <button
                        className="btn trasau"
                        onClick={() => handlePayment("COD")}
                      >
                        Thanh toán khi lên xe
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bookingContent flex">
        {kind === "Một chiều" && (
          <div>
            <div className="flex" style={{ justifyContent: "center" }}>
              {data && (
                <div className="infoTicket">
                  <h3>Thông tin lượt đi</h3>
                  <div className="lineInfo">
                    <span>Tuyến:</span>
                    <div className="rightInfo">
                      <span>{data.route.name}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Loại xe:</span>
                    <div className="rightInfo">
                      <span>{data.vehicle.kindVehicle.name}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Ngày:</span>
                    <div className="rightInfo">
                      <span>{formatDate(data.dayStart)}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Thời gian:</span>
                    <div className="rightInfo">
                      <span>{data.timeStart.slice(0, 5)}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Số ghế:</span>
                    <div className="seatInfo">
                      <span>{selectedSeatsNames}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Giá:</span>
                    <div className="rightInfo">
                      <span>{totalPrice.toLocaleString("vi-VN")}VND</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Ghi chú:</span>
                    <div>
                      <input
                        type="text"
                        className="Note"
                        placeholder="Thêm ghi chú ở đây"
                        onChange={handleNoteChange}
                      />
                    </div>
                  </div>
                  <div className="lineInfo lineInfoCheck">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showLocationInput}
                            onChange={handleSwitchChange}
                          />
                        }
                        label="Chọn điểm đón"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </div>
                  {showLocationInput && (
                    <div className="lineInfo">
                      <span>Nơi đón:</span>
                      <div className="selectChoose">
                        <select
                          className="Note"
                          value={pickupLocation}
                          onChange={handlePickupLocationChange}
                        >
                          <option value="">Chọn nơi đón</option>
                          {catchPoints.map((point) => (
                            <option key={point.id} value={point.address}>
                              {point.name} - {point.address}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="policyInfo">
              <div className="titlePolicy">
                <h1>
                  <span>ĐIỀU KHOẢN &</span>
                  <span style={{ color: "red" }}> LƯU Ý</span>
                </h1>
              </div>
              <div className="devide"></div>
              <div className="contentPolicy">
                <div>
                  <span style={{ color: "red" }}>(*)</span> Quý khách vui lòng
                  mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước
                  giờ xuất bến ít nhất{" "}
                  <span style={{ color: "red", fontWeight: "600" }}>
                    20 phút
                  </span>{" "}
                  để thực hiện đổi vé.
                </div>
                <div>
                  <span style={{ color: "red" }}>(*)</span> Thông tin hành khách
                  phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/ đổi vé{" "}
                </div>
              </div>
            </div>
          </div>
        )}
        {kind === "Khứ hồi" && (
          <div>
            <div className="flex" style={{ gap: "1rem" }}>
              <div>
                {data && (
                  <div className="infoTicket">
                    <h3>Thông tin lượt đi</h3>
                    <div className="lineInfo">
                      <span>Tuyến:</span>
                      <div className="rightInfo">
                        <span>{data.route.name}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Loại xe:</span>
                      <div className="rightInfo">
                        <span>{data.vehicle.kindVehicle.name}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Ngày:</span>
                      <div className="rightInfo">
                        <span>{formatDate(data.dayStart)}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Thời gian:</span>
                      <div className="rightInfo">
                        <span>{data.timeStart.slice(0, 5)}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Số ghế:</span>
                      <div className="seatInfo">
                        <span>{selectedSeatsNames}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Giá:</span>
                      <div className="rightInfo">
                        <span>{totalPrice.toLocaleString("vi-VN")}VND</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Ghi chú:</span>
                      <div>
                        <input
                          type="text"
                          className="Note"
                          placeholder="Thêm ghi chú ở đây"
                          onChange={handleNoteChange}
                        />
                      </div>
                    </div>
                    <div className="lineInfo lineInfoCheck">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={showLocationInput}
                              onChange={handleSwitchChange}
                            />
                          }
                          label="Chọn điểm đón"
                          labelPlacement="start"
                        />
                      </FormGroup>
                    </div>
                    {showLocationInput && (
                      <div className="lineInfo">
                        <span>Nơi đón:</span>
                        <div className="selectChoose">
                          <select
                            className="Note"
                            value={pickupLocation}
                            onChange={handlePickupLocationChange}
                          >
                            <option value="">Chọn nơi đón</option>
                            {catchPoints.map((point) => (
                              <option key={point.id} value={point.address}>
                                {point.name} - {point.address}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                {dataReturn && (
                  <div className="infoTicket">
                    <h3>Thông tin lượt về</h3>
                    <div className="lineInfo">
                      <span>Tuyến:</span>
                      <div className="rightInfo">
                        <span>{dataReturn.route.name}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Loại xe:</span>
                      <div className="rightInfo">
                        <span>{dataReturn.vehicle.kindVehicle.name}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Ngày:</span>
                      <div className="rightInfo">
                        <span>{formatDate(dataReturn.dayStart)}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Thời gian:</span>
                      <div className="rightInfo">
                        <span>{dataReturn.timeStart.slice(0, 5)}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Số ghế:</span>
                      <div className="seatInfo">
                        <span>{selectedSeatsNamesReturn}</span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Giá:</span>
                      <div className="rightInfo">
                        <span>
                          {totalPriceReturn.toLocaleString("vi-VN")}VND
                        </span>
                      </div>
                    </div>
                    <div className="lineInfo">
                      <span>Ghi chú:</span>
                      <div>
                        <input
                          type="text"
                          className="Note"
                          placeholder="Thêm ghi chú ở đây"
                          onChange={handleNoteReturnChange}
                        />
                      </div>
                    </div>
                    <div className="lineInfo lineInfoCheck">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={showLocationRetrunInput}
                              onChange={handleSwitchReturnChange}
                            />
                          }
                          label="Chọn điểm đón"
                          labelPlacement="start"
                        />
                      </FormGroup>
                    </div>
                    {showLocationRetrunInput && (
                      <div className="lineInfo">
                        <span>Nơi đón:</span>
                        <div className="selectChoose">
                          <select
                            className="Note"
                            value={pickupLocationReturn}
                            onChange={handlePickupLocationReturnChange}
                          >
                            <option value="">Chọn nơi đón</option>
                            {catchPointsReturn.map((point) => (
                              <option key={point.id} value={point.address}>
                                {point.name} - {point.address}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="policyInfo">
              <div className="titlePolicy">
                <h1>
                  <span>ĐIỀU KHOẢN &</span>
                  <span style={{ color: "red" }}> LƯU Ý</span>
                </h1>
              </div>
              <div className="devide"></div>
              <div className="contentPolicy">
                <div>
                  <span style={{ color: "red" }}>(*)</span> Quý khách vui lòng
                  mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước
                  giờ xuất bến ít nhất{" "}
                  <span style={{ color: "red", fontWeight: "600" }}>
                    20 phút
                  </span>{" "}
                  để thực hiện đổi vé.
                </div>
                <div>
                  <span style={{ color: "red" }}>(*)</span> Thông tin hành khách
                  phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/ đổi vé{" "}
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <div className=" infoUser">
            <h3>Thông tin người đặt</h3>
            <div className="lineInfo">
              <span>
                Họ và tên<span style={{ color: "red" }}>*</span>:
              </span>
              <div className="infoInput">
                <input
                  type="text"
                  className="info"
                  placeholder="Nhập họ và tên"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
            </div>
            <div className="lineInfo">
              <span>
                Số điện thoại<span style={{ color: "red" }}>*</span>:
              </span>
              <div className="infoInput">
                <input
                  type="text"
                  className="info"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {phoneErrorMessage && (
                  <p
                    style={{
                      lineHeight: "1.5",
                      fontSize: "12px",
                      color: "red",
                      paddingLeft: ".5rem",
                    }}
                  >
                    {phoneErrorMessage}
                  </p>
                )}
              </div>
            </div>
            <div className="lineInfo">
              <span>
                Email<span style={{ color: "red" }}>*</span>:
              </span>
              <div className="infoInput">
                <input
                  type="text"
                  className="info"
                  placeholder="Nhập Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailErrorMessage && (
                  <p
                    style={{
                      lineHeight: "1.5",
                      fontSize: "12px",
                      color: "red",
                      paddingLeft: ".5rem",
                    }}
                  >
                    {emailErrorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="discount">
            <TextField
              id=""
              label="Mã giảm giá"
              size="small"
              className="textdiscount"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={isDiscountApplied}
            />
            {isDiscountApplied ? (
              <Button variant="contained" onClick={handleCancelDiscount}>
                Hủy
              </Button>
            ) : (
              <Button variant="contained" onClick={handleApplyDiscount}>
                Áp dụng
              </Button>
            )}
          </div>
          <div className="policyInfo">
            <div className="titlePolicy">
              <h1>
                <span>Chi tiết giá</span>
              </h1>
            </div>
            <div className="devide"></div>
            {kind === "Một chiều" && (
              <div className="contentPolicy">
                <div className="lineInfo">
                  <span>Giá vé lượt đi:</span>
                  <div className="rightInfo">
                    <span>{totalPrice.toLocaleString("vi-VN")}VND</span>
                  </div>
                </div>
                <div className="lineInfo">
                  <span>Phí thanh toán:</span>
                  <div className="rightInfo">
                    <span>0VND</span>
                  </div>
                </div>
                {discountPercent !== null && (
                  <div className="lineInfo">
                    <span>Giảm giá ({discountPercent}%):</span>
                    <div className="rightInfo">
                      <span>-{discountAmount.toLocaleString("vi-VN")} VND</span>
                    </div>
                  </div>
                )}
                <div className="devide"></div>
                <div className="lineInfo" style={{ marginTop: ".5rem" }}>
                  <span>Tổng tiền:</span>
                  <div className="rightInfo">
                    <span>{finalPrice.toLocaleString("vi-VN")}VND</span>
                  </div>
                </div>
                <div className="policyCheckbox">
                  <label className="chekcBox">
                    <span>
                      <span>
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          value="1"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                      </span>
                      <span className="yes" style={{ marginLeft: "10px" }}>
                        Tôi chấp nhận với các điều khoản
                      </span>
                    </span>
                  </label>
                </div>
                <div className="buttonList">
                  <button className="btn cancle">
                    <Link to="/">Hủy</Link>
                  </button>
                  <button
                    className="btn pay"
                    onClick={handleValidateBeforePayment}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            )}
            {kind === "Khứ hồi" && (
              <div className="contentPolicy">
                <div className="lineInfo">
                  <span>Tổng giá lượt đi:</span>
                  <div className="rightInfo">
                    <span>{totalPrice.toLocaleString("vi-VN")}VND</span>
                  </div>
                </div>
                <div className="lineInfo">
                  <span>Tổng giá lượt về:</span>
                  <div className="rightInfo">
                    <span>{totalPriceReturn.toLocaleString("vi-VN")}VND</span>
                  </div>
                </div>
                {discountPercent !== null && (
                  <div className="lineInfo">
                    <span>Giảm giá ({discountPercent}%):</span>
                    <div className="rightInfo">
                      <span>-{discountAmount.toLocaleString("vi-VN")} VND</span>
                    </div>
                  </div>
                )}
                <div className="devide"></div>
                <div className="lineInfo" style={{ marginTop: ".5rem" }}>
                  <span>Tổng tiền:</span>
                  <div className="rightInfo">
                    <span>{finalPrice.toLocaleString("vi-VN")}VND</span>
                  </div>
                </div>
                <div className="policyCheckbox">
                  <label className="chekcBox">
                    <span>
                      <span>
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          value="1"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                      </span>
                      <span className="yes" style={{ marginLeft: "10px" }}>
                        Tôi chấp nhận với các điều khoản
                      </span>
                    </span>
                  </label>
                </div>
                <div className="buttonList">
                  <button className="btn cancle">
                    <Link to="/">Hủy</Link>
                  </button>
                  <button
                    className="btn pay"
                    onClick={handleValidateBeforePayment}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        containerId="main"
        className="toast-container"
        toastClassName="toast"
        bodyClassName="toast-body"
        progressClassName="toast-progress"
        theme="colored"
        transition={Zoom}
        autoClose={500}
        hideProgressBar={true}
        pauseOnHover
      ></ToastContainer>
    </section>
  );
};
export default BookingTicket;
