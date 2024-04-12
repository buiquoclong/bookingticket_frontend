import React, {useEffect} from "react";
import "./Footer.scss";
import background from "../../Assets/img/background.jpg";
import { FiSend } from "react-icons/fi";
import { MdTravelExplore } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () =>{
    // add a scroll animation
    useEffect(()=>{
        Aos.init({duration: 2000});
    },[]);

    return(
        <section className="footer">
            <div className="imgDiv">
                <img src={background} alt="card"/>  
            </div>

            <div className="secContent container">
                <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>KEEP IN TOUCH</small>
                        <h2> Booking with us</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input data-aos="fade-up" type="text" placeholder="Enter Email Address"/>
                        <button data-aos="fade-up" className="btn flex" type="submit">
                            SEND <FiSend className="icon"/>
                        </button>
                    </div>
                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <Link to="/" className="logo flex"><MdTravelExplore className="icon"/> RoadLines</Link>
                        </div>

                        <div data-aos="fade-up" className="footerParagraph">
                            <h2>Thông tin liên hệ</h2>
                            <h4 className="span2">Địa chỉ: Kp.6, Phường LInh Trung, TP Thủ Đức, TP. Hồ Chí Minh</h4>
                            <h4 className="span3">Email: nlu@hcmuaf.edu.vn</h4>
                            <h4 className="span4">Điện thoại: 0123456789</h4>
                        </div>

                        <div data-aos="fade-up" className="footerSocials">
                            <AiOutlineTwitter  className="icon"/>
                            <AiFillYoutube   className="icon"/>
                            <AiFillInstagram   className="icon"/>
                            <FaTripadvisor    className="icon"/>
                        </div>
                    </div>

                    <div className="footerLinks flex">
                        {/* Group One */}
                        <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
                            <span className="groupTitile">Thông tin</span>

                            <li className="footerList flex">
                                <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Về chúng tôi</Link>
                                
                            </li>

                            <li className="footerList flex">
                                <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Liên hệ</Link>
                            </li>

                            <li className="footerList flex">
                            <Link to="/route" className="foot_text"><FiChevronRight className="icon"/>
                                Lịch trình</Link>
                            </li>

                            <li className="footerList flex">
                                <Link to="/news" className="foot_text"><FiChevronRight className="icon"/>
                                Tin tức</Link>
                            </li>

                            <li className="footerList flex">
                            <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Điều khoản</Link>
                            </li>
                        </div>

                        {/* Group Two */}
                        <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
                            <span className="groupTitile">Điều hướng</span>

                            <li className="footerList flex">
                            <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Trang chủ</Link>
                            </li>

                            <li className="footerList flex">
                                <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Liên hệ</Link>
                            </li>

                            <li className="footerList flex">
                            <Link to="/route" className="foot_text"><FiChevronRight className="icon"/>
                                Lịch trình</Link>
                            </li>

                            <li className="footerList flex">
                                <Link to="/news" className="foot_text"><FiChevronRight className="icon"/>
                                Tin tức</Link>
                            </li>

                            <li className="footerList flex">
                                <Link to="/search_ticket" className="foot_text"><FiChevronRight className="icon"/>
                                Tra cứu vé</Link>
                            </li>

                        </div>

                        {/* Group Three */}
                        <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup">
                            <span className="groupTitile">Hỗ trợ</span>

                            <li className="footerList flex">
                                <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Liên hệ</Link>
                            </li>

                            <li className="footerList flex">
                                <Link to="/search_ticket" className="foot_text"><FiChevronRight className="icon"/>
                                Tra cứu vé</Link>
                            </li>

                            <li className="footerList flex">
                            <Link to="/" className="foot_text"><FiChevronRight className="icon"/>
                                Điều khoản</Link>
                            </li>

                            <li className="footerList flex">
                                <Link to="/news" className="foot_text"><FiChevronRight className="icon"/>
                                Tin tức</Link>
                            </li>

                            <li className="footerList flex">
                            <Link to="/route" className="foot_text"><FiChevronRight className="icon"/>
                                Lịch trình</Link>
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>BEST TRAVEL WEBSITE THEME</small>
                        <small>COPYRIGHTS RESERVED - ISRATECH 2024</small>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Footer