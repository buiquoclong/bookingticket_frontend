import React, {useEffect, useState, useRef } from "react";
import "./Home.scss";
import background from "../../Assets/img/background.jpg";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

import { useLocation , useNavigate } from 'react-router-dom';

import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () =>{
    // add a scroll animation
    useEffect(()=>{
        Aos.init({duration: 2000});
    },[]);
    const location = useLocation();
    const { diemdiId, diemdenId } = location.state || {};
    const [kind, setKind] = useState("Một chiều");
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    
    const [originId, setOriginId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    
    const [dayStart, setDayStart] = useState('');
    const [dayReturn, setDayReturn] = useState('');
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const selectRef = useRef(null);
    const [citiesLoaded, setCitiesLoaded] = useState(false);

    useEffect(() => {
        // Call the API to fetch cities
        fetchCities().then(() => {
            setCitiesLoaded(true); // Đánh dấu là dữ liệu đã được tải hoàn tất
        });
        fetchRoutes();
    }, []);
    
    useEffect(() => {
        // Cập nhật dữ liệu khi tải thành công 
        if (diemdiId && diemdenId && citiesLoaded) {
            updateOriginAndDestination(diemdiId, diemdenId);
        }
    }, [diemdiId, diemdenId, citiesLoaded]);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/city");
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    const fetchRoutes = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/route/active");
            const data = await response.json();
            setData(data);
            console.log("Routes:", data);
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    const handleChange = (event) => {
        setKind(event.target.value);
    }

    const sendData = (event) => {
        event.preventDefault(); // Ngăn chặn việc reload trang mặc định của form
        
        let missingInfo = []; // Mảng lưu trữ các thông báo thiếu
        
        
        if (kind === "Một chiều") {
            // Kiểm tra xem điểm đi, điểm đến và ngày đã được chọn chưa
            if (!originId) {
                missingInfo.push("Địa điểm xuất phát");
            } 
            if (!destinationId) {
                missingInfo.push("Địa điểm đến");
            } 
            if (!dayStart) {
                missingInfo.push("Ngày đi");
            } 

            // Hiển thị thông báo nếu có thông tin thiếu
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                // Nếu đã chọn đầy đủ thông tin, chuyển đến trang book-ticket
                navigate('/book-ticket', {
                    state: {
                        diemDiId: originId,
                        diemDiName: origin,
                        diemDenId: destinationId,
                        diemDenName: destination,
                        dayStart: dayStart,
                        dayReturn: dayReturn,
                        kind: kind
                    }
                });
            }

        } else if (kind === "Khứ hồi") {
            // Kiểm tra xem điểm đi, điểm đến và ngày đã được chọn chưa
            if (!originId) {
                missingInfo.push("Địa điểm xuất phát");
            } 
            if (!destinationId) {
                missingInfo.push("Địa điểm đến");
            } 
            if (!dayStart) {
                missingInfo.push("Ngày đi");
            }
            if (!dayReturn) {
                missingInfo.push("Ngày về");
            }

            // Hiển thị thông báo nếu có thông tin thiếu
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                // Nếu đã chọn đầy đủ thông tin, chuyển đến trang book-ticket
                navigate('/book-ticket', {
                    state: {
                        diemDiId: originId,
                        diemDiName: origin,
                        diemDenId: destinationId,
                        diemDenName: destination,
                        dayStart: dayStart,
                        dayReturn: dayReturn,
                        kind: kind
                    }
                });
            }
        }
    
        
    }


    const handleOriginChange = (event) => {
        const selectedCity = cities.find(city => city.name === event.target.value);
        if (selectedCity) {
            if (destinationId !== null && selectedCity.id === destinationId) {
                toast.error("Điểm đi và điểm đến không được giống nhau");
                return;
            }
            setOrigin(selectedCity.name);
            setOriginId(selectedCity.id);
        }
    };
    
    const handleDestinationChange = (event) => {
        const selectedCity = cities.find(city => city.name === event.target.value);
        if (selectedCity) {
            if (originId !== null && selectedCity.id === originId) {
                toast.error("Điểm đi và điểm đến không được giống nhau");
                return;
            }
            setDestination(selectedCity.name);
            setDestinationId(selectedCity.id);
        }
    };

    const handleDayStartChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            toast.error("Bạn không thể chọn ngày trong quá khứ!");
            return;
        }
        setDayStart(event.target.value);
    };

    const handleDayReturnChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        if (selectedDate < today) {
            toast.error("Bạn không thể chọn ngày trong quá khứ!");
            return;
        }
        if (new Date(dayStart) > selectedDate) {
            toast.error("Ngày về phải là ngày sau ngày đi!");
            return;
        }
        
        setDayReturn(event.target.value);
    };
    const updateOriginAndDestination = (originId, destinationId) => {
            console.log("Đang cập nhật");
            setOriginId(originId);
            setDestinationId(destinationId);
    
            // Cập nhật giá trị của dropdown list
            const originCity = cities.find(city => city.id === originId);
            const destinationCity = cities.find(city => city.id === destinationId);
    
            if (originCity && destinationCity) {
                setOrigin(originCity.name);
                setDestination(destinationCity.name);
            } else {
                toast.error("City not found!");
            }
    };
    
    
    const handleBookingClick = (diemdiId, diemdenId) => {
        // Kiểm tra nếu diemdiId hoặc diemdenId đã thay đổi mới cập nhật state
        if (originId !== diemdiId || destinationId !== diemdenId) {
            console.log("Updating originId and destinationId...");
            // Sử dụng hàm callback để xử lý việc cập nhật state
            setOriginId(diemdiId);
            setDestinationId(diemdenId);
    
            // Cập nhật giá trị của dropdown list
            const originCity = cities.find(city => city.id === diemdiId);
            const destinationCity = cities.find(city => city.id === diemdenId);
    
            if (originCity && destinationCity) {
                setOrigin(originCity.name);
                setDestination(destinationCity.name);
                selectRef.current.scrollIntoView({ behavior: "smooth" });
            } else {
                toast.error("City not found!");
            }
        } else {
            console.log("OriginId and destinationId are already up-to-date.");
        }
    };
    function getCurrentDateTimeLocal() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // thêm '0' nếu cần
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    



    return(
        <>
            <section className="home" ref={selectRef}>
                <div className="overlay"></div>
                <img src={background} alt="card"/>   
                <div className="homeContent container">
                    <div className="textDiv">
                        <h1 className="homeTitle">Tìm kiếm chuyến đi của bạn</h1>
                    </div>

                    <div className="cardDiv">
                        <div className="radioButtons">
                            <label>
                                <input type="radio"  name="kind" value="Một chiều" checked={kind === "Một chiều"} onChange={handleChange}/>
                                    Một chiều 
                            </label>
                            <label>
                                <input type="radio"  name="kind" value="Khứ hồi" checked={kind === "Khứ hồi"} onChange={handleChange}/>
                                    Khứ hồi
                            </label>
                        </div>

                        {kind === "Một chiều" && (
                        <div className="destinationIn sizeOne">
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn điểm xuất phát: </label>
                                <select className="input" value={origin} onChange={handleOriginChange}>
                                    <option value="">Chọn địa điểm xuất phát...</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.name}>{city.name}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn điểm đến: </label>
                                <select className="input" value={destination} onChange={handleDestinationChange}>
                                    <option value="">Chọn địa điểm muốn đến...</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày đi: </label>
                                <div className="input flex">
                                    {/* <input type="date" value={dayStart} onChange={(e) => setDayStart(e.target.value)}/> */}
                                    <input type="date" value={dayStart} onChange={handleDayStartChange} min={getCurrentDateTimeLocal()}/>
                                </div>
                            </div> 
                        </div>
                        
                        )}
                        {kind === "Khứ hồi" && (
                            <div className="destinationIn sizeTwo">
                                <div className="destinationInput">
                                    <label htmlFor="city">Chọn điểm xuất phát: </label>
                                        <select className="input"  value={origin} onChange={handleOriginChange}>
                                            <option value="">Chọn địa điểm xuất phát...</option>
                                            {cities.map(city => (
                                                    <option key={city.id} value={city.name}>{city.name}</option>
                                                ))}
                                        </select>
                                </div>
                                <div className="destinationInput">
                                    <label htmlFor="city">Chọn điểm đến: </label>
                                        {/* <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/> */}
                                        <select className="input" value={destination} onChange={handleDestinationChange}>
                                            <option value="">Chọn địa điểm muốn đến...</option>
                                            {cities.map(city => (
                                                    <option key={city.id} value={city.name}>{city.name}</option>
                                                ))}
                                        </select>
                                </div>

                                <div className="dateInput">
                                    <label htmlFor="date">Chọn ngày đi: </label>
                                    <div className="input flex">
                                        <input type="date" value={dayStart} onChange={handleDayStartChange} min={getCurrentDateTimeLocal()}/>
                                    </div>
                                </div>
                                <div className="dateInput">
                                    <label htmlFor="date">Chọn ngày về: </label>
                                    <div className="input flex">
                                        <input type="date" value={dayReturn} onChange={handleDayReturnChange} min={dayStart ? dayStart : undefined}/>
                                    </div>
                                </div> 
                            </div>
                        )}


        
                        
                            <div className="searchOption flex" onClick={sendData}>
                                <HiFilter className="icon"/>
                                <span>TÌM CHUYẾN</span>
                            </div>
                        
                    </div>

                    <div className="homeFooterIcons flex">
                        <div className="rightIcons">
                            <FiFacebook className="icon"/>
                            <AiOutlineInstagram  className="icon"/>
                            <FaTripadvisor  className="icon"/>
                        </div>

                        <div className="leftIcons">
                            <BsListTask   className="icon"/>
                            <TbApps   className="icon"/>
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
                            autoClose={2000}
                            hideProgressBar={true}
                            pauseOnHover
                        ></ToastContainer>
            </section>
            <section className="main container section">
                <div className="secTitle">
                    <h3 className="title">
                        TUYẾN XE PHỔ BIẾN
                    </h3>
                </div>
            
                <div className="secContent grid">
                {data &&
                    data.map(route => (
                        <div key={route.id}className="singleDestination">
                                    <div className="imageDiv">
                                        <img src={"http://localhost:8081/" + route.diemDi.imgUrl} alt={route.name}/>
                                    </div>

                                        <div className="cardInfo">
                                            <h4 className="desTitle">{route.name}</h4>
                                            <span className="continent flex">
                                                <HiOutlineLocationMarker  className="icon"/>
                                                <span className="name">{route.diemDi.name} -----</span>
                                                <HiOutlineLocationMarker  className="icon"/>
                                                <span className="name">{route.diemDen.name}</span>
                                            </span>

                                            <div className="fees flex">
                                                <div className="grade">
                                                    <span>Quãng đường: {route.khoangCach} km <small> +</small></span>
                                                </div>
                                                <div className="price">
                                                    <h5>{route.timeOfRoute} giờ</h5>
                                                </div>
                                            </div>

                                            <div className="desc">
                                                <p>Tuyến đường: {route.name}</p>
                                                <p>Quãng đường: {route.khoangCach} km</p>
                                                <p>Thời gian đi: {route.timeOfRoute} giờ</p>
                                            </div>

                                            <button className="btn flex" onClick={() => handleBookingClick(route.diemDi.id, route.diemDen.id)}>
                                                {/* <Link to="/book-ticket">ĐẶT VÉ <FaArrowRight  className="icon"/></Link> */}
                                                ĐẶT VÉ <FaArrowRight  className="icon"/>
                                                
                                            </button>
                                        </div>
                                    
                                </div>
                    ))
                }
                </div>
            </section>
        </>
    )
}
export default Home