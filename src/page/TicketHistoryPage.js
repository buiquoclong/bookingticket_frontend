import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import TicketHistory from "../Components/TicketHistory/TicketHistory";


const TicketHistoryPage = () =>{
    return(
        <>
            <Navbar/>
            <TicketHistory/>
            <Footer/>
        </>
        
    );
}
export default TicketHistoryPage