import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineClockCircle } from "react-icons/ai";
import "../../../Assets/scss/Clients/SearchRoute.scss";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { GET_ACTIVE_ROUTES } from "../../../Utils/apiUrls";
import { sendRequest } from "../../../Utils/apiHelper";

const SearchRoute = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [startFilter, setStartFilter] = useState("");
  const [endFilter, setEndFilter] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      const routes = await sendRequest(GET_ACTIVE_ROUTES, "GET");
      const routesWithPrice = routes.map((r) => ({
        ...r,
        price: Math.floor(Math.random() * 200000) + 50000,
      }));
      setData(routesWithPrice);
      setRecords(routesWithPrice);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = data.filter((row) => {
      return (
        row.diemDi.name.toLowerCase().includes(startFilter.toLowerCase()) &&
        row.diemDen.name.toLowerCase().includes(endFilter.toLowerCase())
      );
    });
    setRecords(filtered);
  }, [startFilter, endFilter, data]);

  const handleSearchRouteClick = (originId, destinationId) => {
    navigate("/", {
      state: {
        diemdiId: originId,
        diemdenId: destinationId,
      },
    });
  };

  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section className="search-route-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <div className="filters">
        <input
          type="text"
          placeholder="Tìm điểm đi"
          value={startFilter}
          onChange={(e) => setStartFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tìm điểm đến"
          value={endFilter}
          onChange={(e) => setEndFilter(e.target.value)}
        />
      </div>

      <div className="route-list">
        {records.length > 0 ? (
          records.map((route) => (
            <div className="route-card" key={route.id}>
              <div className="col route-name">
                <div className="route-start">
                  <span className="label">Điểm đi:</span>
                  <span className="text">
                    <FaBus /> {highlightText(route.diemDi.name, startFilter)}
                  </span>
                </div>
                <div className="route-end">
                  <span className="label">Điểm đến:</span>
                  <span className="text">
                    🚏 {highlightText(route.diemDen.name, endFilter)}
                  </span>
                </div>
              </div>

              <div className="col distance">{route.khoangCach} km</div>
              <div className="col time">
                <AiOutlineClockCircle style={{ marginRight: "0.25rem" }} />
                {route.timeOfRoute} giờ
              </div>
              <div className="col price">
                <GiTakeMyMoney style={{ marginRight: "0.25rem" }} />
                {route.price.toLocaleString("vi-VN")} ₫
              </div>
              <div className="col action">
                <button
                  className="btn find-route"
                  onClick={() =>
                    handleSearchRouteClick(route.diemDi.id, route.diemDen.id)
                  }
                >
                  Tìm tuyến xe
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">Không tìm thấy tuyến nào</div>
        )}
      </div>
    </section>
  );
};

export default SearchRoute;
