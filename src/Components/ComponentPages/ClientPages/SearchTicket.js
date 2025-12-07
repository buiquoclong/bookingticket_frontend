import React, { useState } from "react";
import "../../../Assets/scss/Clients/SearchTicket.scss";
import { toast } from "react-toastify";
import BookingTicketInfo from "../../ComponentParts/TicketInfoComponents/BookingTicketInfo";
import { FaSearch } from "react-icons/fa";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { sendRequest } from "../../../Utils/apiHelper";
import { GET_BOOKING_DETAIL_BY_ID } from "../../../Utils/apiUrls";

const SearchTicket = () => {
  const [ticketCode, setTicketCode] = useState("");
  const [ticketCodeErrorMessage, setTicketCodeErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTicketCodeChange = (e) => {
    const value = e.target.value.trimStart();
    setTicketCode(value);

    if (!value) {
      setTicketCodeErrorMessage("Mã vé không được để trống");
    } else if (!/^[A-Za-z0-9-]+$/.test(value)) {
      setTicketCodeErrorMessage("Mã vé không hợp lệ");
    } else {
      setTicketCodeErrorMessage("");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!ticketCode.trim()) {
      setTicketCodeErrorMessage("Vui lòng nhập mã vé");
      return;
    }

    if (ticketCodeErrorMessage) {
      toast.error(ticketCodeErrorMessage);
      return;
    }

    try {
      setIsLoading(true);
      setIsSearch(false);
      setData([]);

      const result = await sendRequest(
        GET_BOOKING_DETAIL_BY_ID(ticketCode),
        "GET"
      );

      if (!result || (Array.isArray(result) && result.length === 0)) {
        toast.error("Không tìm thấy vé xe có mã tương ứng");
        return;
      }

      const formattedData = Array.isArray(result) ? result : [result];

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData(formattedData);
      setIsSearch(true);
    } catch (error) {
      console.error(error);
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="ticket-lookup container section">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <div className="ticket-lookup__card">
        <h3 data-aos="fade-right" className="ticket-lookup__title">
          Tra cứu thông tin đặt vé
        </h3>

        <form onSubmit={handleSearch} className="ticket-lookup__form">
          <div className="ticket-lookup__input-group">
            <input
              type="text"
              className={`ticket-lookup__input ${
                ticketCodeErrorMessage ? "ticket-lookup__input--error" : ""
              }`}
              placeholder="Nhập mã vé..."
              value={ticketCode}
              onChange={handleTicketCodeChange}
            />
            <button type="submit" className="ticket-lookup__button">
              <FaSearch />
            </button>
          </div>

          {ticketCodeErrorMessage && (
            <p className="ticket-lookup__error">{ticketCodeErrorMessage}</p>
          )}
        </form>
      </div>

      {!isLoading && isSearch && data.length > 0 && (
        <div className="ticket-lookup__result">
          <BookingTicketInfo
            kind={data[0]?.roundTrip === 1 ? "Khứ hồi" : "Một chiều"}
            data={data}
          />
        </div>
      )}
    </section>
  );
};
export default SearchTicket;
