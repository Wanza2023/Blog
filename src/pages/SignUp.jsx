import React, { useState} from "react";
import axios from "axios";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp(props){
    const navigate = useNavigate();

    const [useCheck, setUseCheck] = useState(false);
    const [infoCheck, setInfoCheck] = useState(false);
    const [useCheckVisible, setUseCheckVisible] = useState(false);
    const [useInfoVisible, setUseInfoVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [totConfirm, setTotConfirm] = useState([0,0,0,0,0,0,0,0]);
    const isFormValid = totConfirm.every(item => item === 1);


    const [emailMessage, setEmailMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [pwdMessage, setPwdMessage] = useState("");
    const [confirmPwdMessage, setConfirmPwdMessage] = useState("");
    const [birthMessage, setBirthMessage] = useState("");

    const onChangeEmail = (e) => {
        const curEmail = e.target.value;
        setEmail(curEmail);
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!emailRegExp.test(curEmail)){
            setEmailMessage("이메일의 형식이 올바르지 않습니다.");
            totConfirm[0] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }else{
            setEmailMessage("사용 가능한 이메일 입니다.");//중복확인 해야함
            totConfirm[0] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
    }
    const onChangeName = (e) => {
        const curName = e.target.value.trim();
        setName(curName);
        if(curName.length < 2 || curName.length > 10 || curName.includes(" ")){
            setNameMessage("2글자 이상 10글자 이하로 공백 없이 입력해주세요");
        }
        else {
            setNameMessage("중복을 확인해주세요.");
        }
    }
    
    const handleDoubleCheck = () => {
        axios
            .get("http://172.16.210.64:8080/members")
            .then(res=>{
                const nickNames = res.data.body.map(item => item.nickName);
                console.log("닉네임 가져오기: ", nickNames);
                if (nickNames.includes(name)) {
                    console.log(`"${name}"은 이미 사용 중인 닉네임입니다.`);
                    totConfirm[1] = 0; setTotConfirm(()=>[...totConfirm]);
                    setNameMessage("이미 사용중인 닉네임입니다.");
                    console.log(totConfirm);
                } else {
                    console.log(`"${name}"은 사용 가능한 닉네임입니다.`);
                    totConfirm[1] = 1; setTotConfirm(()=>[...totConfirm]);
                    setNameMessage("사용가능한 닉네임입니다.");
                    console.log(totConfirm);
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
    }
    
    const onChangePwd = (e) => {
        const curPwd = e.target.value;
        setPwd(curPwd);
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!pwdRegExp.test(curPwd)){
            setPwdMessage("숫자, 영문자, 특수문자(!@#$%^*+=-) 조합으로 8자리 이상 20자리 이하 입력해주세요 ");
            totConfirm[2] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }else{
            setPwdMessage("안전한 비밀번호입니다");
            totConfirm[2] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
    }
    const onChangeConfirmPwd = (e) => {
        const curConfPwd = e.target.value;
        setConfirmPwd(curConfPwd);
        if(pwd !== curConfPwd){
            setConfirmPwdMessage("비밀번호가 일치하지 않습니다");
            totConfirm[3] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }else{
            setConfirmPwdMessage("확인되었습니다");
            totConfirm[3] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
    }
    const onChangeBirth = (e) => {
        const curBirth = e.target.value;
        setBirth(curBirth);
        // 숫자로 된 생년월일을 "yyyy-mm-dd" 형태로 변환
        const formattedBirth = curBirth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

        const birthRegExp = /^[0-9]{8}$/;
        if(!birthRegExp.test(curBirth)){
            setBirthMessage("8자리 생년월일을 입력주세요");
            totConfirm[4] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }else{
            setBirthMessage("완료");
            totConfirm[4] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
        setBirth(formattedBirth);
    }

    const onClickGender = (selectedGender) => {
        setGender(selectedGender);
    
        if (selectedGender === 'M' || selectedGender === 'W') {
            totConfirm[5] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        } else {
            totConfirm[5] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
    };
    const useCheckEvent = () => {
        setUseCheck(()=> !useCheck);
        if(useCheck===true){
            totConfirm[6] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }   
        else {
            totConfirm[6] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
        console.log(useCheck);
    }
    const toggleuseCheckVisible = () => {
        setUseCheckVisible(!useCheckVisible);
    }
    const infoCheckEvent = () => {
        setInfoCheck(()=> !infoCheck);
        if(infoCheck===true){
            totConfirm[7] = 0; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
        else {
            totConfirm[7] = 1; setTotConfirm(()=>[...totConfirm]);
            console.log(totConfirm);
        }
        console.log(infoCheck);
    }
    const toggleInfoCheckVisible = () => {
        setUseInfoVisible(!useInfoVisible)
    }
    const handleSignUpSubmit = () => {
        console.log("click signup");
        axios
            .post("http://172.16.210.64:8080/signup",{
                birth: birth,
                email: email,
                gender: gender,
                nickName: name,
                password: pwd,
            })
            .then((res)=> {
                if(res.data.success){
                    console.log("회원가입 완료");
                    navigate("/login");
                } else {
                    console.log("회원가입 실패");
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }

    return(
        <div className="background">
            <div className="signUp">
                <div className="signUp-form">
                    <div className="signUp-field">
                        <label>이메일(아이디) *</label>
                        <input type="email" name="mail" id="mail" value={email} onChange={onChangeEmail} 
                        placeholder="이메일을 입력하세요" />
                        <p className="signup-submit-message">{emailMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>비밀번호 *</label>
                        <input type="password" name="pwd" id="pwd" maxLength={20} value={pwd} onChange={onChangePwd} placeholder="비밀번호를 입력하세요"/>
                        <p className="signup-submit-message">{pwdMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>비밀번호 확인 *</label>
                        <input type="password" name="confPwd" id="confPwd" maxLength={20} value={confirmPwd} onChange={onChangeConfirmPwd} placeholder="비밀번호를 입력하세요"/>
                        <p className="signup-submit-message">{confirmPwdMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>닉네임 *</label>
                        <div className="nameConfirm">
                            <input type="text" name="name" id="name" value={name} onChange={onChangeName} placeholder="닉네임을 입력하세요"/>
                            <button onClick={handleDoubleCheck}>중복확인</button>
                        </div>
                        <p className="signup-submit-message">{nameMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>생년월일 &nbsp;<small>8자리</small></label>
                        <input type="text" name="bdate" maxLength={8} id="bdate" value={birth} onChange={onChangeBirth} placeholder="생년월일을 입력하세요"/>
                        <p className="signup-submit-message">{birthMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>성별</label>
                        <div className="gender">
                            <button className={`gender-btn ${gender === 'W' ? 'selected' : ''}`} name="woman" onClick={()=>onClickGender("W")}>여성</button>
                            <button className={`gender-btn ${gender === 'M' ? 'selected' : ''}`} name="man" onClick={()=>onClickGender("M")}>남성</button>
                        </div>
                    </div>
                    <br/>
                    <div>
                    <div className="agreement">
                        <div className="agreement-wrap">
                            <input type="checkbox" id="check1" checked={useCheck} onChange={useCheckEvent}/>
                            <label htmlFor="check1">이용약관 동의(필수)</label>
                        </div>
                        <button onClick={toggleuseCheckVisible}>{useCheckVisible ? '약관 숨기기' : '약관 보기'}</button>
                    </div>
                    {useCheckVisible && (
                            <div>
                                <p>약관 내용을 여기에 추가할 수 있습니다.</p>
                            </div>
                        )}
                    <div className="agreement">
                        <div className="agreement-wrap">
                            <input type="checkbox" id="check2" checked={infoCheck} onChange={infoCheckEvent}/>
                            <label htmlFor="check2">개인정보 취급방침 동의(필수)</label>
                        </div>
                        <button onClick={toggleInfoCheckVisible}>{useInfoVisible ? '약관 숨기기' : '약관 보기'}</button>
                    </div> 
                    {useInfoVisible && (
                            <div>
                                <p>약관 내용을 여기에 추가할 수 있습니다.</p>
                            </div>
                        )}
                    </div>
                    <div className="signUp-submit">
                        <button onClick={handleSignUpSubmit} disabled={!isFormValid}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;