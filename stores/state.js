import { atom } from "recoil";


export const authAtom = atom({
  key: 'authAtom',
  default: {
    isLoggedIn: false,
    token: null
  },
})