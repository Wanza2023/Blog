import React,{useState} from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { isLoggedInState,nickNameState,memberIdState } from "../component/AuthState";
import { useNavigate } from "react-router-dom";
import '../styles/SignIn.css'
import KakaoLogo from "../assets/images/login_kakao.png";
import NaverLogo from "../assets/images/login_naver.png";
import GoogleLogo from "../assets/images/login_google.png";

function SignIn(props){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);    //로그인 상태관리
    const [memberId,setMemberId] = useRecoilState(memberIdState);   // 멤버 id 전역관리
    const [nickName,setNickName] = useRecoilState(nickNameState);  // 닉네임 전역관리
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
            .post("http://172.16.210.64:8080/login", {
                email: inputId,
                password: inputPw,
            })
            .then(res =>{
                setIsLoggedIn(true);
                console.log("Response Data:", res.data);
                const token = res.data.body.token;
                console.log(token);
                axios
                    .get(`http://172.16.210.64:8080/members/authorize/${token}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        // 서버에서 반환된 데이터를 response.data로 사용
                        console.log("id: ",response.data.body.id);
                        console.log("nickname: ",response.data.body.nickName);
                        setMemberId(response.data.body.id);
                        setNickName(response.data.body.nickName);
                    })
                    .catch((err) => {
                        console.error("Error fetching data:", err);
                    })
                    .finally(() => {
                        // 작업 완료 되면 로그인창 전에 화면으로 이동
                        navigate((-1));
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