import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import BookingTicket from "../Components/BookingTicket/BookingTicket";
import Footer from "../Components/Footer/Footer";


const BookingTicketlPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <BookingTicket/>
            <Footer/>
        </>
        
    );
}
export default BookingTicketlPage