import React, { useEffect } from "react";
import Navbar from "../../Components/ComponentPages/ClientPages/Navbar/Navbar";
import Footer from "../../Components/ComponentPages/ClientPages/Footer/Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
