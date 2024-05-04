import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Components/Home/Home";
import Main from "../Components/Main/Main";
import SliderComponents from "../Components/Slider/SliderComponents";
import Footer from "../Components/Footer/Footer";


const Homepage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <Home/>
            {/* <Main/> */}
            <SliderComponents/>
            <Footer/>
        </>
    )
}
export default Homepage;