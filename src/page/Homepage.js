import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Components/Home/Home";
import Main from "../Components/Main/Main";
import SliderComponents from "../Components/Slider/SliderComponents";
import Footer from "../Components/Footer/Footer";


const Homepage  = () => {
    return (
        <>
            {/* <Navbar/> */}
            <Home/>
            <Main/>
            <SliderComponents/>
            {/* <Footer/> */}
        </>
    )
}
export default Homepage;