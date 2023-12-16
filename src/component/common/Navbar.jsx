import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState , nickNameState, memberIdState, searchResultsState } from "./AuthState";
import { Link,useNavigate,} from "react-router-dom";
import axios from "axios";
import '../../styles/component/Navbar.css';
import travelog_logo from '../../assets/images/travelog_logo.png'
import travelog_logo_02 from '../../assets/images/travelog_logo_02.png'
import travelog_logo_03 from '../../assets/images/travelog_logo_03.png'
import { IoSearchOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { useAuth } from "./useAuth";
import { BsPersonGear } from "react-icons/bs";
import personal_profile_icon from '../../assets/images/personal_profile_icon.png';

const SEARCH_MODES = {
    POST: 'search',
    HASHTAG: 'tags'
};

const Navbar = () => {
    const navigate = useNavigate();
    // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); //로그인 상태
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false); //검색버튼 토글
    const [nickName,setNickName] = useRecoilState(nickNameState);
    const [searchMode, setSearchMode] = useState(SEARCH_MODES.POST);
    const [showDropdown, setShowDropdown] = useState(false);
    const profileImg = sessionStorage.getItem('pfp');

    const profileIconClick = () => {
        if(isLoggedIn===false) {
            navigate('/login');
        }
    }
    // 검색 버튼 클릭했을 때 토글
    const handleSearchClick = () => {
        handleSearchSubmit();
    };
    // 검색창 입력 value 
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // 검색어 검색시 이벤트
    const handleSearchSubmit = async () => {
        if (searchTerm.trim() !== "") {
            try {
                let response;
                if (searchMode === SEARCH_MODES.POST) {
                    response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/search/${searchTerm}`);
                    setSearchResults(response.data.body.reverse() || []);
                    navigate(`/board/search/${searchTerm}`);
                    console.log(response.data.body);
                    setSearchTerm("");
                } else {
                    response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/tags/${searchTerm}`);
                    setSearchResults(response.data.body.reverse() || []);
                    navigate(`/board/searchTags/${searchTerm}`);
                    console.log(response.data.body);
                    setSearchTerm("");
                }
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            }
        } else {
            alert("검색어를 입력하세요.");
        }
    };

    // 검색창에서 enter 키 눌렀을 때 이벤트 처리
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            handleSearchSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const handleLogout = () => { // 로그아웃 시 세션스토리지 지우기
        // removeCookie('token');
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('nickName');
        sessionStorage.removeItem('pfp');
        sessionStorage.removeItem("lastVisitTime");
        sessionStorage.clear();
        // navigate(0,{replace : true});
        alert("로그아웃 되었습니다!")
    };
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <Link to="/"><img className="navbar-logo" src={travelog_logo_02} alt="Travelog Logo" /></Link>
            </div>
            <div className="navMenu">
                <div className="navMenuList"><Link to="/postlist">전체게시글</Link></div>
                <div className="navMenuList"><Link to="/bookmark">북마크</Link></div>
            </div>
            <div className="navbar-search-bar">
                <div className="search">
                    <div className="area-dropdown" data-set="search">
                        <select 
                            value={searchMode} 
                            onChange={(e) => setSearchMode(e.target.value)} 
                            className="selected-option"
                            >
                            <option value={SEARCH_MODES.POST}>글</option>
                            <option value={SEARCH_MODES.HASHTAG}>해시태그</option>
                        </select>
                        <input 
                            className="search-input" 
                            type="text" 
                            placeholder="검색" 
                            value={searchTerm} 
                            onChange={handleSearchInputChange} 
                            onKeyPress={handleOnKeyPress} 
                        />
                        <div className="navbar-search-button" onClick={handleSearchClick}>
                            <IoSearchOutline size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-profile">
                {isLoggedIn ? (
                    profileImg !== "null" ? ( // profileImg가 존재하는 경우
                        <img
                            src={profileImg}
                            alt="프로필"
                            onClick={profileIconClick}
                            style={{ width: 30, height: 30, cursor: 'pointer' }}
                        />
                    ) : ( // profileImg가 null 또는 undefined인 경우
                        <BiUserCircle 
                            alt="프로필"
                            onClick={profileIconClick}
                            style={{ width: 30, height: 30, cursor: 'pointer' }}
                        />
                    )
                ) : (
                    <div className="profile-icon">
                    {/* <BsPersonGear size={40} color='gray' onClick={profileIconClick}/> */}
                    <button onClick={profileIconClick} className="startButton">시작하기</button>
                    </div>
                )}
                {/* IsLoggedIn 이 True이면 div를 보이고 아니면 div 안보이기 */}
                {isLoggedIn && (
                    <div className="optionList">
                        <div className="optionListItem" ><Link to={`/user/${nickName}`}>내블로그</Link></div>
                        <div className="optionListItem"><Link to="/personaledit">관리•통계</Link></div>
                        <div className="optionListItem"><button className="logoutButton" onClick={handleLogout}>로그아웃</button></div>
                    </div>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;