import React, {useState} from "react";

import "./BookingTicket.scss";
import { Link } from 'react-router-dom';


const BookingTicket = () =>{
    
    const [showLocationInput, setShowLocationInput] = useState(false);

    const handleSelectChange = (event) => {
        setShowLocationInput(event.target.value === 'Yes');
    };
    return(
        <section className="main container section">
            <div className="bookingContent flex">
                <div className="infoTicket">
                    <div className="lineInfo">
                        <span>Tuyến:</span>
                        <div className="rightInfo">
                            <span>Sài Gòn - Dak Lak</span>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Loại xe:</span>
                        <div className="rightInfo">
                            <span>Limousine</span>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Ngày:</span>
                        <div className="rightInfo">
                            <span>6/4/2024</span>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Thời gian:</span>
                        <div className="rightInfo">
                            <span>08:00</span>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Số ghế:</span>
                        <div className="rightInfo">
                            <span>A01, A02, A03</span>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Giá:</span>
                        <div className="rightInfo">
                            <span>300.000đ x 3 = 900.000đ</span>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Ghi chú:</span>
                        <div >
                            <input type="text" className="Note" placeholder="Thêm ghi chú ở đây"/>
                        </div>
                    </div>
                    <div className="lineInfo">
                        <span>Chọn điểm đón:</span>
                        <div className="selectChoose">
                            <select onChange={handleSelectChange}>
                                <option value="No">Không</option>
                                <option value="Yes">Có</option>
                            </select>
                        </div>
                    </div>
                    {showLocationInput && (
                        <div className="lineInfo">
                            <span>Nơi đón:</span>
                            <div>
                                <input type="text" className="Note" placeholder="Nhập nơi đón ở đây"/>
                            </div>
                        </div>
                    )}
                    <div className="policyCheckbox">
                        <label className="chekcBox">
                            <span>
                                <span><input type="checkbox" className="checkbox-input" value="1"/></span>
                                <span className="yes" style={{marginLeft:"10px"}}>Tôi chấp nhận với các điều khoản</span>
                            </span>
                        </label>
                    </div>
                    <div className="buttonList">
                        <button className="btn cancle"><Link to="/">Hủy</Link></button>
                        <button className="btn pay"><Link to="/pay">Thanh toán</Link></button>
                    </div>
                </div>
                <div className="policyInfo">
                    <div className="titlePolicy">
                        <h1><span>ĐIỀU KHOẢN &</span><span style={{color:"red"}}> LƯU Ý</span></h1>
                    </div>
                    <div className="devide"></div>
                    <div className="contentPolicy">
                        <div><span style={{color:"red"}}>(*)</span> Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất <span style={{color:"red", fontWeight:"600"}}>20 phút</span> để thực hiện đổi vé.</div>
                        <div><span style={{color:"red"}}>(*)</span> Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/ đổi vé </div>
                        <div><span style={{color:"red"}}>(*)</span> Chúng tôi không thể đón tại những điểm xe trung chuyển không thể đến được hoặc vượt quá bán kính 4km từ nhà xe</div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}
export default BookingTicket