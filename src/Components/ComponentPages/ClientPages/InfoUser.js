import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/InfoUser.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";

const InfoUser = () => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8081/api/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUserData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } else {
        console.error("Error fetching user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // useEffect để gọi fetch khi userId thay đổi
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);
  // Hàm kiểm tra dữ liệu
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Vui lòng nhập tên người dùng";
        break;
      case "email":
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) return "Email không hợp lệ";
        break;
      case "phone":
        const phonePattern = /^(0\d{9,10})$/;
        if (!phonePattern.test(value)) return "Số điện thoại không hợp lệ";
        break;
      default:
        return "";
    }
    return "";
  };

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Submit/cập nhật user
  const handleUpdateUser = async () => {
    // ✅ Kiểm tra lỗi từng field bằng validateField (giữ nguyên logic cũ)
    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      newErrors[key] = validateField(key, userData[key]);
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e);
    if (hasErrors) {
      toast.error("Vui lòng điền đúng và đầy đủ thông tin!");
      return;
    }

    // ✅ Kiểm tra các field bắt buộc có giá trị (dùng helper)
    if (
      !validateFields({
        "Họ và tên": userData.name,
        "Số điện thoại": userData.phone,
        Email: userData.email,
      })
    )
      return;

    try {
      setIsLoading(true);

      // ✅ Gửi request PUT bằng helper sendRequest
      await sendRequest(
        `http://localhost:8081/api/user/update/${userId}`,
        "PUT",
        userData
      );

      toast.success("Bạn đã cập nhật thông tin thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật thông tin:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassClick = () => {
    navigate("/change_pass");
  };

  return (
    <section className="profile-section">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
      <div className="profile-container">
        <h3 className="profile-title" data-aos="fade-right">
          THÔNG TIN CÁ NHÂN
        </h3>

        <div className="profile-card">
          <div className="form-group">
            <label>Họ và tên:</label>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={userData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={userData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="button-group">
            <button className="btn change-pass" onClick={handleChangePassClick}>
              Đổi mật khẩu
            </button>
            <button className="btn save" onClick={handleUpdateUser}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InfoUser;
