import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';

export function useRavelryBookmarks() {
    const { user } = useAuth();

    return useQuery({
        queryKey: ['RavelryBookmarks', user?.uid],
        enabled: !!user,
        queryFn: async () => {
            const snapshot = await getDocs(collection(db, 'RavelryBookmarks', user!.uid, 'patterns'));

            return snapshot.docs.map((doc) => doc.id);
        },
        staleTime: 1000 * 60 * 60, //한 시간
    });
}
