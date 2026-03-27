'use client';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IPattern } from '@/types';

export function usePattern() {
    const [data, setData] = useState<IPattern[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatterns = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'patterns'), orderBy('createdAt', 'desc'));

                const querySnapshot = await getDocs(q);

                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as IPattern[];

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
