import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../Assets/img/404.svg";
import "./AdminLayout.scss";

const NotFoundPage = () => {
  return (
    <div className="notfound">
      <div className="notfound__content">
        <img src={notfound} alt="404 Not Found" className="notfound__image" />
        <p className="notfound__text">
          Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link to="/" className="notfound__link">
          <button className="notfound__button">Quay về trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
