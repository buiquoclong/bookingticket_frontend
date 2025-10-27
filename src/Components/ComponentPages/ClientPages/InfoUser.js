import React, { useState, useEffect, useCallback } from "react";
import "../../../Assets/scss/Clients/InfoUser.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import { UPDATE_USER_CLIENT, GET_USER_BY_ID } from "../../../Utils/apiUrls";

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

      const data = await sendRequest(GET_USER_BY_ID(userId));

      setUserData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
      toast.error("Không thể tải thông tin người dùng!");
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
    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      newErrors[key] = validateField(key, userData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) {
      toast.error("Vui lòng điền đúng và đầy đủ thông tin!");
      return;
    }

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

      await sendRequest(UPDATE_USER_CLIENT(userId), "PUT", userData);

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
