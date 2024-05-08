import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import MyBooking from "../Components/MyBooking/MyBooking";


const MyBookingPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <MyBooking/>
            <Footer/>
        </>
    )
}
export default MyBookingPage;