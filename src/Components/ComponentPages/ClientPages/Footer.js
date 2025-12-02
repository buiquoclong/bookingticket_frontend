import React, { useState, useEffect } from "react";
import "../../../Assets/scss/Clients/Footer.scss";
import background from "../../../Assets/img/background.jpg";
import { FiSend } from "react-icons/fi";
import { MdTravelExplore } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { sendRequest } from "../../../Utils/apiHelper";
import { CREATE_CONTACT } from "../../../Utils/apiUrls";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
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

    if (!email) {
      toast.error("Vui lòng nhập Email");
      return;
    }

    if (emailErrorMessage) {
      toast.error(emailErrorMessage);
      return;
    }

    try {
      setIsLoading(true);

      const newContactData = {
        name: "Cần liên hệ",
        email,
        title: "Cần liên hệ",
        content: "Cần liên hệ",
      };

      await sendRequest(CREATE_CONTACT, "POST", newContactData);

      toast.success("Chúng tôi đã nhận được email cần liên hệ của bạn!");
      setEmail("");
    } catch (error) {
      console.error("❌ Lỗi khi tạo contact:", error);
      toast.error("Có lỗi xảy ra khi gửi yêu cầu liên hệ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="footer">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
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
