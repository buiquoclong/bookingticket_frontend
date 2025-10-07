import "../../../../Assets/scss/Clients/ResponsePay.scss";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

const ResponseFailed = () => {
  const navigate = useNavigate();

  const handleBack = async (event) => {
    event.preventDefault();
    const redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath) {
      navigate(redirectPath);
      localStorage.removeItem("redirectPath");
    } else {
      navigate("/");
    }

    localStorage.removeItem("redirectPath");
    localStorage.removeItem("bookingDetails");
  };

  return (
    <section className="main container section">
      <div className="response-card failure">
        <div className="icon-wrapper">
          <CancelIcon className="failure-icon" />{" "}
          {/* icon đỏ, bạn có thể dùng Material UI hoặc bất kỳ icon nào */}
        </div>

        <div className="response-content">
          <h2 className="response-title">Thanh toán thất bại</h2>
          <p className="response-message">Giao dịch của bạn đã bị hủy bỏ</p>
        </div>

        <form className="action-form">
          <button type="button" className="btn back-btn" onClick={handleBack}>
            Quay lại
          </button>
        </form>
      </div>
    </section>
  );
};
export default ResponseFailed;
