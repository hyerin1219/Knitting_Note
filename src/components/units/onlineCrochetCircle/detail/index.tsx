'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useCrochetCircleDetail } from '@/hooks/useCrochetCircle';
import { Input } from '@/components/ui/input';

export default function OnlineCrochetCircleDetail() {
    const params = useParams();
    const id = params?.id as string;
    const { user, uid } = useAuth();
    const { crochetCircle, loading } = useCrochetCircleDetail(id);

    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        await fetch('/api/chat/send', {
            method: 'POST',
            body: JSON.stringify({
                text: input,
                roomId: crochetCircle?.id,
                senderId: uid,
                // senderName: '치즈고양이',
                // senderImage: '/images/cat_profile.png',
            }),
        });

        setInput(''); // 입력창 초기화
    };

    if (!crochetCircle) return;
    return (
        <section className="Content ">
            <h2 className="Title">{crochetCircle.title}</h2>
            <div>
                <span>뜨개방 개설일 : {crochetCircle.createdAt}</span>
                <span>뜨개방 인원 : {crochetCircle.memberCount}명</span>
            </div>

            <article className="relative w-full">
                <img className="absolute left-1/2 top-[-50px] -translate-x-1/2 w-50 opacity-80" src="/images/img_lamp.png" alt="조명" />

                {/* 채팅 내역 */}
                <div className="relative w-full h-130 border border-3 rounded-xl overflow-hidden mt-5 p-3 ">
                    <div className="w-full h-full overflow-y-auto">
                        <img className="absolute bottom-[-700px] w-full opacity-80" src="/images/img_desk2.png" alt="책상" />
                    </div>
                </div>

                {/* 채팅창 */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <div className="flex items-center justify-center gap-2 w-full ">
                        <Input type="text" variant="full" placeholder="채팅을 입력하세요." value={input} onChange={(e) => setInput(e.target.value)} />
                        <Button onClick={sendMessage}>입력</Button>
                    </div>

                    <div className="relative shrink-0 w-30 h-30 rounded-full bg-[var(--color01)] shadow-md p-3">
                        <img className="w-full h-full object-contain" src={`/images/char/char_cat.png`} alt="캐릭터" />
                    </div>
                </div>
            </article>
        </section>
    );
}
