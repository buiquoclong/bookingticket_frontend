import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../Assets/img/404.svg";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img src={notfound} alt="no data" className="not-found-image" />
      <p>Oops! Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/">
        <div className="back" style={{ paddingLeft: "0" }}>
          <button className="btn backbtn">Quay về trang chủ</button>
        </div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
