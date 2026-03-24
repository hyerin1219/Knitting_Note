import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IPattern } from '@/types';

export function usePattern(uid?: string, id?: string) {
    const [pattern, setPattern] = useState<IPattern | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid || !id) {
            setLoading(false);
            return;
        }

        const fetchPattern = async () => {
            try {
                const docRef = doc(db, 'users', uid, 'patterns', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPattern(docSnap.data() as IPattern);
                }
            } catch (error) {
                console.error('데이터 로딩 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPattern();
    }, [uid, id]);

    return { pattern, loading };
}
