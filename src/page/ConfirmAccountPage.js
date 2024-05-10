import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ConfirmAccount from "../Components/ConfirmAccount/ConfirmAccount";


const ConfirmAccountPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <ConfirmAccount/>
            <Footer/>
        </>
        
    );
}
export default ConfirmAccountPage