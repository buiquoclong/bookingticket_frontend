import React, {useEffect} from "react";
import "./Main.scss";
import sg from "../../Assets/img/sg.png";
import dl from "../../Assets/img/dl.png";
import dn from "../../Assets/img/dn.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

import Aos from "aos";
import "aos/dist/aos.css";

const Main = () =>{
// add a scroll animation
useEffect(()=>{
    Aos.init({duration: 2000});
},[]);

const Data = [
    {
        id: 1, 
        imgSrc: sg,
        tentuyen: 'Sài Gòn - Đà Nẵng',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 2, 
        imgSrc: sg,
        tentuyen: 'Sài Gòn - Đà Nẵng',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 3, 
        imgSrc: dn,
        tentuyen: 'Đà Nẵng - Sài Gòn',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 4, 
        imgSrc: dn,
        tentuyen: 'Đà Nẵng - Đà Lạt',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 5, 
        imgSrc: dl,
        tentuyen: 'Đà Lạt - Đà Nẵng',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 6, 
        imgSrc: dl,
        tentuyen: 'Đà Lạt - Sài Gòn',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 7, 
        imgSrc: sg,
        tentuyen: 'Sài Gòn - Đà Nẵng',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    },
    {
        id: 8, 
        imgSrc: dn,
        tentuyen: 'Sài Gòn - Đà Nẵng',
        diemdau: 'Sài Gòn',
        diemcuoi: 'Đà Nẵng',
        dodai: '959km',
        thoigiandi: '20 giờ'
    }
] 


    return(
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    TUYẾN XE PHỔ BIẾN
                </h3>
            </div>
            
            <div className="secContent grid">
                {
                    Data.map(({id, imgSrc, tentuyen, diemdau, diemcuoi, dodai, thoigiandi}) => {
                        return (
                            <div key={id} data-aos="fade-up" className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgSrc} alt={tentuyen}/>
                                </div>

                                    <div className="cardInfo">
                                        <h4 className="desTitle">{tentuyen}</h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker  className="icon"/>
                                            <span className="name">{diemdau} -----</span>
                                            <HiOutlineLocationMarker  className="icon"/>
                                            <span className="name">{diemcuoi}</span>
                                        </span>

                                        <div className="fees flex">
                                            <div className="grade">
                                                <span>Quãng đường: {dodai}<small> +</small></span>
                                            </div>
                                            <div className="price">
                                                <h5>{thoigiandi}</h5>
                                            </div>
                                        </div>

                                        <div className="desc">
                                            <p>Quãng đường: {dodai} km</p>
                                        </div>

                                        <button className="btn flex">
                                            <Link to="/book-ticket">ĐẶT VÉ <FaArrowRight  className="icon"/></Link>
                                            
                                        </button>
                                    </div>
                                
                            </div>
                        )
                    })
                }
                
            </div>
        </section>

    )
}
export default Main