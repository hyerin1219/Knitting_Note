'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { IimagePattern, IPattern } from '@/types';
import { Button } from '@/components/ui/button';
import ImagePattern from './imagePattern';

export default function PatternsDetail() {
    const { uid } = useAuth();
    const params = useParams();
    const id = params?.id as string;

    const [pattern, setPattern] = useState<IPattern | null>(null);
    const [loading, setLoading] = useState(true);
    const [completedIds, setCompletedIds] = useState<string[]>([]);

    const [imagePattern, setImagePattern] = useState<IimagePattern[] | null>(null);
    const [isConverting, setIsConverting] = useState(false);

    const handleToggleComplete = (id: string) => {
        setCompletedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    };

    useEffect(() => {
        if (!uid || !id) return;

        const fetchPattern = async () => {
            try {
                const docRef = doc(db, 'users', uid, 'patterns', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPattern(docSnap.data() as IPattern);
                }
            } catch (error) {
                console.error('데이터 로딩 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPattern();
    }, [uid, id]);

    const handleSignPatten = async () => {
        if (!pattern) return;

        setIsConverting(true);
        try {
            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: pattern.items }),
            });

            const item = await res.json();

            setImagePattern(item.pattern);
        } catch (error) {
            console.error(error);
        } finally {
            setIsConverting(false);
        }
    };

    if (loading) return <div className="p-4">로딩중...</div>;
    if (!pattern) return <div className="p-4">데이터 없음</div>;

    return (
        <section className="">
            {/* 상단 정보 */}
            <div className="mb-2">
                <h2 className="text-2xl font-bold">{pattern.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{pattern.category}</p>
                <p className="text-gray-600 mt-3 whitespace-pre-line">{pattern.content}</p>
            </div>

            <Button className="block ml-auto" onClick={handleSignPatten}>
                기호 도안으로 보기
            </Button>

            {/* 도안 리스트 */}
            <div className="flex items-start justify-center gap-2 mt-4">
                <div className="shrink-0 mt-2 space-y-2  w-[49%] h-[450px] overflow-y-auto">
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
                {imagePattern && <ImagePattern data={imagePattern} />}
            </div>
        </section>
    );
}
