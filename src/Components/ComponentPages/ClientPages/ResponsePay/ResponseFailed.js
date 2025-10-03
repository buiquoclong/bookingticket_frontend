import "./ResponsePay.scss";
import { useNavigate } from "react-router-dom";

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
      <div className="reponseInfo ">
        <div className="secTitle">
          <p>Thanh toán thất bại</p>
          <p>Giao dịch của bạn đã bị hủy bỏ</p>
        </div>

        <form className="infoTicket">
          <button className="btn search" onClick={handleBack}>
            Quay lại
          </button>
        </form>
      </div>
    </section>
  );
};
export default ResponseFailed;
