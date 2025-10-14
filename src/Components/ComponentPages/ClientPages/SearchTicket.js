import React, { useState } from "react";
import "../../../Assets/scss/Clients/SearchTicket.scss";
import { toast } from "react-toastify";
import BookingTicketInfo from "../../ComponentParts/TicketInfoComponents/BookingTicketInfo";
import { FaSearch } from "react-icons/fa";

const SearchTicket = () => {
  const [ticketCode, setTicketCode] = useState("");
  const [ticketCodeErrorMessage, setTicketCodeErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTicketCodeChange = (e) => {
    const value = e.target.value.trimStart();
    setTicketCode(value);

    if (!value) {
      setTicketCodeErrorMessage("Mã vé không được để trống");
    } else if (!/^[A-Za-z0-9-]+$/.test(value)) {
      // 🔹 Regex kiểm tra ký tự hợp lệ (chữ, số, hoặc "-")
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
      setLoading(true); // bắt đầu loading
      setIsSearch(false);
      setData([]);

      const response = await fetch(
        `http://localhost:8081/api/booking_detail/${ticketCode}`
      );
      if (!response.ok) {
        if (response.status === 404)
          toast.error("Không tìm thấy vé xe có mã tương ứng");
        else toast.error("Đã xảy ra lỗi khi tìm kiếm vé");
        return;
      }

      const result = await response.json();
      // Nếu API trả về object thì bọc vào mảng, nếu là array thì giữ nguyên
      const formattedData = Array.isArray(result) ? result : [result];

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData(formattedData);
      setIsSearch(true);
      // toast.success("Tìm thấy thông tin vé!");
    } catch (error) {
      console.error(error);
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false); // dừng loading
    }
  };
  return (
    <section className="ticket-lookup container section">
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

      {loading && (
        <div className="loading">
          <div className="loading__spinner"></div>
          <span className="loading__text">Đang tải dữ liệu...</span>
        </div>
      )}

      {!loading && isSearch && data.length > 0 && (
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
