import React, { useState, useEffect } from "react";
import "../../../../Assets/scss/Clients/Footer.scss";
import background from "../../../../Assets/img/background.jpg";
import { FiSend } from "react-icons/fi";
import { MdTravelExplore } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  // add a scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
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
    if (!email) {
      missingInfo.push("Email");
    } else if (emailErrorMessage) {
      // Kiểm tra nếu có errorMessage cho email
      toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
      return; // Dừng xử lý tiếp theo nếu có lỗi
    }
    if (missingInfo.length > 0) {
      const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
        ",  "
      )}`;
      toast.error(message);
    } else {
      try {
        const newContactData = {
          content: "Cần liên hệ",
          email: email,
          name: "Cần liên hệ",
          title: "Cần liên hệ",
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
          toast.success("Chúng tôi đã nhận được email cần liên hệ của bạn!");

          // Reset form hoặc làm gì đó khác
          setEmail("");
        } else {
          console.error("Có lỗi xảy ra khi tạo contact!");
          toast.error("Có lỗi xảy ra khi tạo liên hệ!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi:", error);
      }
    }
  };

  return (
    <section className="footer">
      <div className="footerBackground">
        <img src={background} alt="footer background" />
        <div className="overlay"></div>
      </div>

      <div className="secContent container">
        <div className="contactDiv">
          <div className="contactText">
            <small>KEEP IN TOUCH</small>
            <h2>Booking with us</h2>
          </div>

          <div className="contactForm">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button className="btn" type="submit" onClick={handleCreateContact}>
              SEND <FiSend className="icon" />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <Link to="/" className="logo flex">
                <MdTravelExplore className="icon" />
                <span className="logo-text">RoadLines</span>
              </Link>
            </div>

            <div className="footerParagraph">
              <h2>Thông tin liên hệ</h2>
              <h4 className="span2">
                Địa chỉ: Kp.6, Phường Linh Trung, TP Thủ Đức, TP. Hồ Chí Minh
              </h4>
              <h4 className="span3">Email: roadlinebooking@gmail.com</h4>
              <h4 className="span4">Điện thoại: 0123456789</h4>
            </div>

            <div className="footerSocials">
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <AiFillInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
          </div>

          <div className="footerLinks flex">
            {/* Group One */}
            <div className="linkGroup">
              <span className="groupTitile">Thông tin</span>

              <li className="footerList flex">
                <Link to="/aboutUs" className="foot_text">
                  <FiChevronRight className="icon" />
                  Về chúng tôi
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/contact" className="foot_text">
                  <FiChevronRight className="icon" />
                  Liên hệ
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/route" className="foot_text">
                  <FiChevronRight className="icon" />
                  Lịch trình
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/" className="foot_text">
                  <FiChevronRight className="icon" />
                  Điều khoản
                </Link>
              </li>
            </div>

            {/* Group Two */}
            <div className="linkGroup">
              <span className="groupTitile">Điều hướng</span>

              <li className="footerList flex">
                <Link to="/" className="foot_text">
                  <FiChevronRight className="icon" />
                  Trang chủ
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/contact" className="foot_text">
                  <FiChevronRight className="icon" />
                  Liên hệ
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/route" className="foot_text">
                  <FiChevronRight className="icon" />
                  Lịch trình
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/search_ticket" className="foot_text">
                  <FiChevronRight className="icon" />
                  Tra cứu vé
                </Link>
              </li>
            </div>

            {/* Group Three */}
            <div className="linkGroup">
              <span className="groupTitile">Hỗ trợ</span>

              <li className="footerList flex">
                <Link to="/contact" className="foot_text">
                  <FiChevronRight className="icon" />
                  Liên hệ
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/search_ticket" className="foot_text">
                  <FiChevronRight className="icon" />
                  Tra cứu vé
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/" className="foot_text">
                  <FiChevronRight className="icon" />
                  Điều khoản
                </Link>
              </li>

              <li className="footerList flex">
                <Link to="/route" className="foot_text">
                  <FiChevronRight className="icon" />
                  Lịch trình
                </Link>
              </li>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>BEST TRAVEL WEBSITE THEME</small>
            <small>COPYRIGHTS RESERVED - ISRATECH 2024</small>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
