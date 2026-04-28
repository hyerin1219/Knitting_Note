import { create } from 'zustand';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ICrochetCircle } from '@/types';

interface CrochetCircleState {
    crochetCircles: ICrochetCircle[];
    loading: boolean;

    fetchCrochetCircles: () => Promise<void>;
    getCrochetCircleById: (id: string) => Promise<ICrochetCircle | null>;
}

export const useCrochetCircleStore = create<CrochetCircleState>((set, get) => ({
    crochetCircles: [],
    loading: false,

    // 전체 목록 가져오기
    fetchCrochetCircles: async () => {
        // 이미 데이터가 있다면 굳이 다시 로딩하지 않음
        if (get().crochetCircles.length > 0) return;

        set({ loading: true });
        try {
            const q = query(collection(db, 'CrochetCircles'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ICrochetCircle[];

            set({ crochetCircles: results });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            set({ loading: false });
        }
    },

    // 상세 데이터 가져오기
    getCrochetCircleById: async (id: string) => {
        // 스토어(목록)에 해당 데이터가 있는지 확인
        const existing = get().crochetCircles.find((p) => p.id === id);
        if (existing) return existing;

        // 없다면 서버에서 단일 문서만 가져옴
        set({ loading: true });
        try {
            const docRef = doc(db, 'CrochetCircles', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const detail = { id: docSnap.id, ...docSnap.data() } as ICrochetCircle;
                return detail;
            }
            return null;
        } finally {
            set({ loading: false });
        }
    },
}));
