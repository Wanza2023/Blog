import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/PasswordFind.css"

function PasswordFind() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
    const [pwdMessage, setPwdMessage] = useState("");
    const [confirmMemberId, setConfirmMemberId] = useState(0);
    const [confirmPwdMessage, setConfirmPwdMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [authState, setAuthState] = useState(false);
    const navigate = useNavigate();
    const [emailState,setEmailState] = useState(false); // 이메일 인증 여부 [true:인증완료, false:인증안됨
    const [pwdState,setPwdState] = useState(false); // 비밀번호 변경 여부 [true:변경완료, false:변경안됨
    const [pwdconfirmState, setPwdconfirmState] = useState(false); // 비밀번호 확인 여부 [true:확인완료, false:확인안됨

    // Email input
    const handleInputuserEmail = (e) => {
        setUserEmail(e.target.value);
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;     // email 형식 맞는지 확인 
        if(!emailRegExp.test(e.target.value)){
            setEmailState(false);
            setEmailMessage("이메일의 형식이 올바르지 않습니다.");
        }else{
            setEmailMessage("인증 버튼을 눌러 인증하여주세요! ");
            setEmailState(true);
        }
    }
    // Password Input
    const handleInputuserPassword = (e) => {
        setUserPassword(e.target.value);
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!pwdRegExp.test(e.target.value)){
            setPwdMessage("숫자, 영문자, 특수문자(!@#$%^*+=-) 조합으로 8자리 이상 20자리 이하 입력해주세요 ");
            setPwdState(false);
        }else{
            setPwdMessage("안전한 비밀번호입니다");
            setPwdState(true);
        }
    }
    // Password Confirm Input
    const handleInputuserPasswordConfirm = (e) => {
        setUserPasswordConfirm(e.target.value);
        if(userPassword !== e.target.value){
            setConfirmPwdMessage("비밀번호가 일치하지 않습니다");
            setPwdconfirmState(false);
        }else{
            setConfirmPwdMessage("확인되었습니다");
            setPwdconfirmState(true);
        }
    }
    // Email 인증 버튼 클릭시
    const handleSubmituserEmail = (e) => {
        e.preventDefault();
        console.log(userEmail);
        axios
            .post(`${process.env.REACT_APP_MEMBER_API_KEY}/pwInquiry`, userEmail,{
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
            .then(res =>{
                console.log(res);
                setConfirmMemberId(res.data.body.memberId);
                setAuthState(true);
            })
            .catch(error => {
                console.error("에러 내용:", error);
                alert("존재하지않는 이메일입니다.");
            });
        }
    // Password 변경 버튼 클릭시
    const handleSubmituserPassword = (e) => {
        if (!authState) {
            // 이메일이 인증되지 않았을 때 비밀번호 변경 방지
            alert("이메일을 먼저 인증해주세요.");
            return;
        }

        // 비밀번호가 조건을 충족하고 확인이 성공한 경우에만 API 호출
        if (
            userPassword &&
            userPasswordConfirm &&
            userPassword === userPasswordConfirm &&
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/.test(userEmail) &&
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(userPassword)
        ) {
            axios
                .patch(`${process.env.REACT_APP_MEMBER_API_KEY}/password`, {
                    memberId: confirmMemberId,
                    password: userPassword,
                })
                .then((res) => {
                    console.log(res);
                    alert("비밀번호 변경에 성공했습니다.");
                    navigate('/login');
                })
                .catch((error) => {
                    console.error("에러 내용:", error);
                    alert("동일한 비밀번호로 변경 할 수 없습니다.");
                });
        } else {
            alert("비밀번호가 조건에 맞지 않거나 일치하지 않습니다.");
        }
    };

    return (
        <div className="background">
            <div className="signUp">
                <div className="signUp-form">
                    <div className="signUp-field">
                        <label>이메일(아이디) *</label>
                        <input type="email" name="mail" id="mail" value={userEmail} onChange={handleInputuserEmail}
                            placeholder="이메일을 입력하세요" />
                        <p className={emailState ? 'find-signup-submit-message-isok' : 'find-signup-submit-message-iserror'}>
                            {emailMessage}
                        </p>
                    </div>
                    {authState ? (
                        <>
                            <div className="signUp-field">
                                <p className="find-signup-submit-message-isok">인증되었습니다.</p>
                            </div>
                        </>
                    )
                        :
                        <button className='submit-button' onClick={handleSubmituserEmail}>인증</button>}
                    {authState &&
                        (
                            <>
                                <div className="signUp-field">
                                    <label>비밀번호 *</label>
                                    <input type="password" name="pwd" id="pwd" maxLength={20} value={userPassword} onChange={handleInputuserPassword} />
                                    <p className={pwdState ? 'find-signup-submit-message-isok' : 'find-signup-submit-message-iserror'}>
                                        {pwdMessage}
                                    </p>
                                </div>
                                <div className="signUp-field">
                                    <label>비밀번호 확인 *</label>
                                    <input type="password" name="confPwd" id="confPwd" maxLength={20} value={userPasswordConfirm} onChange={handleInputuserPasswordConfirm} placeholder="비밀번호를 입력하세요" />
                                    <p className={pwdconfirmState ? 'find-signup-submit-message-isok' : 'find-signup-submit-message-iserror'}>
                                        {confirmPwdMessage}
                                    </p>
                                </div>
                                <button className='submit-button' onClick={handleSubmituserPassword}>비밀번호 변경</button>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default PasswordFind;