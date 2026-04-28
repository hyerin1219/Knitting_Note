import { useEffect, useState } from 'react';
import { ICrochetCircle } from '@/types';
import { useCrochetCircleStore } from '@/store/useOnlineCrochetCircleStore';

export function useCrochetCircle() {
    const { crochetCircles, loading, fetchCrochetCircles } = useCrochetCircleStore();

    useEffect(() => {
        fetchCrochetCircles();
    }, [fetchCrochetCircles]);

    return { data: crochetCircles, loading };
}

export function useCrochetCircleDetail(id: string) {
    const { getCrochetCircleById, loading } = useCrochetCircleStore();
    const [crochetCircle, setCrochetCircle] = useState<ICrochetCircle | null>(null);

    useEffect(() => {
        if (id) getCrochetCircleById(id).then(setCrochetCircle);
    }, [id, getCrochetCircleById]);

    return { crochetCircle, loading };
}
