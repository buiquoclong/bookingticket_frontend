import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import TicketHistory from "../Components/TicketHistory/TicketHistory";


const TicketHistoryPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <TicketHistory/>
            <Footer/>
        </>
        
    );
}
export default TicketHistoryPage