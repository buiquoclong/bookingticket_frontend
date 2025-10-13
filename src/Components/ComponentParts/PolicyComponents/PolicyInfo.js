import "./Policy.scss";

const PolicyInfo = () => {
  return (
    <div className="policy">
      <div className="policy__header">
        <h1 className="policy__title">
          <span>ĐIỀU KHOẢN &</span>
          <span className="policy__highlight"> LƯU Ý</span>
        </h1>
        <div className="policy__divider"></div>
      </div>

      <div className="policy__content">
        <p>
          <span className="policy__icon">⚠️</span>
          <span className="policy__important">(*)</span>
          Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé
          lên xe trước giờ xuất bến ít nhất
          <span className="policy__time"> 20 phút</span>.
        </p>
        <p>
          <span className="policy__icon">⚠️</span>
          <span className="policy__important">(*)</span>
          Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe
          hoặc hủy/đổi vé.
        </p>
      </div>
    </div>
  );
};

export default PolicyInfo;
