import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ResponseSuccess from "../Components/ResponsePay/ResponseSuccess";



const ResponseSuccessPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <ResponseSuccess/>
            <Footer/>
        </>
        
    );
}
export default ResponseSuccessPage