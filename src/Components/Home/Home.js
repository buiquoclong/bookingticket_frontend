import React, {useEffect, useState} from "react";
import "./Home.scss";
import background from "../../Assets/img/background.jpg";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import { RiArrowLeftRightFill } from "react-icons/ri";

import { Link } from 'react-router-dom';

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

    const handleChange = (event) => {
        setKind(event.target.value);
    }

    const changeDes = () => {
        // Swap values between origin and destination inputs
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };


    return(
        <section className="home">
            <div className="overlay"></div>
            <img src={background} alt="card"/>   
            <div className="homeContent container">

                <div data-aos="fade-up" className="cardDiv">
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
                            <div className="input  flex">
                                <input type="text" className="input1" placeholder="Chọn địa điểm xuất phát..." value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                                <GrLocation className="icon"/>
                            </div>
                        </div>
                        <div className="changedes" onClick={changeDes}>
                            <RiArrowLeftRightFill  className="icon"/>
                        </div>
                        <div className="destinationInput">
                            <label htmlFor="city">Chọn địa điểm đến: </label>
                            <div className="input flex">
                                <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/>
                                <GrLocation className="icon"/>
                            </div>
                        </div>

                        <div className="dateInput">
                            <label htmlFor="date">Chọn ngày đi: </label>
                            <div className="input flex">
                                <input type="date"/>
                            </div>
                        </div> 
                    </div>
                    
                    )}
                    {kind === "Khứ hồi" && (
                        <div className="destinationIn sizeTwo">
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn địa điểm xuất phát: </label>
                                <div className="input  flex">
                                    <input type="text" className="input1" placeholder="Chọn địa điểm xuất phát..." value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                                    <GrLocation className="icon"/>
                                </div>
                            </div>
                            <div className="changedes" onClick={changeDes}>
                                <RiArrowLeftRightFill  className="icon"/>
                            </div>
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn địa điểm đến: </label>
                                <div className="input flex">
                                    <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/>
                                    <GrLocation className="icon"/>
                                </div>
                            </div>

                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày đi: </label>
                                <div className="input flex">
                                    <input type="date" placeholder="Chon dia diem"/>
                                </div>
                            </div>
                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày về: </label>
                                <div className="input flex">
                                    <input type="date" placeholder="Chon dia diem"/>
                                </div>
                            </div> 
                        </div>
                    )}


    
                    <Link to="/book-ticket"><div className="searchOption flex">
                        <HiFilter className="icon"/>
                        <span>TÌM CHUYẾN</span>
                    </div></Link>
                    
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
        </section>

    )
}
export default Home