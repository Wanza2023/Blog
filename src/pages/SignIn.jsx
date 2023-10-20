import React,{useState} from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState,memberIdState } from "../component/AuthState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/SignIn.css'
import KakaoLogo from "../assets/images/login_kakao.png";
import NaverLogo from "../assets/images/login_naver.png";
import GoogleLogo from "../assets/images/login_google.png";

function SignIn(props){
    const navigate = useNavigate();
    const [inputId,setInputId] = useState("");
    const [inputPw,setInputPw] = useState("");
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            onClickLogin(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const onClickLogin = () => {
        console.log("click login");
        console.log("ID : ", inputId);
        console.log("PW : ", inputPw);
        axios
            .post("http://172.16.237.183:8080/login", {
                email: inputId,
                password: inputPw,
            })
            .then((res) => {
                console.log(res);
                console.log("res.data :: ", res.data);
                console.log("res.data.msg :: ", res.data.msg);
                if (res.data.email === undefined) {
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log("======================", res.data.msg);
                alert("입력하신 id 가 일치하지 않습니다.");
                } else if (res.data.email === null) {
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log(
                    "======================",
                    "입력하신 비밀번호 가 일치하지 않습니다."
                );
                alert("입력하신 비밀번호 가 일치하지 않습니다.");
                } else if (res.data.email === inputId) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log("======================", "로그인 성공");
                sessionStorage.setItem("user_id", inputId); // sessionStorage에 id를 user_id라는 key 값으로 저장
                sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
                }
                // 작업 완료 되면 페이지 이동(새로고침)
                document.location.href = "/";
            })
            .catch();
        };

    return(
        <div className="background">
            <div className="login">
                <div className="login-form">
                    <div className="login-form-field" style={{marginTop:"1rem"}}>
                        <label htmlFor="login-email"></label>
                        <input id="login-email" type="email" name="mail" placeholder="이메일을 입력하세요"
                        value={inputId} onChange={handleInputId}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="user@naver.com형태로 입력" required/>
                    </div>
                    <div className="login-form-field">
                        <label htmlFor="login-pwd"></label>
                        <input id="login-pwd" type="password" name="password"
                        value={inputPw} onChange={handleInputPw} onKeyPress={handleOnKeyPress}
                        placeholder="비밀번호를 입력하세요" pattern=".{6,}" required/>
                    </div>
                    <div className="loginBtn-wrap">
                        <button className="btn-login" onClick={onClickLogin}>로그인</button>
                    </div>
                    <div className="login-etc">
                        <button className="signUpBtn" onClick={()=> {navigate("/signup")}}>회원가입</button>
                        <button className="pwdSearch">비밀번호 찾기</button>
                    </div>
                </div>
                <div className="hr-sect">간편 로그인</div>
                <div className="social-login">
                    <a href="#" className="social-login_icon">
                        <img style={{width:"3.5rem", height:"3.5rem"}} src={KakaoLogo} alt=""/></a>
                    <a href="#" className="social-login_icon">
                        <img style={{width:"3.5rem", height:"3.5rem"}} src={NaverLogo} alt=""/></a>
                    <a href="#" className="social-login_icon">
                        <img style={{width:"3.5rem", height:"3.5rem"}} src={GoogleLogo} alt=""/></a>                    
                </div>
            </div>
        </div>
    );
}

export default SignIn;