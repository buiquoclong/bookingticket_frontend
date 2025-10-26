import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/ConfirmAccount.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { sendRequest } from "../../../Utils/apiHelper";
import {
  GET_USER_BY_ID,
  CONFIRM_ACCOUNT,
  CHANGE_CONFIRM_CODE,
} from "../../../Utils/apiUrls";

const ConfirmAccount = () => {
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await sendRequest(GET_USER_BY_ID(userId), "GET");
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [userId]); // ✅ useCallback chỉ thay đổi khi userId thay đổi

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleConfirmAccount = async (event) => {
    event.preventDefault();

    // 🧩 Kiểm tra đầu vào
    if (!confirmCode?.trim()) {
      toast.error("Vui lòng nhập mã xác nhận");
      return;
    }

    if (confirmCodeErrorMessage) {
      toast.error(confirmCodeErrorMessage);
      return;
    }

    try {
      setIsLoading(true);

      // 📨 Gọi API xác nhận tài khoản
      const response = await sendRequest(CONFIRM_ACCOUNT(), "POST", {
        userId,
        token: confirmCode.trim(),
      });

      // 🧾 Xử lý phản hồi
      const message =
        typeof response === "string"
          ? response
          : response?.message || "Không có phản hồi từ máy chủ";

      if (message.toLowerCase().includes("không hợp lệ")) {
        toast.error("❌ Mã xác nhận không hợp lệ hoặc đã hết hạn");
        return;
      }

      if (message.toLowerCase().includes("thành công")) {
        toast.success("✅ Xác thực tài khoản thành công 🎉");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      // Nếu có thông điệp khác (ví dụ lỗi hệ thống)
      toast.warning(message);
    } catch (error) {
      console.error("Error confirming account:", error);
      toast.error(
        "⚠️ Đã xảy ra lỗi khi xác thực tài khoản. Vui lòng thử lại sau."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changeConfirmCode = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      // 📨 Gửi yêu cầu xin mã xác thực mới
      const response = await sendRequest(CHANGE_CONFIRM_CODE(), "POST", {
        userId,
      });

      // 🧾 Xử lý phản hồi từ backend
      const message =
        typeof response === "string"
          ? response
          : response?.message || "Không có phản hồi từ máy chủ";

      if (message.toUpperCase() === "FAIL") {
        toast.error("❌ Lỗi khi gửi mã xác thực. Vui lòng thử lại!");
        return;
      }

      if (message.toLowerCase().includes("thành công")) {
        toast.success("✅ Mã xác thực mới đã được gửi đến email của bạn");
        setTimeout(fetchUserInfo, 1000);
        return;
      }

      // Nếu backend trả về thông điệp khác
      toast.warning(message);
    } catch (error) {
      console.error("Error while sending confirm code:", error);
      toast.error("⚠️ Đã xảy ra lỗi. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCodeChange = (event) => {
    const value = event.target.value.trim();
    setConfirmCode(value);
    setConfirmCodeErrorMessage(value ? "" : "Mã xác nhận không được để trống");
  };

  return (
    <section className="verify-section container">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
      <div className="verify-wrapper">
        <div className="verify-header">
          <h3 data-aos="fade-right" className="verify-title">
            XÁC THỰC TÀI KHOẢN
          </h3>

          {data && (
            <p className="verify-description">
              Chúng tôi đã gửi mã xác nhận vào email:{" "}
              <strong>{data.email}</strong> mà bạn đã đăng ký. Vui lòng nhập mã
              xác nhận để xác thực tài khoản.
            </p>
          )}
        </div>

        <form className="verify-form">
          <div className="form-group">
            <div className="input-field">
              <input
                type="text"
                className="form-input"
                placeholder=" "
                value={confirmCode}
                onChange={handleConfirmCodeChange}
              />
              <label className="form-label">Nhập mã xác nhận</label>
            </div>

            {confirmCodeErrorMessage && (
              <p className="error-message">{confirmCodeErrorMessage}</p>
            )}
          </div>

          <div className="button-group">
            <button className="btn btn-outline" onClick={changeConfirmCode}>
              Gửi lại mã xác nhận
            </button>
            <button className="btn btn-primary" onClick={handleConfirmAccount}>
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default ConfirmAccount;
