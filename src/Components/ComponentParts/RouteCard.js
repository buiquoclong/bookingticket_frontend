import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import "./ComponentParts.scss";

const RouteCard = ({ route, handleBookingClick }) => {
  return (
    // <div key={route.id} className="singleDestination routeCard">
    <div
      key={route.id}
      className="routeCard"
      data-aos="fade-up" // hiệu ứng từ dưới lên
      data-aos-duration="1000" // thời gian animation
      // data-aos-once="true" // chỉ chạy 1 lần
    >
      <div className="imageContainer">
        <img
          src={route.diemDi.imgUrl}
          alt={route.name}
          className="routeImage"
        />
      </div>

      <div className="cardInfo">
        <div className="routeHeader">
          <h4 className="desTitle">{route.name}</h4>

          <div className="routeLocations">
            <div className="locationItem">
              <HiOutlineLocationMarker className="icon" />
              <span className="locationName">{route.diemDi.name}</span>
            </div>

            <span className="separator">— — —</span>

            <div className="locationItem">
              <HiOutlineLocationMarker className="icon" />
              <span className="locationName">{route.diemDen.name}</span>
            </div>
          </div>
        </div>

        <div className="routeStats">
          <div className="statItem distance">
            <span className="label">Quãng đường:</span>
            <span className="value">
              {route.khoangCach} km <small>+</small>
            </span>
          </div>

          <div className="statItem duration">
            <span className="label">Thời gian:</span>
            <span className="value">{route.timeOfRoute} giờ</span>
          </div>
        </div>

        <div className="desc">
          <div className="descItem">
            <span className="label">Tuyến đường:</span>
            <span className="value">{route.name}</span>
          </div>
          <div className="descItem">
            <span className="label">Quãng đường:</span>
            <span className="value">{route.khoangCach} km</span>
          </div>
          <div className="descItem">
            <span className="label">Thời gian đi:</span>
            <span className="value">{route.timeOfRoute} giờ</span>
          </div>
        </div>

        <button
          className="btn flex"
          onClick={() => handleBookingClick(route.diemDi.id, route.diemDen.id)}
        >
          <span className="btnText">ĐẶT VÉ</span>
          <FaArrowRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default RouteCard;
