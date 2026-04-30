import { create } from 'zustand';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IPattern } from '@/types';

interface PatternState {
    patterns: IPattern[];
    loading: boolean;

    // uid를 인자로 받도록 수정
    fetchPatterns: (uid: string) => Promise<void>;
    getPatternById: (uid: string, id: string) => Promise<IPattern | null>;
}

export const usePatternStore = create<PatternState>((set, get) => ({
    patterns: [],
    loading: false,

    // 전체 목록 가져오기
    fetchPatterns: async (uid: string) => {
        if (get().patterns.length > 0) return;

        set({ loading: true });
        try {
            // 인자로 받은 uid를 경로에 사용
            const q = query(collection(db, 'users', uid, 'Patterns'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IPattern[];

            set({ patterns: results });
        } catch (error) {
            console.error('fetchPatterns Error:', error);
        } finally {
            set({ loading: false });
        }
    },

    // 상세 데이터 가져오기
    getPatternById: async (uid: string, id: string) => {
        if (!uid || !id) return null;

        // 스토어(목록)에 해당 데이터가 있는지 확인
        const existing = get().patterns.find((p) => p.id === id);
        if (existing) return existing;

        // 없다면 서버에서 단일 문서만 가져옴
        set({ loading: true });
        try {
            const docRef = doc(db, 'users', uid, 'Patterns', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as IPattern;
            }
            return null;
        } catch (error) {
            console.error('getPatternById Error:', error);
            return null;
        } finally {
            set({ loading: false });
        }
    },
}));
