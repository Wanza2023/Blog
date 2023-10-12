import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import '../../styles/Navbar.css';
import travelog_logo from '../../assets/images/travelog_logo.png'
import profile_icon from '../../assets/images/profile_icon.png'
import navigation_icon from '../../assets/images/navigation_icon.png'

//navbar modal 사용해서 검색창 popup으로 띄워서 사용하게 변경하기
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태를 관리하는 상태 변수

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        alert(searchTerm+" 검색하여 목록가기")
        console.log("검색어:", searchTerm);
        //검색어가 콘솔창에 찍힘
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsProfileOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/"><img src={travelog_logo} alt="Travelog Logo"/></Link>
            </div>
            <div className="navbar-search">
                <div className="profile-icon">
                    <button onClick={()=> setModalIsOpen(true)}><img src={navigation_icon} alt="검색버튼"/></button>
                    <Modal className="modal-wrapper" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <input className="search-input" type="text" placeholder="검색창" value={searchTerm} onChange={handleSearchInputChange} />
                        <button className="search-button" onClick={handleSearchSubmit}><img src={navigation_icon} alt="검색"/></button>
                        <div>
                            <button onClick={()=> setModalIsOpen(false)}>Modal Close</button>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="navbar-profile">
                <div className="profile-icon" onClick={handleProfileClick}>
                    <img src={profile_icon} alt="Profile Icon" />
                </div>
                {isLoggedIn && isProfileOpen && (
                    <div className="profile-items">
                        <Link to="/account">계정관리</Link>
                        <Link to="/my-blog-home">나의 블로그홈</Link>
                        <Link to="/blog-management">블로그관리</Link>
                        <Link to="/"><button onClick={handleLogout}>로그아웃</button></Link>
                    </div>
                )}
                {!isLoggedIn && <Link to="/login"></Link>}
            </div>
        </nav>
    );
}

export default Navbar;
