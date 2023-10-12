import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import KakaoLogo from "../assets/images/login_kakao.png";
import NaverLogo from "../assets/images/login_naver.png";
import GoogleLogo from "../assets/images/login_google.png";
import "../styles/SignIn.css";

function SignIn(props){
    const navigate = useNavigate();

    return(
        <div className="background">
            <div className="logo-wrap">
                <a href="#"><img className="logo" src={Logo} alt=""/></a>
            </div>
            <div className="login">
                <div className="login-form">
                    <div className="login-form-field" style={{marginTop:"1rem"}}>
                        <label htmlFor="login-email"></label>
                        <input id="login-email" type="email" name="mail" placeholder="이메일을 입력하세요"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="user@naver.com형태로 입력" required/>
                    </div>
                    <div className="login-form-field">
                        <label htmlFor="login-pwd"></label>
                        <input id="login-pwd" type="password" name="password"
                        placeholder="비밀번호를 입력하세요" pattern=".{6,}" required/>
                    </div>
                    <div className="loginBtn-wrap">
                        <input type="submit" className="btn-login" value="로그인"></input>
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