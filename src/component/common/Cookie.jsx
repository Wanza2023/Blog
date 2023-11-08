import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, options) => {
    cookies.set(key, value, { ...options });
    }

export const getCookie = (key, options) => {    
    return cookies.get(key, { ...options });
}