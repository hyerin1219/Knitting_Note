'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function OnlineCrochetCircle() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [passwords, setPassword] = useState('');
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOpenModal = () => {
        setIsOpen(true);
        // 애니메이션 시작과 동시에 브라우저 기본 모달 기능을 켭니다.
        dialogRef.current?.showModal();
    };
    return (
        <section className="Content">
            <h2 className="Title  mb-8"> 온라인 뜨개방</h2>

            <Button onClick={handleOpenModal}>뜨개방 만들기</Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.dialog
                        ref={dialogRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="
                            fixed inset-0 m-auto 
                            rounded-2xl shadow-2xl p-3 
                            backdrop:bg-black/60 
                        "
                    >
                        <div className="w-[90vw] max-w-[400px] bg-white overflow-hidden">
                            <div className="flex justify-between items-center p-5 ">
                                <h3 className="text-lg ">새 뜨개방 만들기</h3>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                                    닫기
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-center gap-2">
                                    <label className="">뜨개방 이름</label>
                                    <Input value={title} onChange={(el) => setTitle(el.target.value)} variant="full" type="text" placeholder="뜨개방 이름을 입력해 주세요." />
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <label className="">비밀번호</label>
                                    <Input value={passwords} onChange={(el) => setPassword(el.target.value)} variant="full" type="password" placeholder="뜨개방 비밀번호를 입력해 주세요." />
                                </div>
                            </div>

                            <Button className="block ml-auto">방 만들기</Button>
                        </div>
                    </motion.dialog>
                )}
            </AnimatePresence>
        </section>
    );
}
