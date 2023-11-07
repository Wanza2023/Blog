import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './AuthState';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [setIsLoggedIn]);

    return { isLoggedIn, setIsLoggedIn }; 
};