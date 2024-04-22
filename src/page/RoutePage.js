import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Route from "../Components/SearchRoute/SearchRoute";
import Footer from "../Components/Footer/Footer";
import SearchRoute from "../Components/SearchRoute/SearchRoute";



const Routepage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <SearchRoute/>
            <Footer/>
        </>
    )
}
export default Routepage;