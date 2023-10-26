import { atom } from "recoil";

export const isLoggedInState = atom({
    key: "isLoggedInState",
    default: false,
});

export const memberIdState = atom({
    key: "memberIdState",
    default: null,
})

export const nickNameState = atom( {
    key: "nickNameState",
    default: null,
})