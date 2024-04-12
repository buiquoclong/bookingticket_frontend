import React, {useState} from "react";
import "./navbar.scss";
import { MdTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Navbar = () =>{
  const [active, setActive] = useState('navBar');
  // Function to toggle navbar
  const showNav = ()=>{
    setActive('navBar activeNavbar')
  }

  // Function to remove navbar
  const removeNavbar = ()=>{
    setActive('navBar')
  }

    return(
      <section className="navBarSection">
        <header className="header flex">
            <div className="logoDiv">
                
                <Link to="/" className="logo flex"><MdTravelExplore className="icon"/>
                    <h1>RoadLines</h1>
                </Link>
            </div>

            <div className={active}>
                <ul className="navLists flex">
                  <li className="navItem">
                    <Link to="/" className="navLink">TRANG CHỦ</Link>
                  </li>
                  <li className="navItem">
                    <Link to="/route" className="navLink">LỊCH TRÌNH</Link>
                  </li>
                  <li className="navItem">
                    <Link to="/search_ticket" className="navLink">TRA CỨU VÉ XE</Link>
                  </li>
                  <li className="navItem">
                    <Link to="/my_ticket" className="navLink">VÉ CỦA TÔI</Link>
                  </li>
                  <li className="navItem">
                    <Link to="/" className="navLink">LIÊN HỆ</Link>
                  </li>
                  <li className="navItem">
                    <Link to="/" className="navLink">VỀ CHÚNG TÔI</Link>
                  </li>

                  <button className="btn">
                    <Link to="/login">ĐĂNG NHẬP/ ĐĂNG KÝ</Link>
                  </button>
                </ul>
                <div onClick={removeNavbar} className="closeNavbar">
                  <AiFillCloseCircle className="icon"/>
                </div>
            </div>

            <div onClick={showNav} className="toggleNavbar">
              <TbGridDots className="icon"/>
            </div>
        </header>
      </section>
    )
}
export default Navbar