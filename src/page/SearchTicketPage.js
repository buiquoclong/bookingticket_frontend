import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import SearchTicket from "../Components/SearchTicket/SearchTicket";
import Footer from "../Components/Footer/Footer";




const SearchTicketPage  = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return (
        <>
            <Navbar/>
            <SearchTicket/>
            <Footer/>
        </>
    )
}
export default SearchTicketPage;