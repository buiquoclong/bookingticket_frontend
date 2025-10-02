import React, {useEffect} from "react";
import "./Slider.scss";
import tt1 from "../../Assets/img/TT1.png";
import tt2 from "../../Assets/img/TT2.png";
import tt3 from "../../Assets/img/TT3.png";
import { FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import "aos/dist/aos.css";

const SliderComponents = () =>{
    useEffect(()=>{
        Aos.init({duration: 2000});
    },[]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false
    };

    const Data = [
        {
            id: 1, 
            imgSrc: tt1,
            tieude: 'Đi khắp mọi nơi',
            ngaythem: '01/01/2024'
        },
        {
            id: 2, 
            imgSrc: tt2,
            tieude: 'Đi khắp mọi nơi',
            ngaythem: '01/01/2024'
        },
        {
            id: 3, 
            imgSrc: tt3,
            tieude: 'Đi khắp mọi nơi',
            ngaythem: '01/01/2024'
        },
        {
            id: 4, 
            imgSrc: tt1,
            tieude: 'Đi khắp mọi nơi',
            ngaythem: '01/01/2024'
        },
        {
            id: 5, 
            imgSrc: tt2,
            tieude: 'Đi khắp mọi nơi',
            ngaythem: '01/01/2024'
        }
    ]
    return(
        <section className="main container section">
            <div className="secTitle flex">
                <h3 data-aos="fade-right" className="title">
                    TIN TỨC NỔI BẬT
                </h3>
                <span  data-aos="fade-left">Xem tất cả</span>
            </div>

            <div className="secContent">
            <Slider {...settings}>
                {
                    Data.map(({id, imgSrc, tieude, ngaythem}) => {
                        return(
                            <div key={id} data-aos="fade-up" className="singleNews">
                                <div className="imageDiv">
                                        <img src={imgSrc} alt={tieude}/>
                                </div>

                                <div className="contentNews">
                                    <p>{tieude}</p>
                                    <div  className="moreInfo flex">
                                        <span>{ngaythem}</span>
                                        <div className="viewDetail">
                                            <span>Chi tiết</span>
                                            <FaChevronRight className="icon"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        
                    })
                }
                </Slider>
            </div>
            
        </section>
    )
}
export default SliderComponents;