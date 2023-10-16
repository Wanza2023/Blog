import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import travelog_logo from '../../assets/images/travelog_logo.png'
import profile_icon from '../../assets/images/profile_icon.png'
import navigation_icon from '../../assets/images/navigation_icon.png'

// profile 버튼 열린상태에서 다른 page로 넘어가도 변하지 않음 수정 해야됨

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true); //로그인 상태
    const [isProfileOpen, setIsProfileOpen] = useState(false);  //프로필버튼 토글
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태를 관리하는 상태 변수
    const [isSearchOpen,setIsSearchOpen] = useState(false); //검색버튼 토글

    //프로필 클릭했을 때 토글
    const handleProfileClick = () => {
        if (isLoggedIn) {
            setIsProfileOpen(!isProfileOpen);
        } else {
            // If not logged in, redirect to the login page
            navigate("/login");
        }
    };

    // 검색 버튼 클릭했을 때 토글
    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    }
    // 검색창 입력 value 
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // 검색어 검색시 이벤트
    const handleSearchSubmit = () => {
        alert(searchTerm+" 검색하여 목록가기")
        console.log("검색어:", searchTerm);
        //검색어가 콘솔창에 찍힘
    };

    // 검색창에서 enter 키 눌렀을 때 이벤트 처리
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
          handleSearchSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
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
            <ul>
                <li>
                    <div className="navbar-search-bar">
                        {isSearchOpen &&
                            <input className="search-input" type="text" placeholder="검색" value={searchTerm} onChange={handleSearchInputChange} onKeyPress={handleOnKeyPress}/>
                        }
                    </div>
                </li>
                <li>
                    <div className="navbar-search-icon">
                        <div className="profile-icon" onClick={handleSearchClick}>
                            <img src={navigation_icon} alt="검색버튼"/>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="navbar-profile">
                        <div className="profile-icon" onClick={handleProfileClick}>
                            <img src={profile_icon} alt="Profile Icon" />
                        </div>
                        {isLoggedIn && isProfileOpen && (
                            <div className="profile-items">
                                <Link to="/account">계정관리</Link>
                                <Link to="/personalhome">나의 블로그홈</Link>
                                <Link to="/blog-management">블로그관리</Link>
                                <Link to="/"><button onClick={handleLogout}>로그아웃</button></Link>
                            </div>
                        )}
                        {!isLoggedIn && <Link to="/login"></Link>}
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
