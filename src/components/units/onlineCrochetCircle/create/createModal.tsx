'use client';
import Alert from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAlert } from '@/hooks/useAlert';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { ICrochetCircleItem } from '@/types';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    dialogRef: RefObject<HTMLDialogElement | null>;
}
export default function OnlineCrochetCircleCreateModal({ isOpen, setIsOpen, dialogRef }: IProps) {
    const router = useRouter();
    const { uid, user } = useAuth();
    const [room, setRoom] = useState({
        title: '',
        passwords: '',
    });

    const handleChange = (key: keyof ICrochetCircleItem, value: string) => {
        setRoom((prev) => ({ ...prev, [key]: value }));
    };

    // 방 만들기 로직
    const handleCreate = async () => {
        if (!uid) return;
        if (!room.title || !room.passwords) {
            // triggerAlert('모든 칸을 입력해주세요.');
            return;
        }

        try {
            const crochetCircle = collection(db, 'CrochetCircles');
            const docRef = await addDoc(crochetCircle, {
                roomManager: uid,
                ...room,
                member: [uid],
                memberCount: 1,
                createdAt: new Date().toLocaleDateString(),
            });

            router.push(`/onlineCrochetCircle/${docRef.id}`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
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

                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-center gap-2">
                                    <label className="">뜨개방 이름</label>
                                    <Input value={room.title} onChange={(el) => handleChange('title', el.target.value)} variant="full" type="text" placeholder="뜨개방 이름을 입력해 주세요." />
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <label className="">비밀번호</label>
                                    <Input value={room.passwords} onChange={(el) => handleChange('passwords', el.target.value)} variant="full" type="password" placeholder="비밀번호를 입력해 주세요." />
                                </div>
                            </div>

                            <Button onClick={handleCreate} className="block ml-auto">
                                방 만들기
                            </Button>
                        </div>
                    </motion.dialog>
                )}
            </AnimatePresence>
        </div>
    );
}
