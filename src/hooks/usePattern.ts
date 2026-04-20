import { useEffect, useState } from 'react';
import { usePatternStore } from '@/store/usePatternStore';
import { IPattern } from '@/types';

export function usePattern() {
    const { patterns, loading, fetchPatterns } = usePatternStore();

    useEffect(() => {
        fetchPatterns();
    }, [fetchPatterns]);

    return { data: patterns, loading };
}

export function usePatternDetail(id: string) {
    const { getPatternById, loading } = usePatternStore();
    const [pattern, setPattern] = useState<IPattern | null>(null);

    useEffect(() => {
        if (id) getPatternById(id).then(setPattern);
    }, [id, getPatternById]);

    return { pattern, loading };
}
