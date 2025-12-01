import React, { useState, useEffect } from "react";
import "../../../Assets/scss/Clients/Contact.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import { CREATE_CONTACT } from "../../../Utils/apiUrls";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const emailAddress = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailAddress)) {
      setEmailErrorMessage("Email không hợp lệ.");
    } else {
      setEmailErrorMessage("");
    }
    setEmail(emailAddress);
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();

    if (
      !validateFields({
        "Họ tên": name,
        Email: email,
        "Tiêu đề": title,
        "Nội dung": content,
      })
    )
      return;

    if (emailErrorMessage) {
      toast.error(emailErrorMessage);
      return;
    }

    const newContactData = { name, email, title, content };

    try {
      setIsLoading(true);

      await sendRequest(CREATE_CONTACT, "POST", newContactData);

      toast.success("Contact đã được tạo thành công!");

      setName("");
      setEmail("");
      setTitle("");
      setContent("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("❌ Lỗi khi tạo contact:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
    Aos.refresh();
  }, []);
  return (
    <div className="contact-form container">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
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
                onChange={handleEmailChange}
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
