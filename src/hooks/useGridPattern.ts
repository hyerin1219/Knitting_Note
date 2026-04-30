import { useEffect, useState } from 'react';
import { IGirdPattern } from '@/types';
import { useGridPatternStore } from '@/store/useGridPatternStore';
import { useAuth } from './useAuth';

export function useGridPattern() {
    const { patterns, loading, fetchPatterns } = useGridPatternStore();
    const { uid } = useAuth();
    useEffect(() => {
        if (uid) {
            fetchPatterns(uid);
        }
    }, [uid, fetchPatterns]);

    return { data: patterns, loading };
}

export function useGirdPatternDetail(id: string) {
    const { getPatternById, loading } = useGridPatternStore();
    const [pattern, setPattern] = useState<IGirdPattern | null>(null);
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
