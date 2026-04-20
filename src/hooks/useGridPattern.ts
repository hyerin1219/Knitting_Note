import { useEffect, useState } from 'react';
import { IGirdPattern } from '@/types';
import { useGridPatternStore } from '@/store/useGridPatternStore';

export function useGridPattern() {
    const { patterns, loading, fetchPatterns } = useGridPatternStore();

    useEffect(() => {
        fetchPatterns();
    }, [fetchPatterns]);

    return { data: patterns, loading };
}

export function useGirdPatternDetail(id: string) {
    const { getPatternById, loading } = useGridPatternStore();
    const [pattern, setPattern] = useState<IGirdPattern | null>(null);

    useEffect(() => {
        if (id) getPatternById(id).then(setPattern);
    }, [id, getPatternById]);

    return { pattern, loading };
}
