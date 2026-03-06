'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Header() {
    const { user, isOpen, handleLogout, setIsOpen, handleLogin, loading } = useAuth();
    return (
        <header className="">
            <div className="flex items-center justify-between h-[50px]  text-[20px] px-2">
                <h1 className="text-[25px]">
                    <Link href="/">Knitting Note</Link>
                </h1>
                {user ? (
                    <div className="flex items-center gap-1">
                        <p>{user.displayName} 님</p>
                        <button className="text-sm" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <button onClick={handleLogin}>로그인</button>
                )}
            </div>
        </header>
    );
}
