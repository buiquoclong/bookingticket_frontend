import React, { useState } from "react";
import "../../../Assets/scss/Clients/ChangePass.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../../ComponentParts/PasswordInput";

const ChangePass = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    nowPass: "",
    newPass: "",
    reNewPass: "",
  });

  const [errors, setErrors] = useState({
    nowPass: "",
    newPass: "",
    reNewPass: "",
  });

  const [show, setShow] = useState({
    nowPass: false,
    newPass: false,
    reNewPass: false,
  });

  const toggleShowPassword = (key) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canUpdatePassword = form.nowPass && form.newPass && form.reNewPass;

  const validatePassword = (password) =>
    password.length >= 8 &&
    password.length <= 32 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password);

  const handleUpdatePass = async () => {
    // Reset errors
    setErrors({ nowPass: "", newPass: "", reNewPass: "" });

    if (form.newPass !== form.reNewPass) {
      setErrors((prev) => ({
        ...prev,
        reNewPass: "Mật khẩu nhập lại không khớp.",
      }));
      return;
    }

    if (!validatePassword(form.newPass)) {
      setErrors((prev) => ({
        ...prev,
        newPass: "Mật khẩu không đúng định dạng",
      }));
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/api/user/${userId}/change-password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: form.nowPass,
            newPassword: form.newPass,
          }),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        console.error("Failed to update password:", data);
        return;
      }

      if (data === "Mật khẩu cũ không đúng") {
        toast.error("Mật khẩu cũ không đúng");
        return;
      }

      toast.success("Bạn đã đổi mật khẩu thành công");
      setTimeout(() => {
        ["token", "userId", "userRole", "googleLogin"].forEach((item) =>
          localStorage.removeItem(item)
        );
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <section className="change-password container section">
      <div className="change-password__content">
        <div className="change-password__header">
          <h3 data-aos="fade-right" className="change-password__title">
            Đổi mật khẩu
          </h3>
          <p className="change-password__subtitle">
            Cập nhật mật khẩu mới để bảo vệ tài khoản của bạn an toàn hơn.
          </p>
        </div>

        <div
          className="change-password__form"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <PasswordInput
            label="Mật khẩu hiện tại:"
            placeholder="Nhập mật khẩu hiện tại"
            value={form.nowPass}
            onChange={(e) => handleChange("nowPass", e.target.value)}
            showPassword={show.nowPass}
            toggleShow={() => toggleShowPassword("nowPass")}
            errorMessage={errors.nowPass}
          />

          <PasswordInput
            label="Mật khẩu mới:"
            placeholder="Nhập mật khẩu mới"
            value={form.newPass}
            onChange={(e) => handleChange("newPass", e.target.value)}
            showPassword={show.newPass}
            toggleShow={() => toggleShowPassword("newPass")}
            errorMessage={errors.newPass}
            hintText="Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số"
          />

          <PasswordInput
            label="Nhập lại mật khẩu mới:"
            placeholder="Nhập lại mật khẩu mới"
            value={form.reNewPass}
            onChange={(e) => handleChange("reNewPass", e.target.value)}
            showPassword={show.reNewPass}
            toggleShow={() => toggleShowPassword("reNewPass")}
            errorMessage={errors.reNewPass}
          />

          <div className="buttonSave">
            <button
              className={`btn-save ${canUpdatePassword ? "" : "disabled"}`}
              disabled={!canUpdatePassword}
              onClick={handleUpdatePass}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePass;
