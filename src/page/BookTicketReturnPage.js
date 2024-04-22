import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import BookTicketReturn from "../Components/BookTicketReturn/BookTicketReturn";


const BookTicketReturnPage = () =>{
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    return(
        <>
            <Navbar/>
            <BookTicketReturn/>
            <Footer/>
        </>
        
    );
}
export default BookTicketReturnPage