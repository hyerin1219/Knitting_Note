import { useEffect, useState } from 'react';
import { IImagePattern } from '@/types';
import { useImagePatternStore } from '@/store/useImagePatternStore';
import { useAuth } from './useAuth';

export function useImagePattern() {
    const { patterns, loading, fetchPatterns } = useImagePatternStore();
    const { uid } = useAuth();

    useEffect(() => {
        if (uid) {
            fetchPatterns(uid);
        }
    }, [uid, fetchPatterns]);

    return { data: patterns, loading };
}

export function useImagePatternDetail(id: string) {
    const { getPatternById, loading } = useImagePatternStore();
    const [pattern, setPattern] = useState<IImagePattern | null>(null);
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
