import { create } from 'zustand';

import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { IUserInfo } from '@/types';
import { db } from '@/lib/firebase';

interface IUserState {
    users: IUserInfo[];
    loading: boolean;
    // 액션 타입 정의
    fetchUsers: () => Promise<void>;
    getUser: (uid: string) => Promise<IUserInfo | null>;
}

export const useUserStore = create<IUserState>((set, get) => ({
    users: [],
    loading: false,

    // 전체 유저 목록 가져오기
    fetchUsers: async () => {
        // 이미 불러온 데이터가 있다면 중복 호출 방지
        if (get().users.length > 0) return;

        set({ loading: true });
        try {
            // 이미지의 'users' 컬렉션 참조, createdAt 기준 내림차순 정렬
            const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IUserInfo[];

            set({ users: results });
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            set({ loading: false });
        }
    },

    // 특정 유저 상세 정보 가져오기
    getUser: async (uid: string) => {
        const existingUser = get().users.find((u) => u.id === uid);
        if (existingUser) return existingUser;

        set({ loading: true });
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const detail = {
                    id: docSnap.id,
                    ...docSnap.data(),
                } as IUserInfo;

                set((state) => ({
                    users: [...state.users, detail],
                }));

                return detail;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            set({ loading: false });
        }
    },
}));
