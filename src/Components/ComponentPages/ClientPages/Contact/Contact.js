import React, { useState, useEffect } from "react";
import "../../../../Assets/scss/Clients/Contact.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    // setEmail(event.target.value);
    const emailAddress = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Biểu thức chính quy kiểm tra email

    // Kiểm tra xem email nhập vào có khớp với biểu thức chính quy không
    if (!emailPattern.test(emailAddress)) {
      setEmailErrorMessage("Email không hợp lệ.");
    } else {
      setEmailErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
    }
    setEmail(emailAddress);
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();
    let missingInfo = [];
    if (!name) {
      missingInfo.push("Họ tên");
    }
    if (!email) {
      missingInfo.push("Email");
    } else if (emailErrorMessage) {
      // Kiểm tra nếu có errorMessage cho email
      toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
      return; // Dừng xử lý tiếp theo nếu có lỗi
    }
    if (!title) {
      missingInfo.push("Tiêu đề");
    }
    if (!content) {
      missingInfo.push("Nội dung");
    }
    if (missingInfo.length > 0) {
      const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
        ",  "
      )}`;
      toast.error(message);
    } else {
      try {
        const newContactData = {
          content: content,
          email: email,
          name: name,
          title: title,
        };

        const response = await fetch("http://localhost:8081/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContactData),
        });

        if (response.ok) {
          // Xử lý thành công
          console.log("Contact đã được tạo thành công!");
          toast.success("Contact đã được tạo thành công!");

          setTimeout(() => {
            navigate("/");
          }, 1000);

          // Reset form hoặc làm gì đó khác
          setName("");
          setEmail("");
          setTitle("");
          setContent("");
        } else {
          console.error("Có lỗi xảy ra khi tạo contact!");
          toast.error("Có lỗi xảy ra khi tạo contact!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi:", error);
      }
    }
  };
  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
    Aos.refresh(); // đảm bảo AOS kiểm tra lại tất cả phần tử
  }, []);
  return (
    <div className="contact-form container">
      {/* Info */}
      <div className="contact-info" data-aos="fade-right" data-aos-offset="0">
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <h3>RoadLines</h3>
        <p>
          Địa chỉ: Kp.6, Phường Linh Trung, TP Thủ Đức, TP. Hồ Chí Minh
          <br />
          Điện thoại: 012345678
          <br />
          Email:{" "}
          <a href="mailto:roadlinebooking@gmail.com">
            roadlinebooking@gmail.com
          </a>
        </p>
      </div>

      {/* Form */}
      <div
        className="contact-form-container"
        data-aos="fade-left"
        data-aos-offset="0"
      >
        <form onSubmit={handleCreateContact}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange} // chỉ email dùng handler riêng
                required
              />
              {emailErrorMessage && (
                <span className="error-message">{emailErrorMessage}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Nhập nội dung"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
