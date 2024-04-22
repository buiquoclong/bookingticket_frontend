import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import BookTicket from "../Components/BookTicket/BookTicket";
import Footer from "../Components/Footer/Footer";


const BookTicketPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <BookTicket/>
            <Footer/>
        </>
        
    );
}
export default BookTicketPage