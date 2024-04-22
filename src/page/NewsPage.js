import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import News from "../Components/News/News";


const NewsPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <News/>
            <Footer/>
        </>
    )
}
export default NewsPage;