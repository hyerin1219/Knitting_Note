'use client';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IImagePattern, IPattern } from '@/types';

export function useImagePattern() {
    const [data, setData] = useState<IImagePattern[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatterns = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'ImagePatterns'), orderBy('createdAt', 'desc'));

                const querySnapshot = await getDocs(q);

                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as IImagePattern[];

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

export function useImagePatternDetail(id: string) {
    const [pattern, setPattern] = useState<IImagePattern | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const docRef = doc(db, 'ImagePatterns', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPattern({ id: docSnap.id, ...docSnap.data() } as IImagePattern);
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
