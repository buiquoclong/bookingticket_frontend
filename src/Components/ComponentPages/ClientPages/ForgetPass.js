import React, { useState } from "react";
import "../../../Assets/scss/Clients/ForgetPass.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import { FORGOT_PASSWORD } from "../../../Utils/apiUrls";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    // ✅ Kiểm tra email rỗng
    if (!validateFields({ Email: email })) return;

    // ✅ Kiểm tra lỗi định dạng email
    if (emailErrorMessage) {
      toast.error(emailErrorMessage);
      return;
    }

    try {
      setIsLoading(true);

      // ✅ Gọi API bằng helper chung
      const result = await sendRequest(FORGOT_PASSWORD, "POST", { email });

      // Trường hợp API trả text thay vì JSON (ví dụ: “Đã gửi mail khôi phục”)
      if (typeof result === "string") {
        handleForgetResponse(result);
      } else if (result?.message) {
        handleForgetResponse(result.message);
      } else {
        toast.success("Yêu cầu đặt lại mật khẩu đã được gửi!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi gửi yêu cầu khôi phục mật khẩu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="forget-password-section">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
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
