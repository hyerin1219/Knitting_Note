'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { IPattern } from '@/types';

export default function PatternsDetail() {
    const { uid } = useAuth();
    const params = useParams();
    const id = params?.id as string;

    const [pattern, setPattern] = useState<IPattern | null>(null);
    const [loading, setLoading] = useState(true);
    const [completedIds, setCompletedIds] = useState<string[]>([]);

    const toggleComplete = (id: string) => {
        setCompletedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    };

    useEffect(() => {
        if (!uid || !id) return;

        const fetchPattern = async () => {
            try {
                const docRef = doc(db, 'users', uid, 'patterns', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // setPattern(docSnap.data() as IPattern);
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

    if (loading) return <div className="p-4">로딩중...</div>;
    if (!pattern) return <div className="p-4">데이터 없음</div>;

    return (
        <section className="">
            {/* 상단 정보 */}
            <div className="">
                <h2 className="text-2xl font-bold">{pattern.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{pattern.category}</p>
                <p className="text-gray-600 mt-3 whitespace-pre-line">{pattern.content}</p>
            </div>

            {/* 도안 리스트 */}
            <div className="mt-5 space-y-2 h-[300px] overflow-y-auto">
                {pattern.itemPattern?.pattern?.map((el: any) => {
                    const isDone = completedIds.includes(String(el.id));

                    return (
                        <div
                            role="button"
                            key={el.id}
                            onClick={() => toggleComplete(String(el.id))}
                            className={`
                                cursor-pointer transition  p-4 rounded-xl  border border-gray-100 shadow-sm
                                ${isDone ? 'bg-[#8FD3C3]' : 'bg-white  hover:bg-gray-50'}
                            `}
                        >
                            <p className={`font-bold ${isDone ? 'line-through ' : 'text-gray-900'}`}>{el.id} 단</p>

                            {/* 설명 */}
                            <p className={`mt-1 ${isDone ? 'hidden' : ''}`}>{el.description}</p>

                            {/* stitches (핵심🔥) */}
                            {/* <div className="mt-2 flex flex-wrap gap-1">
                                {el.stitches.map((st: string, idx: number) => (
                                    <span key={idx} className="px-2 py-0.5 text-xs rounded bg-gray-100">
                                        {st}
                                    </span>
                                ))}
                            </div> */}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
