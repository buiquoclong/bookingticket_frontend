import React, { useState } from "react";
import "../../../Assets/scss/Clients/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../../ComponentParts/PasswordInput";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    userName: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    userName: "",
    password: "",
    rePassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRePasswordVisibility = () => setShowRePassword((prev) => !prev);

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email) ? "" : "Email không hợp lệ.";
  };

  const validatePassword = (password) => {
    if (!password) return "Vui lòng nhập mật khẩu";
    if (
      password.length < 8 ||
      password.length > 32 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password)
    )
      return "Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số";
    return "";
  };

  const validateUserName = (name) => {
    return name.trim() === "" ? "Tên người dùng không được để trống" : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "userName":
        errorMessage = validateUserName(value);
        break;
      case "password":
        errorMessage = validatePassword(value);
        break;
      case "rePassword":
        errorMessage =
          value !== form.password ? "Mật khẩu nhập lại không khớp" : "";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const canRegister =
    form.email &&
    form.userName &&
    form.password &&
    form.rePassword &&
    !errors.email &&
    !errors.userName &&
    !errors.password &&
    !errors.rePassword;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra lại validation trước khi submit
    const newErrors = {
      email: validateEmail(form.email),
      userName: validateUserName(form.userName),
      password: validatePassword(form.password),
      rePassword:
        form.rePassword !== form.password ? "Mật khẩu nhập lại không khớp" : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    const registerUser = {
      name: form.userName,
      password: form.password,
      email: form.email,
      phone: "",
      role: 1,
      status: 1,
      type: "Đăng ký",
    };

    try {
      const response = await fetch("http://localhost:8081/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser),
      });

      if (!response.ok) {
        console.error("Failed to register:", response.statusText);
        return;
      }

      const data = await response.text();

      if (data === "Email đã tồn tại") {
        toast.error("Email đã tồn tại");
        return;
      }

      if (isNaN(parseInt(data))) {
        toast.error(data);
        return;
      }

      navigate("/confirm-account", { state: { userId: parseInt(data) } });
    } catch (err) {
      console.error("Error register:", err);
    }
  };

  const googleLogin = () => {
    localStorage.setItem("googleLogin", "true");
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h1 className="register-title">Đăng ký</h1>

          <div className="input-group">
            <input
              type="text"
              name="userName"
              placeholder="Nhập tên người dùng"
              value={form.userName}
              onChange={handleChange}
              className="input-field"
            />
            {errors.userName && <p className="error-text">{errors.userName}</p>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              value={form.email}
              onChange={handleChange}
              className="input-field"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <PasswordInput
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu"
            value={form.password}
            onChange={handleChange}
            showPassword={showPassword}
            toggleShow={togglePasswordVisibility}
            errorMessage={errors.password}
            hintText="Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số"
          />

          <PasswordInput
            label="Nhập lại mật khẩu"
            name="rePassword"
            placeholder="Nhập lại mật khẩu"
            value={form.rePassword}
            onChange={handleChange}
            showPassword={showRePassword}
            toggleShow={toggleRePasswordVisibility}
            errorMessage={errors.rePassword}
          />

          <button
            className={`btn primary-btn ${!canRegister ? "disabled" : ""}`}
            type="submit"
            disabled={!canRegister}
          >
            Đăng nhập
          </button>
          {/* <div className="buttonSave">
            <button
              className={canRegister ? "btn save" : " disabled"}
              type="submit"
              disabled={!canRegister}
              onClick={handleRegister}
            >
              Đăng ký
            </button>
          </div> */}
        </form>

        <div className="divider">
          <span>Hoặc</span>
        </div>

        <button className="btn google-btn" onClick={googleLogin}>
          Tiếp tục với Google
        </button>

        <div className="login-link">
          <p>
            Bạn đã có tài khoản?
            <Link to="/login" className="login-text">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
