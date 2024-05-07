import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import MyRating from "../Components/MyRating/MyRating";


const MyRatingPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <MyRating/>
            <Footer/>
        </>
    )
}
export default MyRatingPage;