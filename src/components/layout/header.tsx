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

                <button onClick={handleLogin}>로그인</button>
            </div>
        </header>
    );
}
