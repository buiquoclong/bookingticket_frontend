import React, { useState, useEffect, useCallback } from "react";
import "../../../../Assets/scss/Clients/InfoUser.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InfoUser = () => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;

    try {
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
    // Validate tất cả fields
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

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        console.log("Response status: ok");
        toast.success("Bạn đã cập nhật thông tin thành công");
      } else {
        const resText = await response.text();
        toast.error(`Cập nhật thất bại: ${resText}`);
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error update:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  };

  const handleChangePassClick = () => {
    navigate("/change_pass");
  };

  return (
    // <section className="main container section">
    //   <div className="infoContent">
    //     <div className="secTitle">
    //       <h3 data-aos="fade-right" className="title">
    //         THÔNG TIN CÁ NHÂN
    //       </h3>
    //     </div>
    //     <div className="infoUser">
    //       <div className="lineInfo">
    //         <span>Họ và tên:</span>
    //         <div>
    //           <input
    //             type="text"
    //             name="name"
    //             className="Note"
    //             placeholder="Họ và tên"
    //             value={userData.name}
    //             onChange={handleChange}
    //           />
    //           {errors.name && (
    //             <p
    //               style={{
    //                 color: "red",
    //                 lineHeight: "1",
    //                 fontSize: "12px",
    //                 paddingLeft: ".3rem",
    //               }}
    //             >
    //               {errors.name}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       <div className="lineInfo">
    //         <span>Số điện thoại:</span>
    //         <div>
    //           <input
    //             type="text"
    //             name="phone"
    //             className="Note"
    //             placeholder="Số điện thoại"
    //             value={userData.phone}
    //             onChange={handleChange}
    //           />
    //           {errors.phone && (
    //             <p
    //               style={{
    //                 color: "red",
    //                 lineHeight: "1",
    //                 fontSize: "12px",
    //                 paddingLeft: ".3rem",
    //               }}
    //             >
    //               {errors.phone}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       <div className="lineInfo">
    //         <span>Email:</span>
    //         <div>
    //           <input
    //             type="text"
    //             name="email"
    //             className="Note"
    //             placeholder="Email"
    //             value={userData.email}
    //             onChange={handleChange}
    //           />
    //           {errors.email && (
    //             <p
    //               style={{
    //                 color: "red",
    //                 lineHeight: "1",
    //                 fontSize: "12px",
    //                 paddingLeft: ".3rem",
    //               }}
    //             >
    //               {errors.email}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       <div className="buttonSaveInfo">
    //         <button className="btn save" onClick={handleChangePassClick}>
    //           Đổi mật khẩu
    //         </button>
    //         <button className="btn save" onClick={handleUpdateUser}>
    //           Lưu thay đổi
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="profile-section">
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
