import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/useUserStore';
import { useMemo } from 'react';

export const useCurrentUser = () => {
    const { uid } = useAuth();
    const users = useUserStore((state) => state.users);

    const currentUser = useMemo(() => {
        return users?.find((u) => u.uid === uid);
    }, [users, uid]);

    console.log('uid', uid);
    console.log('users', users);
    console.log('currentUser', currentUser);

    return currentUser;
};
