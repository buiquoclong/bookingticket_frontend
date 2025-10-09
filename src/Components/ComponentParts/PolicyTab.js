import React from "react";
import "./Policy.scss";
const PolicyTab = () => {
  return (
    <div className="policyCenter">
      <div className="policyItem">
        <div className="content">
          <div className="itemContent">Chính sách hủy vé</div>
          <div className="listpolicy">
            <div className="listpolicyItem">
              <ul>
                <li>
                  <p>Chỉ được chuyển đổi vé 1 lần duy nhất</p>
                </li>
                <li>
                  <p>
                    Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy
                    vé so với giờ khởi hành ghi trên vé và số lượng vé cá
                    nhân/tập thể áp dụng theo các quy định hiện hành.
                  </p>
                </li>
                <li>
                  <p>
                    Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh
                    toán, cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy
                    vé chậm nhất trước 24h so với giờ xe khởi hành được ghi trên
                    vé, trên email hoặc tin nhắn để được hướng dẫn thêm.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="policyItem">
        <div className="content">
          <div className="itemContent">Yêu cầu khi lên xe</div>
          <div className="listpolicy">
            <div className="listpolicyItem">
              <ul>
                <li>
                  <p>
                    Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp)
                    trước 30 phút để làm thủ tục lên xe (đối với ngày lễ tết cần
                    ra trước 60 phút).
                  </p>
                </li>
                <li>
                  <p>
                    Xuất trình thông tin vé được gửi qua SMS/Email hoặc liên hệ
                    quầy vé để nhận thông tin vé trước khi lên xe
                  </p>
                </li>
                <li>
                  <p>Không mang thức ăn/đồ uống có mùi lên xe.</p>
                </li>
                <li>
                  <p>
                    Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng
                    chất kích thích trên xe.
                  </p>
                </li>
                <li>
                  <p>Không mang các vật dễ cháy nổ lên xe.</p>
                </li>
                <li>
                  <p>Không vứt rác trên xe.</p>
                </li>
                <li>
                  <p>Không mang động vật lên xe.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="policyItem">
        <div className="content">
          <div className="itemContent">hành lý xách tay</div>
          <div className="listpolicy">
            <div className="listpolicyItem">
              <ul>
                <li>
                  <p>Tổng trọng lượng hành lý không vượt quá 20kg</p>
                </li>
                <li>
                  <p>Không vận chuyển hàng hoá cồng kềnh</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="policyItem">
        <div className="content">
          <div className="itemContent">
            Trẻ em dưới 6 tuổi và phụ nữ có thai
          </div>
          <div className="listpolicy">
            <div className="listpolicyItem">
              <ul>
                <li>
                  <p>
                    Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới
                    30kg thì không phải mua vé.
                  </p>
                </li>
                <li>
                  <p>
                    Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên
                    sẽ mua 01 vé tương đương với người lớn.
                  </p>
                </li>
                <li>
                  <p>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</p>
                </li>
                <li>
                  <p>
                    Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di
                    chuyển.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="policyItem">
        <div className="content">
          <div className="itemContent">Vé đón đường</div>
          <div className="listpolicy">
            <div className="listpolicyItem">
              <ul>
                <li>
                  <p>
                    Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng
                    đăng kí trước ít nhất 2 tiếng so với giờ xe khởi hành và vui
                    lòng chuẩn bị hành lý nhỏ gọn (tối đa 20kg).
                  </p>
                </li>
                <li>
                  <p>
                    Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện
                    nằm trên lộ trình
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyTab;
