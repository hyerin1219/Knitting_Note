'use client';

import { useEffect, useState } from 'react';
import { usePatternStore } from '@/store/usePatternStore';
import { IPattern } from '@/types';
import { useAuth } from './useAuth';

export function usePattern() {
    const { patterns, loading, fetchPatterns } = usePatternStore();
    const { uid } = useAuth();

    useEffect(() => {
        if (uid) {
            fetchPatterns(uid);
        }
    }, [uid, fetchPatterns]); // uid가 바뀔 때마다 다시 확인하도록 추가

    return { data: patterns, loading };
}

export function usePatternDetail(id: string) {
    const { getPatternById, loading } = usePatternStore();
    const [pattern, setPattern] = useState<IPattern | null>(null);
    const { uid } = useAuth();

    useEffect(() => {
        // uid와 id가 모두 있을 때만 실행
        if (uid && id) {
            getPatternById(uid, id).then((res) => {
                setPattern(res);
            });
        }
    }, [uid, id, getPatternById]);

    return { pattern, loading };
}
