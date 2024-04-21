import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import BookTicketReturn from "../Components/BookTicketReturn/BookTicketReturn";


const BookTicketReturnPage = () =>{
    return(
        <>
            <Navbar/>
            <BookTicketReturn/>
            <Footer/>
        </>
        
    );
}
export default BookTicketReturnPage