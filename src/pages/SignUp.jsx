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
            setUseCheckVisible(false);
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
            setUseInfoVisible(false);
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
                    navigate("/login",{replace : true});
                } else {
                    console.log("회원가입 실패");
                }
            })
            .catch(function(error){
                console.log(error);
            })
    }
    const handleError = () => {
        //회원가입시 정보 모두 입력 안하면 alert창 띄우기
        alert("정보를 전부 입력해주세요");
    }

    return(
        <div className="background">
            <div className="signUp">
                <div className="signUp-form">
                    <div className="signUp-field">
                        <label>이메일(아이디) *</label>
                        <input type="email" name="mail" id="mail" value={email} onChange={onChangeEmail} 
                        placeholder="이메일을 입력하세요" />
                        <p className={`${totConfirm[0] ? 'signup-submit-message-isok':'signup-submit-message'}`}>{emailMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>비밀번호 *</label>
                        <input type="password" name="pwd" id="pwd" maxLength={20} value={pwd} onChange={onChangePwd} placeholder="비밀번호를 입력하세요"/>
                        <p className={`${totConfirm[2] ? 'signup-submit-message-isok':'signup-submit-message'}`}>{pwdMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>비밀번호 확인 *</label>
                        <input type="password" name="confPwd" id="confPwd" maxLength={20} value={confirmPwd} onChange={onChangeConfirmPwd} placeholder="비밀번호를 입력하세요"/>
                        {/* <p className="signup-submit-message">{confirmPwdMessage}</p> */}
                        <p className={`${totConfirm[3] ? 'signup-submit-message-isok':'signup-submit-message'}`}>{confirmPwdMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>닉네임 *</label>
                        <div className="nameConfirm">
                            <input type="text" name="name" id="name" value={name} onChange={onChangeName} placeholder="닉네임을 입력하세요"/>
                            <button onClick={handleDoubleCheck}>중복확인</button>
                        </div>
                        <p className={`${totConfirm[1] ? 'signup-submit-message-isok':'signup-submit-message'}`}>{nameMessage}</p>
                    </div>
                    <div className="signUp-field">
                        <label>생년월일 &nbsp;<small>8자리</small></label>
                        <input type="text" name="bdate" maxLength={8} id="bdate" value={birth} onChange={onChangeBirth} placeholder="생년월일을 입력하세요"/>
                        <p className={`${totConfirm[4] ? 'signup-submit-message-isok':'signup-submit-message'}`}>{birthMessage}</p>
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
                            <textarea className="terms" readOnly>
                                제1조 (목적)
본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고 합니다)이 주식회사 카카오(이하 "회사"라고 합니다)가 제공하는 티스토리(Tistory) 서비스(이하 "서비스"라고 합니다)를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (약관의 명시, 효력 및 개정)
(1) 회사는 본 약관의 내용을 회원이 알 수 있도록 서비스 화면(www.tistory.com)에 게시함으로써 이를 공지합니다.
(2) 회사는 콘텐츠산업 진흥법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 소비자기본법 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
(3) 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및 개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께 그 적용일자 일십오(15)일 전부터 적용일 이후 상당한 기간 동안 공지만을 하고, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 삼십(30)일 전부터 적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에 공지하고 회원의 이메일 주소로 약관 개정 사실을 발송하여 고지합니다.
(4) 회사가 전항에 따라 회원에게 통지하면서 공지 또는 공지∙고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 불구하고 거부의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 제15조 제1항의 규정에 따라 이용계약을 해지할 수 있습니다.
(5) 카카오계정으로 서비스를 이용하는 경우 회원의 카카오계정에 적용되는 이용약관(카카오 통합서비스약관, 카카오 통합 약관, 카카오 서비스 약관 중 하나를 의미하며, 이하 총칭하여 ‘카카오 약관’이라 합니다)과 그에 따른 운영정책 등이 본 약관과 함께 적용됩니다. 서비스의 이용과 관련하여 카카오 약관에서 정하고 있지 않는 내용이 있거나 본 약관과 카카오 약관의 내용이 충돌하는 경우에는 본 약관의 내용이 우선 적용됩니다.
제3조 (서비스의 제공)
(1) 회사가 제공하는 서비스의 종류는 아래 각 호로 합니다.
①
티스토리(Tistory) 서비스

②
기타 회사가 자체 개발하는 등의 방법으로 추가적으로 회원에게 제공하는 일체의 서비스

제4조 (서비스 이용)
(1) 서비스 이용시간은 회사의 업무상 또는 기술상 불가능한 경우를 제외하고는 연중무휴 1일 24시간(00:00-24:00)으로 함을 원칙으로 합니다. 다만, 회사는 서비스 설비의 정기점검 등의 사유로 일정 기간 동안 서비스 제공을 일시 중지하거나 서비스 제공 시간을 제한할 수 있으며, 이 경우 회사는 회원에 대해 그 사유를 사전에 통지합니다. 단, 회사는 사전 고지가 불가능한 긴급한 사유가 있는 경우 사후에 통지할 수 있습니다.
(2) 전항의 경우 회사는 회원의 이메일주소로 이메일을 발송하여해당 내용을 통지합니다. 단, 회원 전체 불특정 다수인을 상대로 통지하는 경우에는 웹사이트 기타 회사의 공지사항 페이지를 통하여 회원들에게 알립니다.
제5조 (서비스내용변경 통지 등)
(1) 회사가 제3조의 서비스 내용을 변경하거나 종료하는 경우 회사는 회원의 이메일 주소로 이메일을 발송하여 서비스 내용의 변경 사항 또는 종료를 통지합니다 단, 회원 전체 불특정 다수인을 상대로 통지를 함에 있어서는 웹사이트 기타 회사의 공지사항 페이지를 통하여 회원들에게 알립니다.
제6조 (권리의 귀속 및 저작물의 이용)
(1) 회사가 회원에게 제공하는 각종 서비스에 대한 저작권을 포함한 일체의 권리는 회사에 귀속되며 회원이 서비스를 이용하는 과정에서 작성한 게시물 등(이하 “게시물 등”이라 합니다)에 대한 저작권을 포함한 일체의 권리는 별도의 의사표시가 없는 한 각 회원에게 귀속됩니다. 단, 제8조에서 정하는 팀블로그의 게시물 등에 대해서는 제8조에서 정한 바에 따릅니다.
(2) 게시물 등은 회사가 운영하는 인터넷 사이트 및 모바일 어플리케이션을 통해 노출될 수 있으며, 검색결과 내지 관련 프로모션 등에도 노출될 수 있습니다. 또한, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, 회원은 언제든지 고객센터 또는 각 서비스 내 관리기능을 통해 해당 게시물 등에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.
(3) 회사는 전항 이외의 방법으로 회원의 게시물 등을 이용하고자 하는 경우에는 이메일 등을 통해 사전에 회원의 동의를 얻습니다.
제7조 (서비스이용의 제한 및 중지)
(1) 회사는 아래 각 호의 1에 해당하는 사유가 발생한 경우 회원의 서비스 이용을 제한하거나 중지시킬 수 있습니다.
①
회원이 회사 서비스의 운영을 고의 또는 중과실로 방해하는 경우

②
회원이 제12조 등 본 약관을 위반한 경우

③
서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우

④
전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우

⑤
국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때

⑥
기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우

⑦
카카오계정으로 서비스를 이용하는 회원이 카카오 약관 또는 카카오 운영정책을 위반하는 경우

(2) 회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간등을 회원에게 알려야 합니다.
(3) 제15조 제2항에 의해 회사가 회원과의 계약을 해지하고 탈퇴시키기로 결정한 경우 회사는 회원의 탈퇴 처리 전에 이를 통지하고, 회원은 회사의 통지를 받은 날로부터 30일 이내에 이에 대한 항변의 기회를 가집니다.
(4) 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 “정보통신망법”이라 합니다)의 규정에 의해 다른 회원의 공개된 게시물 등이 본인의 사생활을 침해하거나 명예를 훼손하는 등 권리를 침해 받은 회원 또는 제3자(이하 “삭제 등 신청인”이라 합니다)는 그 침해사실을 소명하여 회사에 해당 게시물 등의 삭제 또는 반박 내용의 게재를 요청할 수 있습니다. 이 경우 회사는 해당 게시물 등의 권리 침해 여부를 판단할 수 없거나 당사자 간의 다툼이 예상되는 경우 해당 게시물 등에 대한 접근을 임시적으로 차단하는 조치(이하 “임시조치”라 합니다)를 최장 30일까지 취합니다.
(5) 제4항에 의해 본인의 게시물 등이 임시조치된 회원(이하 “게시자”라 합니다)은 임시조치기간 중 회사에 해당 게시물 등을 복원해 줄 것을 요청(이하 “재게시 청구”라 합니다)할 수 있으며, 회사는 임시조치된 게시물의 명예훼손 등 판단에 대한 방송통신심의위원회 심의 요청에 대한 게시자 및 삭제 등 신청인의 동의가 있는 경우 게시자 및 삭제 등 신청인을 대리하여 이를 요청하고 동의가 없는 경우 회사가 이를 판단하여 게시물 등의 복원 여부를 결정합니다. 게시자의 재게시 청구가 있는 경우 임시조치 기간 내에 방송통신심의위원회 또는 회사의 결정이 있으면 그 결정에 따르고 그 결정이 임시조치 기간 내에 있지 않는 경우 해당 게시물 등은 임시조치 만료일 이후 복원됩니다. 재게시 청구가 없는 경우 해당 게시물 등은 임시조치 기간 만료 이후 삭제됩니다.
(6) 회사는 서비스 내에 게시된 게시물 등이 사생활 침해 또는 명예훼손 등 제3자의 권리를 침해한다고 인정하는 경우 제5항에 따른 회원 또는 제3자의 신고가 없는 경우에도 임시조치(이하 “임의의 임시조치”라 합니다)를 취할 수 있습니다. 임의의 임시조치된 게시물의 처리 절차는 제4항 후단 및 제5항의 규정에 따릅니다.
(7) 회원의 게시물 등으로 인한 법률상 이익 침해를 근거로, 다른 회원 또는 제3자가 회원 또는 회사를 대상으로 하여 민형사상의 법적 조치(예: 형사고소, 가처분 신청∙손해배상청구 등 민사소송의 제기)를 취하는 경우, 회사는 동 법적 조치의 결과인 법원의 확정판결이 있을 때까지 관련 게시물 등에 대한 접근을 잠정적으로 제한할 수 있습니다. 게시물 등의 접근 제한과 관련한 법적 조치의 소명, 법원의 확정 판결에 대한 소명 책임은 게시물 등에 대한 조치를 요청하는 자가 부담합니다.
제8조 (팀블로그 서비스)
(1) 회사의 서비스에서 제공하는 모든 블로그는 블로그를 개설한 회원의 의사에 따라 팀블로그로 운영할 수 있습니다.
(2) 회원은 다른 회원이 개설한 팀블로그에 초대메일을 통해 팀원으로 초대받을 수 있으며 초대메일의 내용에 동의하고 승낙함으로써 팀블로그 회원으로 가입할 수 있습니다.
(3) 팀블로그의 회원등급은 소유자, 관리자, 편집자, 필자의 4단계의 등급으로 구분이 되며 각 회원의 의무는 제12조에 명시한 회원의 의무를 동일하게 부여받습니다. 팀블로그에 속한 회원의 권한과 책임범위는 다음 각호와 같습니다.
①
소유자(팀블로그를 만든 회원을 말합니다)는 팀블로그 운영에 대한 모든 권리를 가지게 되며, 다른 회원을 초대하여 팀블로그의 개설, 운영, 폐쇄 및 회원관리를 할 수 있습니다. 또한 관리자(소유자가 지정한 운영자격을 가지는 회원을 말합니다)에게 회원관리의 권한을 부여할 수 있습니다.

②
관리자는 소유자가 부여한 회원관리 권한 외에 편집자와 필자의 권한을 관리할 수 있습니다.

③
편집자는 필자가 팀블로그에 게시한 게시물 등에 대한 편집권한을 가지며 회원관리 권한은 수행할 수 없습니다.

④
필자는 팀블로그에 게시물 등을 게시할 수 있으며 본인이 게시한 게시물 등에 대한 편집권한을 가집니다. 필자에 의해 올려진 게시물 등은 공개 게시물 등에 한해 팀블로그로 저작물에 대한 권한이 귀속됩니다. 필자는 회원관리 권한은 수행할 수 없습니다.

(4) 팀블로그의 모든 회원은 자유롭게 팀블로그를 탈퇴할 수 있습니다. 팀블로그에 올려진 게시물 등은 팀블로그 저작물로 인정되어 회원 탈퇴 시 별도의 삭제작업을 병행하지 않습니다.
(5) 팀블로그에 올려진 게시물에 대한 모든 책임은 팀블로그 소유자에게 있습니다.
(6) 휴면 등의 사유로 팀블로그 소유자의 계정이 탈퇴되는 경우 및 소유자가 자신의 권한을 정상적으로 유지하지 못할 경우 회사는 소유자 다음으로 회원 등급이 높은 회원(관리자, 편집자, 필자 순)에게 팀블로그 소유자의 지위를 양도합니다. 이때 동일 등급의 회원이 여러 명이라면 가입 시점이 가장 빠른 회원에게 지위를 양도하며, 지위의 양도는 소유자의 계정이 탈퇴되는 즉시 이루어집니다.
제9조 (서비스 내 광고)
회사는 서비스 내에서 광고를 게재할수 있으며, 게재되는 광고의 형태 및 위치, 노출 빈도, 수익의 귀속 등은 회사가 정합니다.
제10조 (응원하기)
(1) 티스토리의 응원하기란 창작자의 콘텐츠에 대한 감사와 응원을 후원금과 메시지로 표현하는 것을 의미합니다.
(2) 회사의 내부 기준에 의해 선정된 창작자가 별도의 창작자 정산센터 이용약관 동의를 통하여 응원하기 관련 기능을 이용할 수 있습니다.
(3) 응원하기'를 통해 받은 후원금은 창작자 정산센터에서 지급 받을 수 있으며, 후원금 지급 기준은 창작자 정산센터의 이용약관에서 정하는 바에 따릅니다.
(4) ‘응원하기’의 후원 기능은 만 14세 이상 본인 인증된 회원만 이용할 수 있습니다.
(5) ‘응원하기’는 회원의 자발적 결제이므로 청약철회가 불가능한 서비스임을 콘텐츠산업진흥법에 의거 알려 드립니다.
(6) 본 서비스 이용과 관련하여 본 약관에 명시되지 않은 내용은 카카오 약관을 따릅니다.
제11조 (회사의 의무)
(1) 회사는 회사의 서비스 제공 및 보안과 관련된 설비를 지속적이고 안정적인 서비스 제공에 적합하도록 유지, 점검 또는 복구 등의 조치를 성실히 이행하여야 합니다.
(2) 회사는 회원이 원하지 아니하는 영리 목적의 광고성 전자우편을 발송하지 아니합니다.
(3) 회사는 서비스의 제공과 관련하여 알게 된 회원의 개인정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않고, 이를 보호하기 위하여 노력합니다. 회원의 개인정보보호에 관한 기타의 사항은 정보통신망 이용촉진 및 정보보호등에 관한 법률 등 관계법령 및 회사가 별도로 정한 “개인정보처리방침”에 따릅니다. 단, 카카오계정으로 서비스를 이용하는 경우, 카카오 개인정보 처리방침이 적용됩니다.
제12조 (회원의 의무)
(1) 회원은 아래 각 호의 1에 해당하는 행위를 하여서는 안됩니다.
①
회원정보에 허위내용을 등록하는 행위

②
회사의 서비스에 게시된 정보를 변경하거나 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 영리 또는 비영리의 목적으로 복제, 출판, 방송 등에 사용하거나 제3자에게 제공하는 행위

③
회사가 제공하는 서비스를 이용하여 제3자에게 본인을 홍보할 기회를 제공 하거나 제3자의 홍보를 대행하는 등의 방법으로 금전을 수수하거나 서비스를 이용할 권리를 양도하고 이를 대가로 금전을 수수하는 행위

④
회사 기타 제3자의 명예를 훼손하거나 지적재산권을 침해하는 등 회사나 제3자의 권리를 침해하는 행위

⑤
다른 회원의 이메일주소 및 비밀번호를 도용하여 부당하게 서비스를 이용한 경우

⑥
정크메일(junk mail), 스팸메일(spam mail), 행운의 편지(chain letters), 피라미드 조직에 가입할 것을 권유하는 메일, 외설 또는 폭력적인 메시지 ·화상·음성 등이 담긴 메일을 보내거나 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위

⑦
정보통신망이용촉진및정보보호등에관한법률 등 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)를 전송, 게시하거나 청소년보호법에서 규정하는 청소년유해매체물을 게시하는 행위

⑧
공공질서 또는 미풍양속에 위배되는 내용의 정보, 문장, 도형, 음성 등을 유포하는 행위

⑨
회사의 직원이나 서비스의 관리자를 가장하거나 사칭하여 또는 타인의 명의를 모용하여 글을 게시하거나 메일을 발송하는 행위

⑩
컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나 전자우편으로 발송하는 행위

⑪
스토킹(stalking) 등 다른 회원의 서비스 이용을 방해하는 행위

⑫
다른 회원의 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위

⑬
불특정 다수의 회원을 대상으로 하여 광고 또는 선전을 게시하거나 스팸메일을 전송하는 등의 방법으로 회사에서 제공하는 서비스를 이용하여 영리목적의 활동을 하는 행위

⑭
회사가 제공하는 소프트웨어 등을 개작하거나 리버스 엔지니어링, 디컴파일, 디스어셈블 하는 행위

⑮
어떤 방식으로든 서비스 내에 게제된 광고를 포함한 회사가 제공하는 정보 등을 변경, 조작하거나 정상적인 노출을 방해하는 등의 행위

⑯
회사가 정하지 않은 비정상적인 방법으로 결제를 하는 행위

⑰
정치자금법, 청탁금지법 등의 관련 법령을 위반하거나 자금 세탁, 불법 증여 등의 위법 행위

⑱
회사가 제공하는 서비스에 정한 약관 기타 서비스 이용에 관한 규정을 위반하는 행위

(2) 회사는 회원이 전항의 행위를 하는 경우 해당 게시물 등을 삭제 또는 임시조치할 수 있고 회원의 서비스 이용을 제한하거나 일방적으로 본 계약을 해지할 수 있습니다.
(3) 회사가 제공하는 서비스 중 관련 법령 등의 규정에 의하여 성인인증이 필요한 경우 회원은 해당 서비스를 이용하기 위하여 회사가 제공하는 방법에 따라 실명정보를 회사에 제공하여야 합니다.
제13조 (회원 ID 등의 관리책임)
(1) 회원은 서비스 이용을 위한 회원 ID, 비밀번호의 관리에 대한 책임, 본인 ID의 제3자에 의한 부정사용 등 회원의 고의∙과실로 인해 발생하는 모든 불이익에 대한 책임을 부담합니다. 단, 이것이 회사의 고의∙과실로 인하여 야기된 경우에는 회사가 책임을 부담합니다.
(2) 회원은 회원 ID, 비밀번호 등을 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 즉시 본인의 비밀번호를 수정하는 등의 조치를 취하여야 하며, 즉시 이를 회사에 통보하여 회사의 안내를 따라야 합니다.
제14조 (양도금지)
회원의 서비스 받을 권리는 이를 양도 내지 증여하거나 질권의 목적으로 할 수 없습니다.

제15조 (이용계약의 해지)
1. 회원은 서비스 이용계약을 해지하고자 하는 때에는 회사가 제공하는 서비스 내의 회원탈퇴 기능을 이용하여 탈퇴를 요청할 수 있습니다. 회사는 탈퇴를 요청한 시점에서 제7조 제(1)항의 각호에 해당하는 범위 외 불가피한 사정이 없는 한 즉시 탈퇴요청을 처리합니다.
2. 회원이 제12조의 규정을 위반한 경우 회사는 일방적으로 본 계약을 해지할 수 있고, 이로 인하여 서비스 운영에 손해가 발생한 경우 이에 대한 민∙형사상 책임도 물을 수 있습니다.
3. 회원이 서비스를 이용하는 도중, 연속하여 1년 동안 회사의 서비스에 log-in한 기록이 없는 경우 회원의 이메일 주소를 통해 회원에게 통지 후 회사는 회원의 개인정보를 4년간 분리 보관합니다(단, 관련 법령에서 별도의 기간을 정한 경우에는 해당 기간에 따릅니다). 분리 보관 기간 내에 회원의 log-in 시도 없이 보관기간이 경과된 경우 회사는 별도의 통지 없이 해당 회원의 계정을 탈퇴처리 합니다
본 이용 계약이 해지된 경우 회원의 게시물 등 일체는 삭제됩니다. 단, 제8조 제(4)항의 경우에는 그러하지 않습니다.
제16조 (게시판 이용 상거래)
(1) 서비스 내 게시판을 이용하여 상거래(판매 및 중개 포함)를 업으로 하는 회원(이하 "게시판 이용 통신판매업자등 회원")의 경우 전자상거래 등에서의 소비자보호에 관한 법률(이하 "전자상거래법")에 따른 통신판매업자 및 통신판매중개업자의 의무사항을 준수하여야 합니다.
(2) "게시판 이용 통신판매업자등 회원"은 전자상거래법에서 요구하는 일정한 신원정보(동법 제14조 제1항 제1호 및 제2호)를 관련 게시판 서비스 내에서 제공하는 입력 기능을 이용하여 표시하며, 해당 신원정보를 회사에 제공해야 합니다.
(3) 회원과 "게시판 이용 통신판매업자등 회원" 사이에 상거래 관련 분쟁이 발생하는 경우 회사는 전항에 따라 확인된 "게시판 이용 통신판매업자등 회원"의 신원정보를 다음 각 호의 어느 하나에 해당하는 자의 요청이 있는 경우 제공할 수 있습니다.
①
전자상거래법 제33조에 따른 소비자피해 분쟁조정기구

②
공정거래위원회

③
시·도지사 또는 시장·군수·구청장

(4) "게시판 이용 통신판매업자등 회원"으로부터 피해를 입은 회원은 고객센터 페이지를 통하여 전항 1호에서 정한 소비자피해 분쟁조정기구에 피해구제신청을 할 수 있으며, 회사는 해당 신청을 대행하여 처리합니다.
제17조 (면책조항)
(1) 회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.
①
천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우

②
서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우

③
회원의 귀책사유로 서비스 이용에 장애가 있는 경우

④
제1호 내지 제3호를 제외한 기타 회사의 고의∙과실이 없는 사유로 인한 경우

(2) 회사는 제3자가 제공하거나 회원이 작성하는 등의 방법으로 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지 않으며 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지 아니합니다.
제18조 (분쟁의 해결)
본 약관은 대한민국 법령에 의하여 규정되고 이행되며, 서비스 이용과 관련하여 회사와 회원간에 발생한 분쟁에 대해서는 민사소송법상의 주소지를 관할하는 법원을 합의관할로 합니다.

제19조 (규정의 준용)
이 약관에 명시되지 않은 사항에 대해서는 관계법령에 의하고, 법에 명시되지 않은 부분에 대하여는 관습에 의합니다.

부칙 (2023. 10. 17.)
본 약관은 2023년 10월 17일부터 적용하고 2023년 2월 6일부터 적용되던 종전의 약관은 본 약관으로 대체합니다.
                            </textarea>
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
                                <textarea className="terms" value="
                                1. 카카오 개인정보 처리방침
                                “개인정보 처리방침”이란 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미하며, 카카오는 개인정보처리자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리방침을 제공합니다.
                                
                                카카오는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있습니다. 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장하기 위해 개인정보 처리방침을 알기 쉽게 제공할 수 있도록 다양한 노력을 기울이고 있으며, 이러한 노력의 일환으로 카카오의 주요 개인정보 처리 관련 정보를 라벨링으로 제공합니다.
                                2. 개인정보 수집
서비스 제공을 위한 필요 최소한의 개인정보를 수집합니다.
회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 서비스 제공을 위해 필요 최소한의 개인정보를 수집하고 있습니다.

서비스 제공을 위해 반드시 필요한 최소한의 정보를 필수항목으로, 그 외 특화된 서비스를 제공하기 위해 추가 수집하는 정보는 선택항목으로 동의를 받고 있으며, 선택항목에 동의하지 않은 경우에도 서비스 이용 제한은 없습니다.

[카카오계정 가입 시]
필수
이메일, 비밀번호, 이름(닉네임), 프로필사진, 친구목록, 카카오톡 전화번호(카카오톡 이용자의 경우에 한함), 연락처, 서비스 이용내역, 서비스 내 구매 및 결제 내역

선택
생년월일, 성별, 배송지정보(수령인명, 배송지주소, 전화번호)

[사업자/단체 카카오계정 가입 시]
필수
이메일, 비밀번호, 사업자/단체명, 프로필사진, 친구목록, 연락처, 서비스 이용내역, 서비스 내 구매 및 결제 내역, 담당자 본인 인증정보 (이름, 생년월일, 성별, 아이디, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI), 내/외국인 여부), 담당자 연락처(이메일 주소, 휴대전화번호)

[본인인증 시]
이름, 성별, 생년월일, 휴대전화번호, 통신사업자, 내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI)

[법정대리인 동의 시]
법정대리인 정보(이름, 성별, 생년월일, 휴대전화번호, 통신사업자, 내/외국인 여부, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI))

[유료서비스 이용 시]
신용카드 결제 시: 카드번호(일부), 카드사명 등
휴대전화번호 결제 시: 휴대전화번호, 결제승인번호 등
계좌이체 시: 예금주명, 계좌번호, 계좌은행 등
상품권 이용 시: 상품권 번호, 해당 사이트 아이디

[환불처리 시]
계좌은행, 계좌번호, 예금주명, 이메일

[현금영수증 발행 시]
휴대전화번호, 현금영수증 카드번호

[고객상담 시]
고객센터로 문의 및 상담 시 상담 처리를 위한 추가적인 정보를 수집할 수 있습니다." readOnly>
                                
                                </textarea>
                            </div>
                        )}
                    </div>
                    <div className="signUp-submit">
                        {/* <button onClick={handleSignUpSubmit} disabled={!isFormValid}>회원가입</button> */}
                        <button onClick={!isFormValid? handleError : handleSignUpSubmit}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;