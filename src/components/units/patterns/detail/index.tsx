'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import { usePattern } from '@/hooks/usePattern';
import { Button } from '@/components/ui/button';
import ImagePattern from './imagePattern';
import { doc, updateDoc } from 'firebase/firestore';

import { IimagePattern } from '@/types';
import { CATEGORIES } from '@/lib';
import { db } from '@/lib/firebase';

export default function PatternsDetail() {
    const { uid } = useAuth();
    const params = useParams();
    const id = params?.id as string;

    const [completedIds, setCompletedIds] = useState<string[]>([]);

    const [imagePattern, setImagePattern] = useState<IimagePattern[] | null>(null);
    const [isConverting, setIsConverting] = useState(false);

    const { pattern, loading } = usePattern(uid, id);

    // 작업 단 체크
    const handleToggleComplete = (id: string) => {
        setCompletedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    };

    // 기호 도안 만들기
    const handleSignPatten = async () => {
        if (!pattern) return;
        if (imagePattern) return;

        setIsConverting(true);
        try {
            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: pattern.items }),
            });

            const item = await res.json();

            setImagePattern(item.pattern);

            // ai 결과 값 저장
            if (!uid || !id) return;
            const docRef = doc(db, 'users', uid, 'patterns', id);
            await updateDoc(docRef, {
                imagePattern: item.pattern,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsConverting(false);
        }
    };

    if (loading) return <div className="p-4">로딩중...</div>;
    if (!pattern) return;

    const source = pattern.imagePattern ?? imagePattern;

    return (
        <section className="size-full">
            {/* 상단 정보 */}
            <div className="mb-2">
                <h2 className="text-2xl font-bold">{pattern.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{CATEGORIES.find((el) => el.value === pattern.category)?.label}</p>
                <p className="text-gray-600 mt-3 whitespace-pre-line">{pattern.content}</p>
            </div>

            <Button className="block ml-auto" disabled={isConverting || !!source} onClick={handleSignPatten}>
                {source ? '기호 도안 생성 완료' : isConverting ? '변환중...' : '기호 도안으로 보기'}
            </Button>

            {/* 도안 리스트 */}
            <div className="flex items-start justify-center gap-2  mt-4">
                <div className={`shrink-0 mt-2 space-y-2  min-h-[450px] overflow-y-auto p-2 ${source ? 'w-[35%]' : 'w-full'} `}>
                    {pattern.items.map((el) => {
                        const isDone = completedIds.includes(String(el.id));

                        return (
                            <div
                                role="button"
                                key={el.id}
                                onClick={() => handleToggleComplete(String(el.id))}
                                className={`
                                cursor-pointer transition  p-4 rounded-xl  border border-gray-100 shadow-sm
                                ${isDone ? 'bg-[#8FD3C3]' : 'bg-white  hover:bg-gray-50'}
                            `}
                            >
                                <p className={`font-bold ${isDone ? 'line-through ' : 'text-gray-900'}`}>{el.rows} 단</p>

                                {/* 설명 */}
                                <p className={`mt-1 ${isDone ? 'hidden' : ''}`}>{el.text}</p>
                            </div>
                        );
                    })}
                </div>
                {source && <ImagePattern data={source} />}
            </div>
        </section>
    );
}
