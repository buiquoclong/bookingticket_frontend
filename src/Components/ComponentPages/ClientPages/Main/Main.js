import React, { useState, useEffect } from "react";
import "./Main.scss";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

const Main = () => {
  const [data, setData] = useState([]);
  // add a scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    // Call the API to fetch cities
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/route");
      const data = await response.json();
      setData(data);
      console.log("Routes:", data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          TUYẾN XE PHỔ BIẾN
        </h3>
      </div>

      <div className="secContent grid">
        {data &&
          data.map((route) => (
            <div
              key={route.id}
              data-aos="fade-up"
              className="singleDestination"
            >
              <div className="imageDiv">
                <img src={route.diemDi.imgUrl} alt={route.name} />
              </div>

              <div className="cardInfo">
                <h4 className="desTitle">{route.name}</h4>
                <span className="continent flex">
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">{route.diemDi.name} -----</span>
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">{route.diemDen.name}</span>
                </span>

                <div className="fees flex">
                  <div className="grade">
                    <span>
                      Quãng đường: {route.khoangCach}
                      <small> +</small>
                    </span>
                  </div>
                  <div className="price">
                    <h5>{route.timeOfRoute} giờ</h5>
                  </div>
                </div>

                <div className="desc">
                  <p>Tuyến đường: {route.name}</p>
                  <p>Quãng đường: {route.khoangCach} km</p>
                  <p>Thời gian đi: {route.timeOfRoute} giờ</p>
                </div>

                <button className="btn flex">
                  <Link to="/book-ticket">
                    ĐẶT VÉ <FaArrowRight className="icon" />
                  </Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default Main;
