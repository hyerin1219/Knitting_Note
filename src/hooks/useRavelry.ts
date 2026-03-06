import { useQuery } from '@tanstack/react-query';

export function usePatterns(craft: 'crochet' | 'knitting', enabled = true) {
    return useQuery({
        queryKey: ['patterns', craft],
        queryFn: async () => {
            const res = await fetch(`/api/ravelry?craft=${craft}`);

            if (!res.ok) {
                throw new Error('패턴 불러오기 실패');
            }

            const data = await res.json();
            return data.patterns;
        },
        enabled,
        staleTime: 1000 * 60 * 10, // 1시간 캐싱
    });
}
