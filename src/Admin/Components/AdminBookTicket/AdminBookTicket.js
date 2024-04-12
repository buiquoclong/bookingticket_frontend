import React, {useState} from "react";
import "../AdminBookTicket/AdminBookTicket.scss"
import pickup from "../../Assets/img/pickup.svg";
import station from "../../Assets/img/station.svg";
import seat_active from "../../Assets/img/seat_active.svg";
import seat_disabled from "../../Assets/img/seat_disabled.svg";
import seat_selecting from "../../Assets/img/seat_selecting.svg"
import { MdArrowDropDown } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BiSolidLeftArrow } from "react-icons/bi";

const AdminBookTicket = () =>{
    const [tabValues, setTabValues] = useState({});
    const [selectedSeatsById, setSelectedSeatsById] = useState({});

    const handleTabClick = (tab, cardId) => {
        setTabValues(prevState => ({
            ...prevState,
            [cardId]: prevState[cardId] === tab ? null : tab
        }));
    };
    const Data1 = [
        {
            id: 1,
            tentuyen: 'Sài Gòn - Đà Nẵng',
            diemdau: 'Sài Gòn',
            diemcuoi: 'Đà Nẵng',
            loaixe: 'Giường',
            thoigiandi: '20 giờ',
            giobatdau: '08:00',
            gioden: '16:00',
            ghengoi: [
                {
                    id: 1, 
                    tenghe: 'A01', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 2, 
                    tenghe: 'A02', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 3, 
                    tenghe: 'A03', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 4, 
                    tenghe: 'A04', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 5, 
                    tenghe: 'A05', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 6, 
                    tenghe: 'A06', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 7, 
                    tenghe: 'A07', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 8, 
                    tenghe: 'A08', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 9, 
                    tenghe: 'A09', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 10, 
                    tenghe: 'A10', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 11, 
                    tenghe: 'A11', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 12, 
                    tenghe: 'A12', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 13, 
                    tenghe: 'A13', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 14, 
                    tenghe: 'A14', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 15, 
                    tenghe: 'A15', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 16, 
                    tenghe: 'A16', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 17, 
                    tenghe: 'A17', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 18, 
                    tenghe: 'A18', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 19, 
                    tenghe: 'A19', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 20, 
                    tenghe: 'A20', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 21, 
                    tenghe: 'A21', 
                    trangthai: 1,
                    giave: 300000
                }
            ]
        },
        {
            id: 2,
            tentuyen: 'Sài Gòn - Đà Lạt',
            diemdau: 'Sài Gòn',
            diemcuoi: 'Đà Lạt',
            loaixe: 'Giường ',
            thoigiandi: '20 giờ',
            giobatdau: '08:00',
            gioden: '16:00', 
            ghengoi: [
                {
                    id: 1, 
                    tenghe: 'A01', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 2, 
                    tenghe: 'A02', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 3, 
                    tenghe: 'A03', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 4, 
                    tenghe: 'A04', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 5, 
                    tenghe: 'A05', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 6, 
                    tenghe: 'A06', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 7, 
                    tenghe: 'A07', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 8, 
                    tenghe: 'A08', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 9, 
                    tenghe: 'A09', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 10, 
                    tenghe: 'A10', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 11, 
                    tenghe: 'A11', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 12, 
                    tenghe: 'A12', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 13, 
                    tenghe: 'A13', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 14, 
                    tenghe: 'A14', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 15, 
                    tenghe: 'A15', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 16, 
                    tenghe: 'A16', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 17, 
                    tenghe: 'A17', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 18, 
                    tenghe: 'A18', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 19, 
                    tenghe: 'A19', 
                    trangthai: 1,
                    giave: 300000
                },
                {
                    id: 20, 
                    tenghe: 'A20', 
                    trangthai: 0,
                    giave: 300000
                },
                {
                    id: 21, 
                    tenghe: 'A21', 
                    trangthai: 1,
                    giave: 300000
                }
            ]
        }
    ]

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
        const tuyen = Data1.find(tuyen => tuyen.id === tuyenId);
        if (tuyen) {
            const ghengoiTuyen = tuyen.ghengoi;
            const clickedSeat = ghengoiTuyen.find(seat => seat.id === seatId);
            const isSelected = selectedSeatsById[tuyenId]?.some(seat => seat.id === seatId);
            
            if (isSelected) {
                setSelectedSeatsById(prevSeats => ({
                    ...prevSeats,
                    [tuyenId]: prevSeats[tuyenId].filter(seat => seat.id !== seatId)
                }));
            } else {
                if (clickedSeat.trangthai !== 1) {
                    if (!selectedSeatsById[tuyenId] || selectedSeatsById[tuyenId].length < 5) {
                        setSelectedSeatsById(prevSeats => ({
                            ...prevSeats,
                            [tuyenId]: [...(prevSeats[tuyenId] || []), clickedSeat]
                        }));
                    } else {
                        alert('Bạn chỉ có thể chọn tối đa 5 ghế mỗi lần!');
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
                        <span className="totalPrice">{calculateTotalPriceById(tuyenId)}đ</span>
                    </span>
                    <button type="button" className="btn chooseButton"><span>Tiếp tục</span></button>
                </div>
            </div>
        );
    };


    function chunkArray(array, chunkSize) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunkedArray.push(array.slice(i, i + chunkSize));
        }
        return chunkedArray;
    }
    return(
        <div className="BookCotent">
            <div className="back">
            <BiSolidLeftArrow  className="icon"/>
                Trở lại
            </div>
                    <div className="resultList1 container flex">
                    <div className="listResultSearch flex">
                        <div className="listHeader">
                            <h1>Chuyến Sài Gòn  <FaLongArrowAltRight  className="icon"/> Đà Nẵng</h1>
                            <div className="lisFilter flex">
                                <div className="lineInfo">
                                    <span>Chọn khung giờ đi:</span>
                                    <div className="selectChoose">
                                        <select>
                                            <option value="0">Chọn giờ</option>
                                            <option value="1">00:00 - 06:00</option>
                                            <option value="2">06:00 - 12:00</option>
                                            <option value="3">12:00 - 18:00</option>
                                            <option value="4">18:00 - 24:00</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="lineInfo">
                                    <span>Xếp giá vé:</span>
                                    <div className="selectChoose">
                                        <select>
                                            <option value="0">Xếp giá</option>
                                            <option value="1">Cao - thấp</option>
                                            <option value="2">Thấp - Cao</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="lineInfo">
                                    <span>Chọn xe:</span>
                                    <div className="selectChoose">
                                        <select>
                                            <option value="0">Loại xe</option>
                                            <option value="1">Gường nằm</option>
                                            <option value="2">Limousine</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cardListResult">
                        {Data1.map(({ id,tentuyen, diemdau, diemcuoi, loaixe, thoigiandi, giobatdau,  gioden, ghengoi }) => (
                            <div key={id} className="cardOneResult">
                                <div className="infoResult">    
                                    <div className="detailInfo">
                                        <div className="routeInfo">
                                            <div className="nameInfo">
                                                <span className="timestart">{giobatdau}</span>
                                                <div className="timeBetween">
                                                    <img src={pickup} alt="pickup"/>
                                                    <span className="dotLine"></span>
                                                    <span className="numTimes">{thoigiandi}<br/><span className="location">(Asian/Ho Chi Minh)</span></span>
                                                    <span className="dotLine"></span>
                                                    <img src={station} alt="station"/>
                                                </div>
                                                <span className="timeend">{gioden}</span>
                                            </div>
                                            <div className="dessInfo">
                                                <div className="desStart">
                                                    <span className="nameStart">{diemdau}</span>
                                                </div>
                                                <div className="desEnd">
                                                    <span className="nameEnd">{diemcuoi}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="seatInfo">
                                            <div className="dotSeat"></div>
                                            <span>{loaixe}</span>
                                            <div className="dotSeat"></div>
                                            <span className="text">{ghengoi.length} chỗ trống</span>
                                            <span className="price">{ghengoi[0].giave}đ</span>
                                        </div>
                                    </div>
                                    <div className="devide"></div>
                                </div>
                                <div className="choseRoute">
                                    <div className="chosseRouteTab">
                                        <div role="tablist" className="tabChoose">
                                            <div className="tabChoose_wrap">
                                                <div className="tabChoose_list">
                                                    <div className={`tabChoose_tab ${tabValues[id] === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1, id)}>
                                                        <div role="tab" className="tabChoose_tab_btn">
                                                            <div className="btn_tabName">
                                                                <span>Chọn ghế</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`tabChoose_tab tab1 ${tabValues[id] === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3, id)}>
                                                        <div role="tab" className="tabChoose_tab_btn">
                                                            <div className="btn_tabName">
                                                                <span>Chính sách</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            {tabValues[id] === 1 && (
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
                                                                                                {chunkArray(ghengoi, 3).map((seatRow, rowIndex) => (
                                                                                                    <tr className="seatNum" key={rowIndex}>
                                                                                                        {seatRow.map((seat, seatIndex) => {
                                                                                                            const { src, spanStyle } = getSeatImageAndStyle(seat.trangthai);
                                                                                                            return (
                                                                                                                <React.Fragment key={seat.id}>
                                                                                                                    {/* <td className="singleSeat" style={getSeatImageAndStyle(seat.trangthai).tdStyle} onClick={() => handleClick(seat.id, id)}>
                                                                                                                        <img style={{ width: "32px" }} src={src} alt="seat icon" />
                                                                                                                        <span className="numSeatA" style={spanStyle}>{seat.tenghe}</span>
                                                                                                                    </td> */}
                                                                                                                    <td className="singleSeat" style={getSeatImageAndStyle(seat.trangthai).tdStyle} onClick={() => handleClick(seat.id, id)}>
                                                                                                                        {selectedSeatsById[id]?.find(selectedSeat => selectedSeat.id === seat.id) ? (
                                                                                                                            <>
                                                                                                                                <img style={{ width: "32px" }} src={seat_selecting} alt="selected seat icon" />
                                                                                                                                <span className="numSeatA" style={{color: "#EF5222" }}>{seat.tenghe}</span>
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                <img style={{ width: "32px" }} src={src} alt="seat icon" />
                                                                                                                                <span className="numSeatA" style={spanStyle}>{seat.tenghe}</span>
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
                                                                    {(selectedSeatsById[id] && selectedSeatsById[id].length > 0) && renderTicketInfo(id)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {tabValues[id] === 3 && (
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
                                    <button className="btn buttonChooseRoute" onClick={() => handleTabClick(1, id)}><span>Chọn chuyến</span></button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
        </div>
        </div>
        
        
    );
}
export default AdminBookTicket