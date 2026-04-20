import { create } from 'zustand';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IGirdPattern } from '@/types';

interface PatternState {
    patterns: IGirdPattern[];
    loading: boolean;

    fetchPatterns: () => Promise<void>;
    getPatternById: (id: string) => Promise<IGirdPattern | null>;
}

export const useGridPatternStore = create<PatternState>((set, get) => ({
    patterns: [],
    loading: false,

    // 전체 목록 가져오기
    fetchPatterns: async () => {
        // 이미 데이터가 있다면 굳이 다시 로딩하지 않음
        if (get().patterns.length > 0) return;

        set({ loading: true });
        try {
            const q = query(collection(db, 'GridPatterns'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IGirdPattern[];

            set({ patterns: results });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            set({ loading: false });
        }
    },

    // 상세 데이터 가져오기
    getPatternById: async (id: string) => {
        // 스토어(목록)에 해당 데이터가 있는지 확인
        const existing = get().patterns.find((p) => p.id === id);
        if (existing) return existing;

        // 없다면 서버에서 단일 문서만 가져옴
        set({ loading: true });
        try {
            const docRef = doc(db, 'GridPatterns', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const detail = { id: docSnap.id, ...docSnap.data() } as IGirdPattern;
                return detail;
            }
            return null;
        } finally {
            set({ loading: false });
        }
    },
}));
