import React, { useState } from "react";
import "../../../../Assets/scss/Clients/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import PasswordInput from "../../../ComponentParts/PasswordInput";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Validation
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
      return "Mật khẩu không đúng định dạng";
    return "";
  };

  // Xử lý input chung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate ngay khi nhập
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  // Xử lý lỗi token
  const handleError = (token) => {
    if (token.includes(",")) {
      const [userId, status] = token.split(",");
      if (status === "VERIFY") {
        navigate("/confirm-account", { state: { userId } });
        return;
      }
    }
    const messages = {
      NULL: "Không tìm thấy người dùng",
      LOCK: "Người dùng đã bị khóa",
      PASSWORD: "Sai mật khẩu",
    };
    toast.error(messages[token] || "Lỗi không xác định");
  };

  const canLogin = form.email && form.password;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate toàn bộ form trước submit
    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean))
      return toast.error("Vui lòng điền thông tin đúng định dạng.");

    try {
      const response = await fetch("http://localhost:8081/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, pass: form.password }),
      });

      if (!response.ok) return toast.error(`Failed: ${response.status}`);

      const token = await response.text();

      if (["NULL", "LOCK", "PASSWORD"].includes(token) || token.includes(",")) {
        handleError(token);
        return;
      }

      // Lưu token và thông tin user
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      localStorage.setItem("userId", decodedToken.userId);
      localStorage.setItem("userRole", decodedToken.role);

      // Chuyển hướng
      const redirectPath = sessionStorage.getItem("redirectPath");
      if (redirectPath) {
        navigate(redirectPath);
        sessionStorage.removeItem("redirectPath");
      } else if ([2, 3].includes(decodedToken.role)) {
        navigate("/admin");
        window.location.reload();
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed: ${err.message}`);
    }
  };

  const googleLogin = () => {
    localStorage.setItem("googleLogin", "true");
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <section className="login-section">
      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleLogin}>
          <h1>Đăng nhập</h1>

          {/* Email Field */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Nhập Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
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
          </div>

          <div className="forgot">
            <Link to="/forget-pass" className="forget-link" tabIndex={-1}>
              Quên mật khẩu?
            </Link>
          </div>

          <button
            className={`btn primary-btn ${!canLogin ? "disabled" : ""}`}
            disabled={!canLogin}
          >
            Đăng nhập
          </button>

          <div className="line-container">
            <div className="line"></div>
            <span className="line-text">Hoặc</span>
            <div className="line"></div>
          </div>

          <button
            type="button"
            className="btn google-btn"
            onClick={googleLogin}
          >
            Tiếp tục với Google
          </button>

          <div className="register-link">
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="registerLink">
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;
