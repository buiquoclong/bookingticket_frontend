import React, { useCallback, useEffect, useState, useRef } from "react";
import "../../../Assets/scss/Clients/Home.scss";
import background from "../../../Assets/img/background.jpg";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Aos from "aos";
import "aos/dist/aos.css";
import RouteCard from "../../ComponentParts/RouteCard";
import SearchTripForm from "../../ComponentParts/SearchTripForm";

const Home = () => {
  // add a scroll animation
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const location = useLocation();
  const { diemdiId, diemdenId } = location.state || {};
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [citiesLoaded, setCitiesLoaded] = useState(false);

  const selectRef = useRef(null);

  // State của chuyến đi (gửi xuống form)
  const [formValues, setFormValues] = useState({
    kind: "Một chiều",
    origin: "",
    destination: "",
    originId: null,
    destinationId: null,
    dayStart: "",
    dayReturn: "",
  });

  useEffect(() => {
    fetchCities().then(() => setCitiesLoaded(true));
    fetchRoutes();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/city");
      const data = await res.json();
      setCities(data);
    } catch (e) {
      console.error("Error fetching cities:", e);
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/route/active");
      const data = await res.json();
      setData(data);
    } catch (e) {
      console.error("Error fetching routes:", e);
    }
  };

  const updateOriginAndDestination = useCallback(
    (originId, destinationId) => {
      const originCity = cities.find((city) => city.id === originId);
      const destinationCity = cities.find((city) => city.id === destinationId);

      if (originCity && destinationCity) {
        setFormValues((prev) => ({
          ...prev,
          originId,
          destinationId,
          origin: originCity.name,
          destination: destinationCity.name,
        }));
      } else {
        toast.error("City not found!");
      }
    },
    [cities]
  );

  useEffect(() => {
    if (diemdiId && diemdenId && citiesLoaded) {
      updateOriginAndDestination(diemdiId, diemdenId);
    }
  }, [diemdiId, diemdenId, citiesLoaded, updateOriginAndDestination]);

  // Khi click "Đặt vé" ở RouteCard → cập nhật form + scroll
  const handleBookingClick = (diemdiId, diemdenId) => {
    updateOriginAndDestination(diemdiId, diemdenId);
    if (selectRef.current) {
      selectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="home" ref={selectRef}>
        <div className="overlay"></div>
        <img src={background} alt="background" className="backgroundImage" />

        <div className="homeContent container">
          <div className="headerText">
            <h1 className="homeTitle">Tìm kiếm chuyến đi của bạn</h1>
          </div>

          <SearchTripForm
            formValues={formValues}
            setFormValues={setFormValues}
            cities={cities}
            navigateTo="/book-ticket"
          />

          <div className="homeFooterIcons">
            <div className="socialIcons">
              <FiFacebook className="icon" />
              <AiOutlineInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
            <div className="utilityIcons">
              <BsListTask className="icon" />
              <TbApps className="icon" />
            </div>
          </div>
        </div>
      </section>

      <section className="main container section">
        <div className="secTitle">
          <h3 className="title">TUYẾN XE PHỔ BIẾN</h3>
        </div>

        <div className="secContent grid">
          {data &&
            data.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                handleBookingClick={handleBookingClick}
              />
            ))}
        </div>
      </section>
    </>
  );
};
export default Home;
