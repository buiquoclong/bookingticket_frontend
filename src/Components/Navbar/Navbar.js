import React, {useState, useEffect} from "react";
import "./navbar.scss";
import { MdTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Navbar = () =>{
  const [active, setActive] = useState('navBar');
  const [data, setData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);}
  // Function to toggle navbar
  const showNav = ()=>{
    setActive('navBar activeNavbar')
  }
  const userId = sessionStorage.getItem("userId");

  // Function to remove navbar
  const removeNavbar = ()=>{
    setActive('navBar')
  }
  
  useEffect(() => {
    // Call the API to fetch cities
    if (userId) {
      fetchUserInfo();
  }
  }, [userId]);

const fetchUserInfo = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/user/${userId}`);
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
};

const handleUserInfoClick = () => {
  // Xử lý khi nhấn vào "Thông tin người dùng"
  console.log("Hiển thị thông tin người dùng");
}

const handleLogoutClick = () => {
  // Xử lý khi nhấn vào "Đăng xuất"
  console.log("Thực hiện đăng xuất");
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
                  <div className="infoUser">
                    {userId ? (
                      <div className="dropdown-container">
                        <div onClick={toggleDropdown} className="dropdown-toggle">
                            {data && (
                                <span>{data.name}</span>
                            )}
                        </div>
                        
                      </div>
                      
                    ) : (
                        <button className="btn">
                            <Link to="/login">ĐĂNG NHẬP/ ĐĂNG KÝ</Link>
                        </button>
                    )}
                  </div>
                  
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