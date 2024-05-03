import React, {useState, useEffect} from "react";
import "./BookTicketReturn.scss";
import pickup from "../../Assets/img/pickup.svg";
import station from "../../Assets/img/station.svg";
import seat_active from "../../Assets/img/seat_active.svg";
import seat_disabled from "../../Assets/img/seat_disabled.svg";
import seat_selecting from "../../Assets/img/seat_selecting.svg";
import empty_list from "../../Assets/img/empty_list.svg";
import { MdArrowDropDown } from "react-icons/md";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate, useLocation  } from 'react-router-dom';

const BookTicketReturn = () =>{
    const location = useLocation();
    const { diemDiId, diemDiName, diemDenId, diemDenName, dayStart, dayReturn, kind, tripId, selectedSeatsNames, selectedSeatIds, totalPrice } = location.state || {};

    console.log(kind);
    const [tabValues, setTabValues] = useState({});
    const [selectedSeatsById, setSelectedSeatsById] = useState({});
    
    const [data, setData] = useState(null);
    const [seats, setSeats] = useState([]);
    const [timeStartFrom, setTimeStartFrom] = useState('');
    const [timeStartTo, setTimeStartTo] = useState('');
    const [kindVehicleId, setKindVehicleId] = useState('');
    const [sort, setSort] = useState('');
    const handleTimeChange = (event) => {
        const selectedValue = event.target.value;
        switch (selectedValue) {
            case '1':
                setTimeStartFrom('00:01');
                setTimeStartTo('06:00');
                break;
            case '2':
                setTimeStartFrom('06:01');
                setTimeStartTo('12:00');
                break;
            case '3':
                setTimeStartFrom('12:01');
                setTimeStartTo('18:00');
                break;
            case '4':
                setTimeStartFrom('18:01');
                setTimeStartTo('23:59');
                break;
            default:
                setTimeStartFrom('');
                setTimeStartTo('');
        }
    };
    
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };
    
    const handleKindChange = (event) => {
        setKindVehicleId(event.target.value);
    };
    
    const navigate = useNavigate();

        useEffect(() => {
            fetchTrip();
        }, [timeStartFrom, timeStartTo, sort, kindVehicleId]);

        const fetchTrip = async () => {
            const postData = {
                diemDiId: diemDenId,
                diemDenId: diemDiId,
                dayStart: dayReturn,
                timeStartFrom: timeStartFrom,
                timeStartTo: timeStartTo,
                kindVehicleId: kindVehicleId,
                sort: sort
            };
    
            fetch('http://localhost:8081/api/trip/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };



    const handleTabClick = (tab, tripReturnId, kindVehicleId) => {
        setTabValues(prevState => ({
            ...prevState,
            [tripReturnId]: prevState[tripReturnId] === tab ? null : tab
        }));
        if (tab === 1) {
            console.log("tab1 return")
            console.log("kindVehicleId", kindVehicleId)
            fetch(`http://localhost:8081/api/seat/kind_vehicle/${kindVehicleId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch seats');
                    }
                    return response.json();
                })
                .then(data => {
                    // Lưu danh sách ghế vào state
                    console.log(data);
                    // Lấy danh sách các ghế đã đặt cho chuyến đi
                    fetch(`http://localhost:8081/api/seat_reservation/trip/${tripReturnId}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch reserved seats');
                            }
                            return response.json();
                        })
                        .then(reservedSeats => {
                            console.log('Reserved Seats:', reservedSeats);
                            const updatedSeats = data.map(seat => ({
                                ...seat,
                                status: reservedSeats.some(reservedSeat => reservedSeat.seat.id === seat.id) ? 1 : 0
                            }));
                            setSeats(updatedSeats);
                        })
                        .catch(error => {
                            console.error('Error fetching reserved seats:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching seats:', error);
                });
        }
    };

        
    const getSeatImageAndStyle = (trangthai, isSelected) => {
        switch(trangthai) {
            case 1: // đã bán
                return { src: seat_disabled, tdStyle: { cursor: "not-allowed" }, spanStyle: { color: "#A2ABB3" }  };
            case 2: // Được chọn
                return { src: seat_selecting, tdStyle: {}, spanStyle: { color: "#EF5222" } };
            default:
                return isSelected ? { src: seat_selecting, tdStyle: {}, spanStyle: { color: "#EF5222" } } : { src: seat_active, tdStyle: {}, spanStyle: {} }; // Default case
        }
    }

    const handleClick = (seatId, tuyenId) => {
        console.log(seatId)
        const tuyen = data.find(tuyen => tuyen.id === tuyenId);
        if (tuyen) {
            const clickedSeat = seats?.find(seat => seat.id === seatId);
            const isSelected = selectedSeatsById[tuyenId]?.some(seat => seat.id === seatId);
            
            if (isSelected) {
                setSelectedSeatsById(prevSeats => ({
                    ...prevSeats,
                    [tuyenId]: prevSeats[tuyenId].filter(seat => seat.id !== seatId)
                }));
            } else {
                if (clickedSeat?.status !== 1) {
                    if (!selectedSeatsById[tuyenId] || selectedSeatsById[tuyenId].length < 5) {
                        setSelectedSeatsById(prevSeats => ({
                            ...prevSeats,
                            [tuyenId]: [
                                ...(prevSeats[tuyenId] || []),
                                {
                                    id: clickedSeat.id,
                                    tenghe: clickedSeat.name,
                                    giave: tuyen.price,
                                    status: clickedSeat.status
                                }
                            ]
                        }));
                    } else {
                        toast.error('Bạn chỉ có thể chọn tối đa 5 ghế mỗi lần!');
                    }
                }
            }
        }
    };
    
    


    const calculateTotalPriceById = (tuyenId) => {
        const selectedSeats = selectedSeatsById[tuyenId] || [];
        return selectedSeats.reduce((total, seat) => total + seat.giave, 0);
    };
    const formatSelectedSeatsById = (tuyenId) => {
        const selectedSeats = selectedSeatsById[tuyenId] || [];
        return selectedSeats.map(seat => seat.tenghe).join(', ');
    };

    const renderTicketInfo = (tuyenId) => {
        const selectedSeats = selectedSeatsById[tuyenId] || [];
        return (
            <div className="seatBook">
                <div className="numTicket">
                    <span className="numOfTicket">{selectedSeats.length} Vé<br /><span>{formatSelectedSeatsById(tuyenId)}</span></span>
                </div>
                <div className="priceTicket">
                    <span className="price">
                        <span>Tổng tiền</span>
                        <br />
                        <span className="totalPrice">{calculateTotalPriceById(tuyenId).toLocaleString('vi-VN')}đ</span>
                    </span>
                    <button type="button" className="btn chooseButton" onClick={() => handleContinueClick(tuyenId)}><span>Tiếp tục</span></button>
                </div>
            </div>
        );
    };

    const getSelectedSeatIds = (tuyenId) => {
        const selectedSeats = selectedSeatsById[tuyenId] || [];
        return selectedSeats.map(seat => seat.id);
    };
    
    const handleContinueClick = (tuyenId) => {
        const totalPriceReturn = calculateTotalPriceById(tuyenId);
        const selectedSeatsNamesReturn = formatSelectedSeatsById(tuyenId);
        const selectedSeatIdsReturn = getSelectedSeatIds(tuyenId); // Lấy danh sách ID của các ghế đã chọn
    
        // Chuyển hướng đến trang mới và truyền thông tin cần thiết thông qua state của location
        navigate('/booking-ticket', {
            state: {
                tripId: tripId,
                selectedSeatsNames: selectedSeatsNames,
                selectedSeatIds: selectedSeatIds, // Thêm ID của các ghế vào state để gửi đi
                totalPrice: totalPrice,
                tripIdReturn: tuyenId,
                selectedSeatsNamesReturn: selectedSeatsNamesReturn,
                selectedSeatIdsReturn: selectedSeatIdsReturn, // Thêm ID của các ghế vào state để gửi đi
                totalPriceReturn: totalPriceReturn,
                kind: kind
            }
        });
    };

    function chunkArray(array, chunkSize) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunkedArray.push(array.slice(i, i + chunkSize));
        }
        return chunkedArray;
    }

    function renderTimeWithTwoHours(trip) {
        const startTime = new Date(`${trip.dayStart}T${trip.timeStart}`);
        const routeTime = parseInt(trip.route.timeOfRoute, 10);
        const endTime = new Date(startTime.getTime() + routeTime * 60 * 60 * 1000);
        const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
        return formattedEndTime;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return(
        <>
            <section className="main section">
                <div className="resultList container flex">
                    <div className="listResultSearch flex">
                    <div className="listHeader">
                            {kind === "Một chiều" && (
                                <div>
                                    <h1>Chuyến:  {diemDiName} - {diemDenName}</h1>
                                    <h1>Ngày: {formatDate(dayReturn)}</h1>
                                </div>
                            )}

                            {kind === "Khứ hồi" && (
                                <div>
                                    <h1>Chuyến:  {diemDiName} - {diemDenName} (Lượt về)</h1>
                                    <h1>Ngày: {formatDate(dayReturn)}</h1>
                                </div>
                            )}
                            <div className="lisFilter flex">
                                <div className="lineInfo">
                                    <span>Chọn khung giờ đi:</span>
                                    <div className="selectChoose">
                                        <select onChange={handleTimeChange}>
                                            <option value="">Chọn giờ</option>
                                            <option value="1">00:01 - 06:00</option>
                                            <option value="2">06:01 - 12:00</option>
                                            <option value="3">12:01 - 18:00</option>
                                            <option value="4">18:01 - 23:59</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="lineInfo">
                                    <span>Xếp giá vé:</span>
                                    <div className="selectChoose">
                                        <select onChange={handleSortChange}>
                                            <option value="">Xếp giá</option>
                                            <option value="0">Cao - thấp</option>
                                            <option value="1">Thấp - Cao</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="lineInfo">
                                    <span>Chọn xe:</span>
                                    <div className="selectChoose">
                                        <select onChange={handleKindChange}>
                                            <option value="">Loại xe</option>
                                            <option value="1">Gường nằm</option>
                                            <option value="2">Limousine</option>
                                            <option value="3">Ghế ngồi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cardListResult">

                            {data && data.length > 0 ? (
                                        data.map(trip => (
                                            <div key={trip.id} className="cardOneResult">
                                                <div className="infoResult">    
                                                    <div className="detailInfo">
                                                        <div className="routeInfo">
                                                            <div className="nameInfo">
                                                                <span className="timestart">{trip.timeStart.slice(0, 5)}</span>
                                                                <div className="timeBetween">
                                                                    <img src={pickup} alt="pickup"/>
                                                                    <span className="dotLine"></span>
                                                                    <span className="numTimes">{trip.route.timeOfRoute} giờ<br/><span className="location">(Asian/Ho Chi Minh)</span></span>
                                                                    <span className="dotLine"></span>
                                                                    <img src={station} alt="station"/>
                                                                </div>
                                                                <span className="timeend">{renderTimeWithTwoHours(trip)}</span>
                                                            </div>
                                                            <div className="dessInfo">
                                                                <div className="desStart">
                                                                    <span className="nameStart">{trip.route.diemDi.name}</span>
                                                                </div>
                                                                <div className="desEnd">
                                                                    <span className="nameEnd">{trip.route.diemDen.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="seatInfo">
                                                            <div className="dotSeat"></div>
                                                            <span>{trip.vehicle.kindVehicle.name}</span>
                                                            <div className="dotSeat"></div>
                                                            <span className="text">{trip.emptySeat} chỗ trống</span>
                                                            <span className="price">{trip.price.toLocaleString('vi-VN')} VND</span>
                                                        </div>
                                                    </div>
                                                    <div className="devide"></div>
                                                </div>
                                                <div className="choseRoute">
                                                    <div className="chosseRouteTab">
                                                        <div role="tablist" className="tabChoose">
                                                            <div className="tabChoose_wrap">
                                                                <div className="tabChoose_list">
                                                                    <div className={`tabChoose_tab ${tabValues[trip.id] === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1, trip.id)}>
                                                                        <div role="tab" className="tabChoose_tab_btn">
                                                                            <div className="btn_tabName">
                                                                                <span>Chọn ghế</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={`tabChoose_tab tab1 ${tabValues[trip.id] === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3, trip.id)}>
                                                                        <div role="tab" className="tabChoose_tab_btn">
                                                                            <div className="btn_tabName">
                                                                                <span>Chính sách</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            {tabValues[trip.id] === 1 && (
                                                                <div className="chooseTab">
                                                                    <div className="chooseListTab">
                                                                        <div className="chooseSeatTab">
                                                                            <div className="chooseSeatContent">
                                                                                <div className="seatCenter">
                                                                                    <div className="seatLoca">
                                                                                        <div className="seatLocaInfo">
                                                                                            <div className="seatNote">
                                                                                                <span className="seatNote1"><div className="seatSaled"></div>Đã bán</span>
                                                                                                <span className="seatNote1"><div className="seatNonChose"></div>Còn trống</span>
                                                                                                <span className="seatNote1 seatNote2"><div className="seatChosing"></div>Đang chọn</span>
                                                                                            </div>
                                                                                            <div className="numSeat">
                                                                                                <div className="bottomSeat">
                                                                                                    <div className="nameBottomSeat">
                                                                                                        <span>Danh sách ghế</span>
                                                                                                        <MdArrowDropDown className="icon"/>
                                                                                                    </div>
                                                                                                    <div className="devide"></div>
                                                                                                    <table className="seatBottomnum">
                                                                                                        <tbody>
                                                                                                                {seats && seats.length > 0 && chunkArray(seats, 3).map((seatRow, rowIndex) => (
                                                                                                                    <tr className="seatNum" key={rowIndex}>
                                                                                                                        {seatRow.map((seat, seatIndex) => {
                                                                                                                            const { src, spanStyle } = getSeatImageAndStyle(seat.status);
                                                                                                                            const isSelected = selectedSeatsById[trip.id]?.some(selectedSeat => selectedSeat.id === seat.id);
                                                                                                                            return (
                                                                                                                                <React.Fragment key={seat.id}>
                                                                                                                                    <td className="singleSeat" style={getSeatImageAndStyle(seat.status).tdStyle} onClick={() => handleClick(seat.id, trip.id)}>
                                                                                                                                        {isSelected ? (
                                                                                                                                            <>
                                                                                                                                                <img style={{ width: "32px" }} src={seat_selecting} alt="selected seat icon" />
                                                                                                                                                <span className="numSeatA" style={{color: "#EF5222" }}>{seat.name}</span>
                                                                                                                                            </>
                                                                                                                                        ) : (
                                                                                                                                            <>
                                                                                                                                                <img style={{ width: "32px" }} src={src} alt="seat icon" />
                                                                                                                                                <span className="numSeatA" style={spanStyle}>{seat.name}</span>
                                                                                                                                            </>
                                                                                                                                        )}
                                                                                                                                    </td>
                                                                                                                                    {seatIndex < 2 && <td style={{ position: "relative", width: "1.5rem" }}></td>}
                                                                                                                                </React.Fragment>
                                                                                                                            );
                                                                                                                        })}
                                                                                                                    </tr>
                                                                                                                ))}

                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="devide"></div>
                                                                                    {(selectedSeatsById[trip.id] && selectedSeatsById[trip.id].length > 0) && renderTicketInfo(trip.id)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {tabValues[trip.id] === 3 && (
                                                                <div className="chooseTab">
                                                                <div className="chooseListTab">
                                                                    <div className="chooseSeatTab">
                                                                        <div className="chooseSeatContent">
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
                                                                                                        <p>Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so với giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể áp dụng theo các quy định hiện hành.</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh toán, cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy vé chậm nhất trước 24h so với giờ xe khởi hành được ghi trên vé, trên email hoặc tin nhắn để được hướng dẫn thêm.</p>
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
                                                                                                        <p>Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30 phút để làm thủ tục lên xe (đối với ngày lễ tết cần ra trước 60 phút).</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Xuất trình thông tin vé được gửi qua SMS/Email hoặc liên hệ quầy vé để nhận thông tin vé trước khi lên xe</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Không mang thức ăn/đồ uống có mùi lên xe.</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất kích thích trên xe.</p>
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
                                                                                        <div className="itemContent">Trẻ em dưới 6 tuổi và phụ nữ có thai</div>
                                                                                        <div className="listpolicy">
                                                                                            <div className="listpolicyItem">
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        <p>Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg thì không phải mua vé.</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ mua 01 vé tương đương với người lớn.</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di chuyển.</p>
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
                                                                                                        <p>Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng đăng kí trước ít nhất 2 tiếng so với giờ xe khởi hành và vui lòng chuẩn bị hành lý nhỏ gọn (tối đa 20kg).</p>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <p>Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện nằm trên lộ trình</p>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )}
                                                    </div>
                                                    <button className="btn buttonChooseRoute" onClick={() => handleTabClick(1, trip.id, trip.vehicle.kindVehicle.id)}><span>Chọn chuyến</span></button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty_data">
                                            <img src={empty_list} alt="no data"/>
                                            <span >Không có kết quá được tìm thấy</span>
                                            <Link to="/"><div className="back">
                                            <button className="btn backbtn">Trở lại</button>
                                            </div></Link>
                                        </div>
                                    )}
                        
                        
                        </div>
                    </div>
                </div>
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
        </>
    );
}
export default BookTicketReturn

