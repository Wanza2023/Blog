import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/component/PostCard.css";
import { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { RxReader } from "react-icons/rx";
import { hashtagListState } from "../../common/AuthState";
import personal_profile_icon from '../../../assets/images/personal_profile_icon.png';
import { FaRegCommentDots } from "react-icons/fa6";
import { HiOutlineHashtag } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";


function PostCard(props){

    const navigate = useNavigate()

    const [hashtagList, setHashTagList] = useRecoilState(hashtagListState)

    const onClickHashtagSearch = async (hashtag) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/tags/${hashtag}`);
            setHashTagList(response.data.body.reverse() || []);
            navigate(`/board/tags/${hashtag}`);
        }
        catch (error) {
            console.error("Failed to fetch search results:", error);
        }
    }

    // 날짜 뒤에 시간 제거
    function convertTime(date) {
        date = new Date(date);
        let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
        let dateOffset = new Date(date.getTime() - offset); // UTC 타임존 해결을 위해 offset 적용
        return dateOffset
    }
    // 시간 변환 몇분전 몇시간전 이런형태로 변환
    const useTimeStamps = (timestamp) => {
        const [timeAgo, setTimeAgo] = useState('');

        const updateTimeStamp = () => {
            const timeElapsed = Math.floor((new Date()-new Date(timestamp))/ 1000);

            if(timeElapsed < 60) {
                setTimeAgo(`${timeElapsed}초 전`);
            } else if (timeElapsed < 3600) {
                setTimeAgo(`${Math.floor(timeElapsed / 60)}분 전`);
            } else if (timeElapsed < 86400) {
                setTimeAgo(`${Math.floor(timeElapsed / 3600)}시간 전`);
            } else if (timeElapsed < 604800) {
                setTimeAgo(`${Math.floor(timeElapsed / 86400)}일 전`);
            } else {
                const date = new Date(timestamp).toISOString().split('T')[0];
                setTimeAgo(date);
            } 
        };
        
        useEffect(() => {
            updateTimeStamp();
        }, [timestamp]);
        
        return timeAgo;
    }



    const createdDate = new Date(props.createdAt); // props에서 createdAt 추출 후 날짜 객체로 변환
    const formattedKoreanDate = convertTime(createdDate);   //한국 시간으로 바꾸고
    const formattedDate = useTimeStamps(formattedKoreanDate);   // 몇분전 몇시간전 이런형태로 변환


    // contents html안의 이미지 가져오기
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.contents, "text/html"); // 문자열을 html로 파싱하여 객체 생성
    const imgElement = doc.querySelector("img"); // 첫 번째 <img> 선택
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg"; // img있으면 속성 값 가져오기, 없으면 default 설정
    
    const local = (props.local); // props의 local 추출
    const localToKorean = { // 한국어로 번역
        Busan: "부산",
        Daegu: "대구",
        Daejeon: "대전",
        Gangwon: "강원도",
        Gwangju: "광주",
        Gyeonggi: "경기도",
        Incheon: "인천",
        Jeju: "제주도",
        Chungbuk: "충청북도",
        Gyeongbuk: "경상북도",
        Jeonbuk: "전라북도",
        Sejong: "세종",
        Seoul: "서울",
        Chungnam: "충청남도",
        Gyeongnam: "경상남도",
        Jeonnam: "전라남도",
        Ulsan: "울산"     
    };

    const localKorean = localToKorean[local] || local; // 한국어로 변환

    return (
        <div className="cards">
            <div className="cardContents" >
                <div>
                    <div className="cardInfo">
                        <div onClick={()=>navigate(`/user/${props.nickname}`)}>
                            {props.pfp === null ? 
                                <img src={personal_profile_icon} className="cardProfileImg" alt="personal_profile_icon"/> :
                                <img src={props.pfp} className="cardProfileImg" alt="personal_profile_icon"/>
                            }
                        </div>
                        <div className="cardInfoProfile" onClick={()=>navigate(`/user/${props.nickname}`)}>
                            <div className="cardInfoProfileNickname">{props.nickname}</div>
                            <div className="cardInfoDate">{formattedDate}</div>
                        </div>
                    </div>
                    <div className="cardContentWrapper" onClick={()=>navigate(`${props.path}`)}>
                        <p className="cardtitle">[{localKorean}] {props.title}</p>
                        <p className="cardcontent">{props.summary}</p>
                    </div>
                </div>
                <div className="cardfooter">
                    <div className='bookmark-num'>
                        {props.bookmarkStatus ? <IoBookmark size={23} color="#5076FF" /> : <IoBookmarkOutline size={23} color="gray" /> }                
                    </div>
                    <FaRegCommentDots color="gray"/> 
                    <div className="cardfooterCommentLen">{props.commentSize}</div>
                    <div className="hashtagWrapper">
                        {props.hashtags.map((tag, index) => ( // map 함수로 해시태그 나열
                            <div key={index} className="hashtagBox" onClick={()=>onClickHashtagSearch(tag)}>
                                <HiOutlineHashtag size={10}/>
                                <div className="hashtagText">{tag}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {imgSrc !== "default-image-url.jpg" ?  // 사진 없을 때 빈 박스
                (
                    <div className="cards-img-wrapper" onClick={()=>navigate(`${props.path}`)}>
                        <img src={imgSrc} alt={props.alt} className="cardimg" />
                    </div>
                    ): (<></>)
            }
        </div>
    );
}

export default PostCard;
