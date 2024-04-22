import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import InfoUser from "../Components/InfoUser/InfoUser";


const InfoUserPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <InfoUser/>
            <Footer/>
        </>
    )
}
export default InfoUserPage;