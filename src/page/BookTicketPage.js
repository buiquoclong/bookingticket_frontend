import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import BookTicket from "../Components/BookTicket/BookTicket";
import Footer from "../Components/Footer/Footer";


const BookTicketPage = () =>{
    return(
        <>
            <Navbar/>
            <BookTicket/>
            <Footer/>
        </>
        
    );
}
export default BookTicketPage