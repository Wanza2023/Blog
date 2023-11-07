import React from "react";
import { Link } from "react-router-dom";
import '../../styles/PersonalTextComponent.css';

function PersonalTextitems(props) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.contents, "text/html");
    const imgElement = doc.querySelector("img");
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg";

    const local = (props.local);
    const localToKorean = {
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

    const localKorean = localToKorean[local] || local;
    return (
            <Link to={props.path} className="card">
                <div>
                    {imgSrc !== "default-image-url.jpg" ? ( // 사진 없을 때 빈 박스
                        <img src={imgSrc} alt={props.alt} className="cardimg" />
                    ) : (
                        <div className="noImg"></div>
                    )}
                </div>
                <div className="cardbody">
                    <h2 className="cardtitle">[{localKorean}] {props.title}</h2>
                    <p className="cardcontent1">{props.contents}</p>
                    <p className="cardcontent2">{props.content2}</p>
                </div>
            </Link>
    );
}

export default PersonalTextitems;
