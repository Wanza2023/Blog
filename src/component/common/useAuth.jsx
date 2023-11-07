import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState, nickNameState } from './AuthState';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [nickname, setNickname] = useRecoilState(nickNameState);

    useEffect(() => {
        const token = localStorage.getItem('token'); // 로컬스토리지에서 토큰 받아오기
        const storedNickname = localStorage.getItem('nickName'); // 닉네임 받아오기

        setIsLoggedIn(!!token); // 토큰있으면 true

        if (storedNickname) { // 닉네임 있으면
            setNickname(storedNickname);
        }
    }, [setIsLoggedIn, setNickname]);

    return { isLoggedIn, setIsLoggedIn, nickname, setNickname };
};
