import { useEffect, useState } from 'react';
import { IImagePattern } from '@/types';
import { useImagePatternStore } from '@/store/useImagePatternStore';

export function useImagePattern() {
    const { patterns, loading, fetchPatterns } = useImagePatternStore();

    useEffect(() => {
        fetchPatterns();
    }, [fetchPatterns]);

    return { data: patterns, loading };
}

export function useImagePatternDetail(id: string) {
    const { getPatternById, loading } = useImagePatternStore();
    const [pattern, setPattern] = useState<IImagePattern | null>(null);

    useEffect(() => {
        if (id) getPatternById(id).then(setPattern);
    }, [id, getPatternById]);

    return { pattern, loading };
}
