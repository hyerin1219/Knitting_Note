'use client';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IGirdPattern } from '@/types';

export function useGridPattern() {
    const [data, setData] = useState<IGirdPattern[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatterns = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'GridPatterns'), orderBy('createdAt', 'desc'));

                const querySnapshot = await getDocs(q);

                const results = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                })) as IGirdPattern[];

                setData(results);
            } catch (error) {
                console.error('Error fetching patterns:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatterns();
    }, []);

    return { data, loading };
}

export function useGirdPatternDetail(id: string) {
    const [pattern, setPattern] = useState<IGirdPattern | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const docRef = doc(db, 'GridPatterns', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const rawData = docSnap.data();
                    const flatItems = rawData.items || [];
                    const width = rawData.gridWidth || 5;

                    // 변환 로직
                    const chunkedItems = [];
                    for (let i = 0; i < flatItems.length; i += width) {
                        chunkedItems.push(flatItems.slice(i, i + width));
                    }

                    setPattern({
                        id: docSnap.id,
                        ...rawData,
                        items: chunkedItems,
                    } as IGirdPattern);
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
