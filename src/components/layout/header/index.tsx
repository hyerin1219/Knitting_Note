'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Menu from './menu';

export default function Header() {
    const { user, isOpen, handleLogout, setIsOpen, handleLogin, loading } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="">
                <div className="flex items-center justify-between h-[50px]  text-[20px] px-2">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setOpen(true)} className="flex flex-col justify-between w-6 h-4">
                            <span className="block h-1 rounded bg-black"></span>
                            <span className="block h-1 rounded bg-black"></span>
                        </button>
                        <h1 className="w-30">
                            <Link href="/">
                                <img src="/images/logo.png" alt="stitch note" />
                            </Link>
                        </h1>
                    </div>
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
            <Menu open={open} onClose={() => setOpen(false)} />
        </>
    );
}
