'use client';

import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/useUserStore';
import Main from '@/components/units/main';
import DashBoard from '@/components/units/dashBoard';

export default function MainPage() {
    const { uid } = useAuth();
    const { userInfo, setUserInfo } = useUserStore();

    if (uid && userInfo === undefined) {
        return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
    }

    return userInfo && userInfo.user === uid ? <Main /> : <DashBoard />;
}
