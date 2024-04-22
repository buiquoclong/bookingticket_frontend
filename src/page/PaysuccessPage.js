import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Paysuccess from "../Components/Paysuccess/Paysuccess";



const PaysuccessPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <Paysuccess/>
            <Footer/>
        </>
        
    );
}
export default PaysuccessPage