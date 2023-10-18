import React, { useState } from "react";

import { Link,useNavigate} from "react-router-dom";
import '../styles/Navbar.css';
import travelog_logo from '../assets/images/travelog_logo.png'
import profile_icon from '../assets/images/profile_icon.png'
import navigation_icon from '../assets/images/navigation_icon.png'


const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true); //로그인 상태
    const [isProfileOpen, setIsProfileOpen] = useState(false);  //프로필버튼 토글
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태를 관리하는 상태 변수
    const [isSearchOpen, setIsSearchOpen] = useState(false); //검색버튼 토글

    //프로필 클릭했을 때 토글
    const handleProfileClick = () => {
        if (isLoggedIn) {
            setIsProfileOpen(!isProfileOpen);
            setIsSearchOpen(false);
        } else {
            // If not logged in, redirect to the login page
            navigate("/login");
        }
    };

    // 검색 버튼 클릭했을 때 토글
    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsProfileOpen(false);
    }
    // 검색창 입력 value 
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // 검색어 검색시 이벤트
    const handleSearchSubmit = () => {
        if (searchTerm.trim() !== "") {
            // 검색어가 비어있지 않은 경우에만 URL로 이동
            const searchUrlTemp = `/post-list`;
            const searchUrl = `/post-list/${searchTerm}`;
            setSearchTerm("")
            navigate(searchUrlTemp);
        } else {
            // 검색어가 비어있으면 예외 처리 또는 경고 메시지를 표시할 수 있습니다.
            alert("검색어를 입력하세요.");
        }
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
                <Link to="/"><img src={travelog_logo} alt="Travelog Logo" /></Link>
            </div>
            <ul>
                <li>
                    <div className="navbar-search-bar">
                        {isSearchOpen &&
                            <input className="search-input" type="text" placeholder="검색" value={searchTerm} onChange={handleSearchInputChange} onKeyPress={handleOnKeyPress} />
                        }
                    </div>
                </li>
                <li>
                    <div className="navbar-search-icon">
                        <div className="profile-icon" onClick={handleSearchClick}>
                            <img src={navigation_icon} alt="검색버튼" />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="navbar-profile">
                        <div className="profile-icon" onClick={handleProfileClick}>
                            <img src={profile_icon} alt="Profile Icon" />
                        </div>
                        <div class="optionList">
                            <li class="optionListItem"><Link to="/">계정관리</Link></li>
                            <li class="optionListItem"><Link to="/personalhome">나의 블로그홈</Link></li>
                            <li class="optionListItem"><Link to="/">블로그관리</Link></li>
                            <li class="optionListItem"><button onClick={handleLogout}>로그아웃</button></li>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
