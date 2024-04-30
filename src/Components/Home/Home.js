import React, {useEffect, useState} from "react";
import "./Home.scss";
import background from "../../Assets/img/background.jpg";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";

import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () =>{
    // add a scroll animation
    useEffect(()=>{
        Aos.init({duration: 2000});
    },[]);
    
    const [kind, setKind] = useState("Một chiều");
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    
    const [originId, setOriginId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    
    const [dayStart, setDayStart] = useState('');
    const [dayReturn, setDayReturn] = useState('');
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/city");
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
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
    return(
        <section className="home">
            <div className="overlay"></div>
            <img src={background} alt="card"/>   
            <div className="homeContent container">
                <div className="textDiv">
                    <span className="smallText"> Our package</span>
                    <h1 className="homeTitle">Seacrh your Trip</h1>
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
                            <label htmlFor="city">Chọn địa điểm xuất phát: </label>
                            <select className="input" value={origin} onChange={handleOriginChange}>
                                <option value="">Chọn địa điểm xuất phát...</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="destinationInput">
                            <label htmlFor="city">Chọn địa điểm đến: </label>
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
                                <input type="date" value={dayStart} onChange={handleDayStartChange}/>
                            </div>
                        </div> 
                    </div>
                    
                    )}
                    {kind === "Khứ hồi" && (
                        <div className="destinationIn sizeTwo">
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn địa điểm xuất phát: </label>
                                    <select className="input"  value={origin} onChange={handleOriginChange}>
                                        <option value="">Chọn địa điểm xuất phát...</option>
                                        {cities.map(city => (
                                                <option key={city.id} value={city.name}>{city.name}</option>
                                            ))}
                                    </select>
                            </div>
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn địa điểm đến: </label>
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
                                    <input type="date" value={dayStart} onChange={handleDayStartChange}/>
                                </div>
                            </div>
                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày về: </label>
                                <div className="input flex">
                                    <input type="date" value={dayReturn} onChange={handleDayReturnChange}/>
                                </div>
                            </div> 
                        </div>
                    )}


    
                    
                        <div className="searchOption flex" onClick={sendData}>
                            <HiFilter className="icon"/>
                            <span>TÌM CHUYẾN</span>
                        </div>
                    
                </div>

                <div data-aos="fade-up" className="homeFooterIcons flex">
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
    )
}
export default Home