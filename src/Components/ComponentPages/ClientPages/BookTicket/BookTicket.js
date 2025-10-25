import React, { useCallback, useState, useEffect } from "react";
import "../../../../Assets/scss/Clients/BookTicket.scss";
import { toast } from "react-toastify";
import TripList from "../../../ComponentParts/TripResultComponents/TripList";
import SearchResultsHeader from "../../../ComponentParts/TripResultComponents/SearchResultsHeader";
import LoadingBackdrop from "../../../ComponentParts/LoadingBackdrop";
import { useNavigate, useLocation } from "react-router-dom";

const BookTicket = () => {
  const location = useLocation();
  const {
    diemDiId,
    diemDiName,
    diemDenId,
    diemDenName,
    dayStart,
    dayReturn,
    kind,
  } = location.state || {};

  console.log(kind);
  const [selectedSeatsById, setSelectedSeatsById] = useState({});
  const [kindVehicledata, setKindVehicledata] = useState([]);
  const [data, setData] = useState(null);
  const [seats, setSeats] = useState([]);
  const [timeStartFrom, setTimeStartFrom] = useState("");
  const [timeStartTo, setTimeStartTo] = useState("");
  const [kindVehicleId, setKindVehicleId] = useState("");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleTimeChange = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case "1":
        setTimeStartFrom("00:01");
        setTimeStartTo("06:00");
        break;
      case "2":
        setTimeStartFrom("06:01");
        setTimeStartTo("12:00");
        break;
      case "3":
        setTimeStartFrom("12:01");
        setTimeStartTo("18:00");
        break;
      case "4":
        setTimeStartFrom("18:01");
        setTimeStartTo("23:59");
        break;
      default:
        setTimeStartFrom("");
        setTimeStartTo("");
    }
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleKindChange = (event) => {
    setKindVehicleId(event.target.value);
  };

  const navigate = useNavigate();

  const fetchTrip = useCallback(async () => {
    setIsLoading(true); // ✅ Bắt đầu hiển thị loading

    const postData = {
      diemDiId,
      diemDenId,
      dayStart,
      timeStartFrom,
      timeStartTo,
      kindVehicleId,
      sort,
    };

    try {
      const response = await fetch("http://localhost:8081/api/trip/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Không thể tải danh sách chuyến đi!");
      }

      const data = await response.json();
      console.log("data", data);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    diemDiId,
    diemDenId,
    dayStart,
    timeStartFrom,
    timeStartTo,
    sort,
    kindVehicleId,
  ]);

  const fetchKindVehicles = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8081/api/kindVehicle");
      const data = await response.json();
      setKindVehicledata(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }, []);
  useEffect(() => {
    fetchTrip();
    fetchKindVehicles();
  }, [fetchTrip, fetchKindVehicles]);

  const handleClick = (seatId, tuyenId) => {
    console.log(seatId);
    const tuyen = data.find((tuyen) => tuyen.id === tuyenId);
    if (tuyen) {
      const clickedSeat = seats?.find((seat) => seat.id === seatId);
      const isSelected = selectedSeatsById[tuyenId]?.some(
        (seat) => seat.id === seatId
      );

      if (isSelected) {
        setSelectedSeatsById((prevSeats) => ({
          ...prevSeats,
          [tuyenId]: prevSeats[tuyenId].filter((seat) => seat.id !== seatId),
        }));
      } else {
        if (clickedSeat?.status !== 1) {
          if (
            !selectedSeatsById[tuyenId] ||
            selectedSeatsById[tuyenId].length < 5
          ) {
            setSelectedSeatsById((prevSeats) => ({
              ...prevSeats,
              [tuyenId]: [
                ...(prevSeats[tuyenId] || []),
                {
                  id: clickedSeat.id,
                  tenghe: clickedSeat.name,
                  giave: tuyen.price,
                  status: clickedSeat.status,
                },
              ],
            }));
          } else {
            toast.error("Bạn chỉ có thể chọn tối đa 5 ghế mỗi lần!");
          }
        }
      }
    }
  };

  const getSelectedSeatIds = (tuyenId) => {
    const selectedSeats = selectedSeatsById[tuyenId] || [];
    return selectedSeats.map((seat) => seat.id);
  };

  const calculateTotalPriceById = (tuyenId) => {
    const selectedSeats = selectedSeatsById[tuyenId] || [];
    return selectedSeats.reduce((total, seat) => total + seat.giave, 0);
  };
  const formatSelectedSeatsById = (tuyenId) => {
    const selectedSeats = selectedSeatsById[tuyenId] || [];
    return selectedSeats.map((seat) => seat.tenghe).join(", ");
  };

  const handleContinueClick = (tuyenId) => {
    const totalPrice = calculateTotalPriceById(tuyenId);
    const selectedSeatsNames = formatSelectedSeatsById(tuyenId);
    const selectedSeatIds = getSelectedSeatIds(tuyenId); // Lấy danh sách ID của các ghế đã chọn

    if (kind === "Một chiều") {
      // Chuyển hướng đến trang mới và truyền thông tin cần thiết thông qua state của location
      navigate("/booking-ticket", {
        state: {
          tripId: tuyenId,
          selectedSeatsNames: selectedSeatsNames,
          selectedSeatIds: selectedSeatIds, // Thêm ID của các ghế vào state để gửi đi
          totalPrice: totalPrice,
          dayReturn: dayReturn,
          kind: kind,
        },
      });
    } else if (kind === "Khứ hồi") {
      // Chuyển hướng đến trang mới và truyền thông tin cần thiết thông qua state của location
      navigate("/book-ticketreturn", {
        state: {
          diemDiId: diemDiId,
          diemDiName: diemDiName,
          diemDenId: diemDenId,
          diemDenName: diemDenName,
          dayStart: dayStart,
          dayReturn: dayReturn,
          kind: kind,
          tripId: tuyenId,
          selectedSeatsNames: selectedSeatsNames,
          selectedSeatIds: selectedSeatIds, // Thêm ID của các ghế vào state để gửi đi
          totalPrice: totalPrice,
        },
      });
    }
  };

  return (
    <>
      <section className="trip-results section">
        <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
        <div className="container">
          <div className="results-wrapper">
            {/* Header */}
            <SearchResultsHeader
              diemDiName={diemDiName}
              diemDenName={diemDenName}
              kind={kind}
              dayStart={dayStart}
              kindVehicledata={kindVehicledata}
              handleTimeChange={handleTimeChange}
              handleSortChange={handleSortChange}
              handleKindChange={handleKindChange}
              onBackClick={() => navigate("/")}
            />

            {/* Danh sách chuyến */}
            <TripList
              data={data}
              selectedSeatsById={selectedSeatsById}
              seats={seats}
              setSeats={setSeats}
              handleClick={handleClick}
              calculateTotalPriceById={calculateTotalPriceById}
              formatSelectedSeatsById={formatSelectedSeatsById}
              handleContinueClick={handleContinueClick}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default BookTicket;
