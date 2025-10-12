import React from "react";
import "../../../Assets/scss/Clients/AboutUs.scss";
import "aos/dist/aos.css";
import travel from "../../../Assets/img/travel.png";

const AboutUs = () => {
  return (
    <>
      <div className="about-us container">
        <section className="introduction">
          <div className="image-content">
            <img src={travel} alt="Travel" />
          </div>
          <div className="text-content">
            <h1>ROADLINES</h1>
            <h2>"Chất lượng là danh dự"</h2>
            <p>
              Roadlines được thành lập năm 2000. Trải qua hơn 20 năm phát triển,
              đặt khách hàng là trọng tâm, chúng tôi luôn không ngừng cải tiến
              để mang đến chất lượng dịch vụ tốt nhất cho khách hàng.
            </p>
            <p>
              Với đội ngũ nhân viên chuyên nghiệp và tận tâm, chúng tôi cung cấp
              các dịch vụ vận chuyển đa dạng và linh hoạt, đảm bảo độ an toàn
              cao và đúng hẹn, đồng thời tạo ra trải nghiệm thoải mái và tiện
              lợi cho khách hàng.
            </p>
          </div>
        </section>

        <section className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6589.666751647204!2d106.79131401002523!3d10.869395645813878!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1718203701908!5m2!1svi!2s"
            allowFullScreen
            loading="lazy"
            title="Google Map"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
