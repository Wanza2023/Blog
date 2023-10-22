import { atom } from "recoil";

export const isLoggedInState = atom({
    key: "isLoggedInState",
    default: false,
});

export const nicknameState = atom({
    key: "nicknameState",
    default: null,
});

export const memberIdState = atom({
    key: "memberIdState",
    default: null,
});

