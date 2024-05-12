import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ResponseFailed from "../Components/ResponsePay/ResponseFailed";



const ResponseFailedPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <ResponseFailed/>
            <Footer/>
        </>
        
    );
}
export default ResponseFailedPage