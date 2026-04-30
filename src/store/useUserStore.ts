import { create } from 'zustand';

interface UserState {
    hasCharacter: boolean | null; // null: 로딩중, true: 등록됨, false: 미등록
    userInfo: any | null;
    setHasCharacter: (status: boolean) => void;
    setUserInfo: (info: any) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    hasCharacter: null,
    userInfo: null,
    setHasCharacter: (status) => set({ hasCharacter: status }),
    setUserInfo: (info) => set({ userInfo: info }),
    clearUser: () => set({ hasCharacter: false, userInfo: null }),
}));
