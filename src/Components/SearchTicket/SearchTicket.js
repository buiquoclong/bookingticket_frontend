import React, {useState} from "react";
import "./SearchTicket.scss";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchTicket  = () => {
    const [ticketCode, setTicketCode] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [ticketCodeErrorMessage, setTicketCodeErrorMessage] = useState('');
    
    const [data, setData] = useState([]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const handleSearch = async (event) => {
        event.preventDefault();
        let missingInfo = [];
        if (!ticketCode) {
            missingInfo.push("Mã vé");
        } else if (ticketCodeErrorMessage) {
            toast.error(ticketCodeErrorMessage);
            return;
        }
        if (missingInfo.length > 0) {
            const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
            toast.error(message);
        } else {
            try {
                const response = await fetch(`http://localhost:8081/api/boking_detail/${ticketCode}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 404) {
                    toast.error("Không tìm thấy dữ liệu");
                    return;
                }
                    const data = await response.json();
                    setData(data);
                    setIsSearch(true);
                
            } catch (error) {
                
                toast.error("Không tìm thấy dữ liệu");
            }  
            
            setIsSearch(true) 
        }
    };

    const handleTicketCodeChange = (event) => {
        const ticketCode = event.target.value;
        
        // Kiểm tra xem mã vé có trống không
        if (ticketCode.trim() === '') {
            // Nếu trống, hiển thị thông báo lỗi
            setTicketCodeErrorMessage('Mã vé không được để trống');
        } else {
            // Nếu không trống, xóa thông báo lỗi (nếu có)
            setTicketCodeErrorMessage('');
        }
        setTicketCode(ticketCode);
    };

    return (
            <section className="main container section">
                <div className="searchTicket ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            TRA CỨU THÔNG TIN ĐẶT VÉ
                        </h3>
                    </div>

                    <form className="infoTicket">
                        {/* <div className="infoT">
                            <div className="form-feild">
                                <input type="text" className="input" placeholder=" " value={email} onChange={handleEmailChange}/>
                                <label for="name" className="label"> Vui lòng nhập Email</label>
                            </div>
                            {emailErrorMessage && <p style={{ color: "red", lineHeight:"2" }}>{emailErrorMessage}</p>}
                        </div> */}
                        <div className="infoT">
                            <div className="form-feild">
                                <input type="text" className="input" placeholder=" " value={ticketCode} onChange={handleTicketCodeChange}/>
                                <label for="name" className="label"> Vui lòng nhập mã vé</label>
                            </div>
                            {ticketCodeErrorMessage && <p style={{ color: "red", lineHeight:"2", paddingLeft:"1rem" }}>{ticketCodeErrorMessage}</p>}
                        </div>
                        
                        <button className="btn search" onClick={handleSearch}>Tra cứu</button>
                    </form>
                </div>
                {isSearch && (
                    <div class="modal1" id="deleteModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    {data &&
                                        <div className="infoTicket" key={data.id}>
                                            <div className="content">
                                                {data.roundTrip === 1 ? (
                                                    <div className="titlePay" style={{fontSize:"2rem"}}>Thông tin chi tiết lượt về</div>
                                                ) : (
                                                    <divc lassName="titlePay" style={{fontSize:"2rem"}}>Thông tin chi tiết lượt đi</divc>
                                                )}
                                            </div>
                                            <div className="ticketInfo">
                                                <div className="tripInfo">
                                                    <span>Mã vé:</span>
                                                    <div className="rightInfo">
                                                        <span>{data.id}</span>
                                                    </div>
                                                </div>
                                                <div className="tripLabel">
                                                    <div className="tripInfo">
                                                        <span>Tuyến đi:</span>
                                                        <div className="rightInfo">
                                                            <span>{data.trip.route.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="tripInfo">
                                                        <span>Ngày đi:</span>
                                                        <div className="rightInfo">
                                                            <span>{formatDate(data.trip.dayStart)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="tripInfo">
                                                        <span>Giờ khởi hành:</span>
                                                        <div className="rightInfo">
                                                            <span>{data.trip.timeStart.slice(0, 5)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="tripInfo">
                                                        <span>Loại xe/ Biến số:</span>
                                                        <div className="rightInfo">
                                                            <span>{data.trip.vehicle.kindVehicle.name}/ {data.trip.vehicle.vehicleNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="seatInfo">
                                                    <span>Ghế đã chọn: </span>
                                                    <div className="rightInfo">
                                                        <span>{data.seatName}</span>
                                                    </div>
                                                </div>
                                                <div className="tripInfo">
                                                    <span>Tổng tiền:</span>
                                                    <div className="rightInfo">
                                                        <span>{data.price.toLocaleString('vi-VN')}VND</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsSearch(false)} className="cancel">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer
                        className="toast-container"
                        toastClassName="toast"
                        bodyClassName="toast-body"
                        progressClassName="toast-progress"
                        theme='colored'
                        transition={Zoom}
                        autoClose={500}
                        hideProgressBar={true}
                        pauseOnHover
                    ></ToastContainer>
            </section>
    )
}
export default SearchTicket;