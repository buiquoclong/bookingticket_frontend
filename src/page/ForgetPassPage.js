import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ForgetPass from "../Components/ForgetPass/ForgetPass";


const ForgetPassPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <ForgetPass/>
            <Footer/>
        </>
        
    );
}
export default ForgetPassPage