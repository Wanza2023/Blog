import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState ,nickNameState,memberIdState, searchTermState} from "./AuthState";
import { Link,useNavigate,} from "react-router-dom";
import axios from "axios";
import '../styles/Navbar.css';
import travelog_logo from '../assets/images/travelog_logo.png'
import profile_icon from '../assets/images/profile_icon.png'
import navigation_icon from '../assets/images/navigation_icon.png'
import PostList from "../pages/PostList";


const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); //로그인 상태
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false); //검색버튼 토글
    const [memberId,setMemberId] = useRecoilState(memberIdState);
    const [nickName,setNickName] = useRecoilState(nickNameState);
    const profileIconClick = () => {
        if(isLoggedIn==false) {
            navigate('/login');
        }
    }
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
        if (searchTerm.trim() !== "") {
            // 검색어가 비어있지 않은 경우에만 URL로 이동
            const searchUrl = `/post-list/${searchTerm}`;
            setSearchTerm("")
            navigate(searchUrl);
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
                        <div className="profile-icon">
                            <img src={profile_icon} alt="Profile Icon" onClick={profileIconClick}/>
                        </div>
                        {/* IsLoggedIn 이 True이면 div를 보이고 아니면 div 안보이기 */}
                        {isLoggedIn && (
                            <div className="optionList">
                                <li className="optionListItem"><Link to="/">계정관리</Link></li>
                                <li className="optionListItem" ><Link to={`/user/${nickName}`}>나의 블로그홈</Link></li>
                                <li className="optionListItem"><Link to="/">블로그관리</Link></li>
                                <li className="optionListItem"><button onClick={handleLogout}>로그아웃</button></li>
                            </div>
                            )
                        }
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;