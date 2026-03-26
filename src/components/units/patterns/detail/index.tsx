'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';

import { usePatternDetail } from '@/hooks/usePattern';
import { Button } from '@/components/ui/button';
import ImagePattern from './imagePattern';

import { IimagePattern } from '@/types';
import { CATEGORIES } from '@/lib';
import { db } from '@/lib/firebase';

export default function PatternsDetail() {
    const params = useParams();
    const id = params?.id as string;

    const { pattern, loading } = usePatternDetail(id);

    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const [imagePattern, setImagePattern] = useState<IimagePattern[] | null>(null);
    const [isConverting, setIsConverting] = useState(false);

    // 작업 단 체크
    const handleToggleComplete = (id: string) => {
        setCompletedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    };

    // 기호 도안 만들기
    const handleSignPatten = async () => {
        if (source || isConverting || !pattern) return;
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
            // if (!uid || !id) return;
            const docRef = doc(db, 'patterns', id);
            await updateDoc(docRef, {
                imagePattern: item.pattern,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsConverting(false);
        }
    };

    if (!pattern) return;

    const source = pattern?.imagePattern ?? imagePattern;

    return (
        <section className="Content">
            {/* 상단 카드 */}
            <div className="mx-auto rounded-2xl border border-[#8FD3C3]/30 bg-gradient-to-br from-[#F5FBF9] to-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">{pattern.title}</h2>
                <span className="mt-2 inline-block rounded-full bg-[#8FD3C3]/20 px-3 py-1 text-xs font-medium text-[#5FB8A6]">{CATEGORIES.find((el) => el.value === pattern.category)?.label}</span>
                <p className="mt-4 text-sm text-gray-600 whitespace-pre-line leading-relaxed">{pattern.content}</p>
                <Button
                    className={`mt-5 rounded-lg font-medium transition
                    ${source ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#8FD3C3] text-white hover:bg-[#7acbbb]'} `}
                    disabled={isConverting || !!source}
                    onClick={handleSignPatten}
                >
                    {source ? '기호 도안 생성 완료' : isConverting ? '변환중...' : '기호 도안으로 보기'}
                </Button>
            </div>

            {/* 작업 리스트 */}
            <div className="mt-6 space-y-3">
                {[...pattern.items].reverse().map((el) => {
                    const isDone = completedIds.includes(String(el.id));

                    return (
                        <div
                            key={el.id}
                            onClick={() => handleToggleComplete(String(el.id))}
                            className={` group cursor-pointer rounded-xl border p-4 transition
                            ${isDone ? 'bg-[#8FD3C3]/20 border-[#8FD3C3]' : 'bg-white border-gray-200 hover:shadow-sm'}  `}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className={` text-sm font-semibold  ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>{el.rows} 단</p>
                                    {!isDone && <p className="mt-1 text-sm text-gray-600">{el.text}</p>}
                                </div>

                                <div
                                    className={`mt-1 h-5 w-5 shrink-0 rounded-full border flex items-center justify-center
                                    ${isDone ? 'bg-[#8FD3C3] border-[#8FD3C3]' : 'border-gray-300 group-hover:border-[#8FD3C3]'}`}
                                >
                                    {isDone && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 기호 도안 */}
            {source && (
                <div className="mt-6 ">
                    <ImagePattern data={source} />
                </div>
            )}
        </section>
    );
}
