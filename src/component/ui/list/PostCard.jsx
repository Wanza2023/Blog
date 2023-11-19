import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/component/PostCard.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { hashtagListState } from "../../common/AuthState";

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
    const createdDate = new Date(props.createdAt); // props에서 createdAt 추출 후 날짜 객체로 변환
    const formattedDate = createdDate.toISOString().split('T')[0]; // 날짜 객체를 ISO 문자열로 변환하고 'T'를 기준으로 분할하여 날짜 부분만 저장

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
            <div onClick={()=>navigate(`${props.path}`)}>
                {imgSrc !== "default-image-url.jpg" ? ( // 사진 없을 때 빈 박스
                    <img src={imgSrc} alt={props.alt} className="cardimg" />
                ) : (
                    <div className="noImg"></div>
                )}
            </div>
            <div className="cardContents" >
                <div onClick={()=>navigate(`${props.path}`)}>
                    <h2 className="cardtitle">[{localKorean}] {props.title}</h2>
                    <p className="cardInfo">{formattedDate} {props.nickname}</p>
                    <p className="cardcontent">{props.summary}</p>
                </div>
                <div className="hastagWrapper">
                    {props.hashtags.map((tag, index) => ( // map 함수로 해시태그 나열
                        <div key={index} className="hashtagBox" onClick={()=>onClickHashtagSearch(tag)}>
                            #{tag}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostCard;
