import React, { useCallback, useState, useEffect } from "react";
import "../../../../Assets/scss/Clients/BookTicket.scss";
import { toast } from "react-toastify";
import TripList from "../../../ComponentParts/TripResultComponents/TripList";
import SearchResultsHeader from "../../../ComponentParts/TripResultComponents/SearchResultsHeader";
import LoadingBackdrop from "../../../ComponentParts/LoadingBackdrop";
import { useNavigate, useLocation } from "react-router-dom";
import { sendRequest } from "../../../../Utils/apiHelper";
import { SEARCH_TRIP, GET_ALL_KIND_VEHICLE } from "../../../../Utils/apiUrls";

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
    setIsLoading(true);

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
      const data = await sendRequest(SEARCH_TRIP, "POST", postData);

      if (!data || data.length === 0) {
        toast.info("Không tìm thấy chuyến đi phù hợp!");
        setData([]);
        return;
      }

      console.log("✅ Trip data:", data);
      setData(data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách chuyến đi:", error);
      toast.error("Không thể tải danh sách chuyến đi!");
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
      const data = await sendRequest(GET_ALL_KIND_VEHICLE, "GET");
      setKindVehicledata(data);
    } catch (error) {
      console.error("Error fetching kind vehicles:", error);
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
