'use client';

import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/useUserStore';
import Main from '@/components/units/main';
import DashBoard from '@/components/units/dashBoard';
import { useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function MainPage() {
    const { uid } = useAuth();
    const { getUser, loading, users } = useUserStore();
    const currentUser = useCurrentUser();

    useEffect(() => {
        if (uid) {
            getUser(uid);
        }
    }, [uid, getUser]); // uid가 바뀌면(로그인/로그아웃) 다시 실행

    if (loading) return <div>로딩 중...</div>;

    // uid가 존재하면 <Main />, uid가 없으면 <DashBoard />
    return currentUser ? <Main /> : <DashBoard />;
}
