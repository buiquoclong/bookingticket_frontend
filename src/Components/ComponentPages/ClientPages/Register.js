import React, { useState } from "react";
import "../../../Assets/scss/Clients/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../../ComponentParts/PasswordInput";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { REGISTER, USER_GOOGLE_LOGIN } from "../../../Utils/apiUrls";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

    const newErrors = {
      email: validateEmail(form.email),
      userName: validateUserName(form.userName),
      password: validatePassword(form.password),
      rePassword:
        form.rePassword !== form.password ? "Mật khẩu nhập lại không khớp" : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) {
      toast.error("Vui lòng kiểm tra lại thông tin đăng ký!");
      return;
    }

    const registerUser = {
      name: form.userName,
      password: form.password,
      email: form.email,
      phone: "",
      role: 1,
      status: 1,
      type: "Đăng ký",
    };

    const valid = validateFields({
      email: form.email,
      userName: form.userName,
      password: form.password,
    });
    if (!valid) return;

    try {
      setIsLoading(true);
      const result = await sendRequest(REGISTER, "POST", registerUser);

      if (typeof result === "string") {
        if (result === "Email đã tồn tại") {
          toast.error("Email đã tồn tại");
          return;
        }
        if (isNaN(parseInt(result))) {
          toast.error(result);
          return;
        }

        navigate("/confirm-account", {
          state: { userId: parseInt(result) },
        });
      } else {
        if (result?.id) {
          navigate("/confirm-account", { state: { userId: result.id } });
        } else {
          toast.success("Đăng ký thành công! Vui lòng xác nhận email.");
        }
      }
    } catch (err) {
      console.error("❌ Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = () => {
    localStorage.setItem("googleLogin", "true");
    window.location.href = USER_GOOGLE_LOGIN;
  };

  return (
    <section className="register-section">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
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
            Đăng ký
          </button>
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
