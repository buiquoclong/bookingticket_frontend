import React, { useState } from "react";
import "../../../Assets/scss/Clients/ForgetPass.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const emailAddress = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmail(emailAddress);
    setEmailErrorMessage(
      emailPattern.test(emailAddress) ? "" : "Email không hợp lệ."
    );
  };

  const handleForgetResponse = (result) => {
    const messages = {
      SUCCESS: () => {
        toast.success("Mật khẩu mới đã được gửi đến email của bạn");
        setTimeout(() => navigate("/login"), 1000);
      },
      USER_NOT_FOUND: () =>
        toast.error("Không tìm thấy người dùng với địa chỉ email này"),
      EMAIL_ERROR: () =>
        toast.error("Đã xảy ra lỗi khi gửi email. Vui lòng thử lại!"),
      DEFAULT: () =>
        toast.error("Đã xảy ra lỗi không xác định. Vui lòng thử lại!"),
    };

    (messages[result] || messages.DEFAULT)();
  };

  const forgetPass = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập Email");
      return;
    }

    if (emailErrorMessage) {
      toast.error(emailErrorMessage);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        toast.error("Lỗi khi gửi yêu cầu. Vui lòng thử lại sau!");
        return;
      }

      const result = await response.text();
      handleForgetResponse(result);
    } catch (error) {
      console.error("Error while resetting password:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  };

  return (
    <section className="forget-password-section">
      <div className="forget-password-wrapper">
        <div className="header">
          <h3 className="title">Quên mật khẩu</h3>
          <p className="description">
            Vui lòng nhập <strong>địa chỉ email</strong> của bạn để nhận hướng
            dẫn đặt lại mật khẩu.
          </p>
        </div>

        <form className="forget-password-form">
          <div className="form-group">
            <div className="input-field">
              <input
                type="text"
                className="form-input"
                placeholder=" "
                value={email}
                onChange={handleEmailChange}
              />
              <label className="form-label">Nhập địa chỉ Email</label>
            </div>
            {emailErrorMessage && (
              <p className="error-message">{emailErrorMessage}</p>
            )}
          </div>

          <button className="btn btn-primary" onClick={forgetPass}>
            Gửi
          </button>
        </form>
      </div>
    </section>
  );
};
export default ForgetPass;
