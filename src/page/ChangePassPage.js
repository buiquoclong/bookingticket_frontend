import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ChangePass from "../Components/ChangePass/ChangePass";


const ChangePassPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <ChangePass/>
            <Footer/>
        </>
    )
}
export default ChangePassPage;