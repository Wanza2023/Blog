import React,{useState} from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { isLoggedInState,nickNameState,memberIdState } from "../../component/common/AuthState";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/SignIn.css"
import KakaoLogo from "../../assets/images/login_kakao.png";
import NaverLogo from "../../assets/images/login_naver.png";
import GoogleLogo from "../../assets/images/login_google.png";

function SignIn(props){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);    //로그인 상태관리
    const [memberId,setMemberId] = useRecoilState(memberIdState);   // 멤버 id 전역관리
    const [nickName,setNickName] = useRecoilState(nickNameState);  // 닉네임 전역관리
    const [inputId,setInputId] = useState("");
    const [inputPw,setInputPw] = useState("");

    // Id input
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    // Password Input
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    // Enter 입력시 onClicklogin
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    };
    //  Login onClick
    const onClickLogin = () => {
        axios
            .post(`${process.env.REACT_APP_MEMBER_API_KEY}/login`, {
                email: inputId,
                password: inputPw,
            })
            .then(res =>{
                setIsLoggedIn(true);    // 로그인 상태 전역관리 Login true
                const token = res.data.body.token;
                // setCookie('token',token,{path:'/'},{expires:1}); // 쿠키에 토큰 저장
                sessionStorage.setItem('token', token); // 세션스토리지에 토큰 저장
                axios
                    .get(`${process.env.REACT_APP_MEMBER_API_KEY}/authorize`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        setMemberId(response.data.body.id); // Token일치하는 사용자의 MemberId 전역변수로 저장
                        setNickName(response.data.body.nickName);   // Token일치하는 사용자의 nickname 전역변수로 저장
                        sessionStorage.setItem('nickName', response.data.body.nickName); // 세션스토리지에 닉네임 저장
                        sessionStorage.setItem('memberId', response.data.body.id); // 세션스토리지에 멤버id 저장
                    })
                    .catch((err) => {
                        console.error("Error fetching data:", err);
                    })
                    .finally(() => {
                        navigate((-1)); // 작업 완료 되면 로그인창 전에 화면으로 이동
                    });
            })
            .catch(error => {
                console.error("Login failed:", error);
                alert("로그인 정보를 확인해주세요");
            });
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
                        <button className="pwdSearch" onClick={()=>{navigate("/pwInquiry")}}>비밀번호 찾기</button>
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