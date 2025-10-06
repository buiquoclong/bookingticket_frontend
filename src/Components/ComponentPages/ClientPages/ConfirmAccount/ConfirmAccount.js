import React, { useState, useEffect, useCallback } from "react";
import "../../../../Assets/scss/Clients/ConfirmAccount.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmAccount = () => {
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState("");

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:8081/api/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setData(data);
      } else {
        console.error("Error fetching user data:", data.message);
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

    // Kiểm tra đầu vào
    if (!confirmCode) {
      toast.error("Vui lòng nhập mã xác nhận");
      return;
    }

    if (confirmCodeErrorMessage) {
      toast.error(confirmCodeErrorMessage);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/api/user/confirm-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            token: confirmCode,
          }),
        }
      );

      const result = await response.text();

      if (response.ok) {
        toast.success("Xác thực tài khoản thành công 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(result || "Mã xác nhận không hợp lệ");
      }
    } catch (error) {
      console.error("Error confirming account:", error);
      toast.error("Đã xảy ra lỗi khi xác thực tài khoản");
    }
  };

  const changeConfirmCode = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8081/api/user/change-confirmCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        toast.error("Không thể gửi mã xác thực. Vui lòng thử lại sau!");
        console.error("HTTP error:", response.statusText);
        return;
      }

      const result = await response.text();

      if (result === "FAIL") {
        toast.error("Lỗi khi gửi mã xác thực. Vui lòng thử lại!");
        return;
      }

      toast.success("Mã xác thực mới đã được gửi đến email của bạn");

      // Cập nhật lại thông tin user sau khi gửi thành công (không reload trang)
      setTimeout(() => {
        fetchUserInfo();
      }, 1000);
    } catch (error) {
      console.error("Error while sending confirm code:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  };

  const handleConfirmCodeChange = (event) => {
    const value = event.target.value.trim();
    setConfirmCode(value);
    setConfirmCodeErrorMessage(value ? "" : "Mã xác nhận không được để trống");
  };

  return (
    <section className="verify-section container">
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
