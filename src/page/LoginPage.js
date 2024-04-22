import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Login from "../Components/Login/Login";


const LoginPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <Login/>
            <Footer/>
        </>
    )
}
export default LoginPage;