import React, { useState, useCallback,useEffect } from 'react';
import axios from "axios";
import { FaCog } from 'react-icons/fa';
import { BiUserCircle } from "react-icons/bi";
import { useRecoilValue } from 'recoil';
import { memberIdState } from '../../common/AuthState';
import AWS from 'aws-sdk';
import {v1} from 'uuid';
import '../../../styles/component/UserProfileChange.css';

const UserProfileChange = ({ onSaveChanges }) => {
    const [passwordError, setPasswordError] = useState('');
    const storedNickname = sessionStorage.getItem('nickName');
    const storedBirth = sessionStorage.getItem('birth');
    const storedGender = sessionStorage.getItem('gender');
    const Gender = storedGender === 'W' ? '여성' : storedGender === 'M' ? '남성' : '';
    const memberId = useRecoilValue(memberIdState);
    const [nickname, setNickname] = useState(storedNickname); // 닉네임 상태 변수
    const [profileImg,setProfileImg] = useState((sessionStorage.getItem('pfp')));
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 변수
    const [passwordChangeUrl, setPasswordChangeUrl] = useState('');
    const storedProfileImage = sessionStorage.getItem('pfp');
    const [profileImage, setProfileImage] = useState(storedProfileImage || null); // 프로필 이미지 상태 변수

    const onProfileImgChange = useCallback(async (e) => {
        const file = e.target.files[0];
        
        if (file) {
            const s3 = new AWS.S3({
                region: process.env.REACT_APP_AWS_DEFAULT_REGION,
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            });
    
            const params = {
                Bucket: process.env.REACT_APP_AWS_BUCKET, // 버킷 이름
                Key: `profile/${v1()}.${file.type.split("/")[1]}`, 
                Body: file,
                ContentType: file.type,
                ACL: "public-read"
            };
            try {
                const uploadResult = await s3.upload(params).promise().then((res)=>res.Location);
                console.log('Image uploaded to S3 successfully', uploadResult);
                // 업로드된 이미지의 URL을 상태에 저장
                setProfileImage(uploadResult);
                sessionStorage.setItem('pfp', uploadResult.Location);
            } catch (error) {
                console.error('Error uploading image to S3:', error);
            }
        }
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const birth = formatDate(storedBirth);

    const handleImageChange = (e) => { // 이미지 변경
        if (e.target.files && e.target.files[0]) {
            const newProfileImage = URL.createObjectURL(e.target.files[0]);
            setProfileImage(newProfileImage);
        }
    };

    const handleNicknameChange = (e) => { // 닉네임 변경
        setNickname(e.target.value);
    };
    const handleDoubleCheck = (nickName) => {
        axios
            .get(`${process.env.REACT_APP_MEMBER_API_KEY}/validate/nickname/${nickName}`)
            .then(res=>{
                if(res.data.success){
                    alert("사용가능한 닉네임입니다.");
                } else {
                    alert("이미 사용중인 닉네임입니다.");
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
    }

    const handlePatchData = () => {
        const token = sessionStorage.getItem('token');
        axios
            .patch(`${process.env.REACT_APP_MEMBER_API_KEY}/info`, {
                // 닉네임,생일,성별,프로필사진
                nickName: nickname,
                gender : storedGender,
                birth: storedBirth,
                pfp: profileImage
            },{
                headers: {
                    Authorization: `Bearer ${token}`
            }
            })
            .then(res=>{
                console.log(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
    }

    // const handleSubmit = () => {
    //     if (password !== confirmPassword) {
    //         setPasswordError('비밀번호가 일치하지 않습니다.');
    //         return;
    //     }

    //     const newPassword = password;

    //     if (passwordChangeUrl && memberId && newPassword) {
    //         axios.patch(passwordChangeUrl, {
    //             memberId: memberId,
    //             password: newPassword
    //         })
    //         .then(response => {
    //             if (response.data.success) {
    //                 alert('비밀번호가 성공적으로 변경되었습니다.');
    //                 setPassword('');
    //                 setConfirmPassword('');
    //             } else {
    //                 alert('비밀번호 변경 실패');
    //             }
    //         })
    //         .catch(error => {
    //             alert('현재 비밀번호와 똑같은 비밀번호로는 변경할 수 없습니다.');
    //         });
    //     } else {
    //         alert('비밀번호 변경 정보가 누락되었습니다.');
    //     }
    //     onSaveChanges({ nickname, profileImage, password });
    // };

    return (
        <div className="userProfileChange">
            <div className="profileImage">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="userImage" />
                ) : (
                    <BiUserCircle size={200} className="userIcon" />
                )}
                <label htmlFor="image-upload" className="imageEdit">
                    <FaCog size={30} />
                </label>
                <input id="image-upload" type="file" accept='image/*' onChange={onProfileImgChange} style={{ display: 'none' }} />
            </div>
            <div className="profileChangeBox">
                <div className="profileField">
                    <p className="fieldLabel">닉네임</p>
                    <input 
                        type="text" 
                        placeholder="닉네임 변경" 
                        value={nickname} 
                        onChange={handleNicknameChange} 
                    />
                    <button className="doubleCheck" onClick={() => handleDoubleCheck(nickname)}>중복확인</button>
                </div>
                <div className="profileField">
                    <p className="fieldLabel">생년월일</p>
                    <div className="dataField">{birth}</div>
                </div>
                <div className="profileField">
                    <p className="fieldLabel">성별</p>
                    <div className="dataField">{Gender}</div>
                </div>
                <div className="submitButtonContainer">
                    <button className="saveButton" onClick={handlePatchData}>저장하기</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileChange;
