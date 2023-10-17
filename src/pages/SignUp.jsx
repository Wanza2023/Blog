import React, { useState} from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp(props){
    const navigate = useNavigate();

    const [useCheck, setUseCheck] = useState(false);
    const [infoCheck, setInfoCheck] = useState(false);
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [totConfirm, setTotConfirm] = useState([0,0,0,0,0,0]);

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
        }else{
            setEmailMessage("사용 가능한 이메일 입니다.");//중복확인 해야함
            totConfirm[0] = 1; setTotConfirm(()=>[...totConfirm]);
        }
    }
    const onChangeName = (e) => {
        const curName = e.target.value;
        setName(curName);
        if(curName.length < 2 || curName.length > 10){
            setNameMessage("2글자 이상 10글자 이하로 입력해주세요");
            totConfirm[1] = 0; setTotConfirm(()=>[...totConfirm]);
        }else {
            setNameMessage("사용가능한 닉네임입니다."); 
            totConfirm[1] = 1; setTotConfirm(()=>[...totConfirm]);
        }
    }
    const onChangePwd = (e) => {
        const curPwd = e.target.value;
        setPwd(curPwd);
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!pwdRegExp.test(curPwd)){
            setPwdMessage("숫자, 영문자, 특수문자(!@#$%^*+=-) 조합으로 8자리 이상 입력해주세요");
            totConfirm[2] = 0; setTotConfirm(()=>[...totConfirm]);
        }else{
            setPwdMessage("안전한 비밀번호입니다");
            totConfirm[2] = 1; setTotConfirm(()=>[...totConfirm]);
        }
    }
    const onChangeConfirmPwd = (e) => {
        const curConfPwd = e.target.value;
        setConfirmPwd(curConfPwd);
        if(pwd !== curConfPwd){
            setConfirmPwdMessage("비밀번호가 일치하지 않습니다");
            totConfirm[3] = 0; setTotConfirm(()=>[...totConfirm]);
        }else{
            setConfirmPwdMessage("확인되었습니다");
            totConfirm[3] = 1; setTotConfirm(()=>[...totConfirm]);
        }
    }
    const onChangeBirth = (e) => {
        const curBirth = e.target.value;
        setBirth(curBirth);
        const birthRegExp = /^[0-9]{8}$/;
        if(!birthRegExp.test(curBirth)){
            setBirthMessage("8자리 생년월일을 입력주세요");
            totConfirm[4] = 0; setTotConfirm(()=>[...totConfirm]);
        }else{
            setBirthMessage("완료");
            totConfirm[4] = 1; setTotConfirm(()=>[...totConfirm]);
        }
    }

    const useCheckEvent = () => {
        setUseCheck(()=> !useCheck);
        console.log(useCheck);
    }
    const infoCheckEvent = () => {
        setInfoCheck(()=> !infoCheck);
        console.log(infoCheck);
    }

    const handleSignUpSubmit = () => {
        console.log(totConfirm);
        if(totConfirm[0]===1 && totConfirm[1]===1 && totConfirm[2]===1 && totConfirm[3]===1){
            if(useCheck===true && infoCheck===true) {
                alert("회원가입이 완료되었습니다.");
                
            } else {alert("약관에 동의해주세요");}
        }else{
            alert("내용이 올바르게 입력되지 않았습니다.");
        }
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
                        <input type="password" name="pwd" id="pwd" value={pwd} onChange={onChangePwd} placeholder="비밀번호를 입력하세요"/>
                        <p className="signup-submit-message">{pwdMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>비밀번호 확인 *</label>
                        <input type="password" name="confPwd" id="confPwd" value={confirmPwd} onChange={onChangeConfirmPwd} placeholder="비밀번호를 입력하세요"/>
                        <p className="signup-submit-message">{confirmPwdMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>닉네임 *</label>
                        <div className="nameConfirm">
                            <input type="text" name="name" id="name" value={name} onChange={onChangeName} placeholder="닉네임을 입력하세요"/>
                            <button>중복확인</button>
                        </div>
                        <p className="signup-submit-message">{nameMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>생년월일 &nbsp;<small>8자리</small></label>
                        <input type="text" name="bdate" id="bdate" value={birth} onChange={onChangeBirth} placeholder="생년월일을 입력하세요"/>
                        <p className="signup-submit-message">{birthMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>성별</label>
                        <div className="gender">
                            <button className="gender-btn" name="woman" onClick={()=>setGender("W")}>여성</button>
                            <button className="gender-btn" name="man" onClick={()=>setGender("M")}>남성</button>
                        </div>
                    </div>
                    <br/>
                    <div>
                    <div className="agreement">
                        <div className="agreement-wrap">
                            <input type="checkbox" id="check1" checked={useCheck} onChange={useCheckEvent}/>
                            <label htmlFor="check1">이용약관 동의(필수)</label>
                        </div>
                        <button>보기 &gt;</button>
                    </div>
                    <div className="agreement">
                        <div className="agreement-wrap">
                            <input type="checkbox" id="check2" checked={infoCheck} onChange={infoCheckEvent}/>
                            <label htmlFor="check2">개인정보 취급방침 동의(필수)</label>
                        </div>
                        <button>보기 &gt;</button>
                    </div> 
                    </div>
                    <div className="signUp-submit">
                        <input type="submit" value="회원가입" onClick={handleSignUpSubmit}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;