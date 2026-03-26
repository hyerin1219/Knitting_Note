'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, CollectionReference, Query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IPattern } from '@/types';

type IViewType = 'ALL' | 'MINE' | 'SAVED';

export function usePattern(type: IViewType, userId?: string) {
    const [data, setData] = useState<IPattern[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatterns = async () => {
            setLoading(true);
            try {
                let q: Query;

                switch (type) {
                    case 'MINE':
                        // 내가 만든 도안: author 필터링
                        q = query(collection(db, 'patterns'), where('author', '==', userId), orderBy('createdAt', 'desc'));
                        break;

                    case 'SAVED':
                        // 내가 저장한 도안: 유저 하위의 bookmarks 컬렉션 조회
                        // (북마크 저장 시 패턴 정보를 일부 포함해서 저장했다고 가정)
                        q = query(collection(db, 'users', userId || '', 'bookmarks'), orderBy('savedAt', 'desc'));
                        break;

                    case 'ALL':
                    default:
                        // 전체 도안
                        q = query(collection(db, 'patterns'), orderBy('createdAt', 'desc'));
                        break;
                }

                const querySnapshot = await getDocs(q);
                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as any[]; // 임시

                setData(results);
            } catch (error) {
                console.error('Error fetching patterns:', error);
            } finally {
                setLoading(false);
            }
        };

        if (type !== 'ALL' && !userId) return; // 유저 정보가 필요한데 없으면 대기
        fetchPatterns();
    }, [type, userId]);

    return { data, loading };
}

export function usePatternDetail(id: string) {
    const [pattern, setPattern] = useState<IPattern | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const docRef = doc(db, 'patterns', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPattern({ id: docSnap.id, ...docSnap.data() } as IPattern);
                }
            } catch (error) {
                console.error('Error fetching detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    return { pattern, loading };
}
