'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import WritePattern from './writePattern';

import { SelectButtonGroup } from '@/components/ui/selectButton';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/hooks/useAuth';

import { CATEGORIES } from '@/lib';
import { db } from '@/lib/firebase';
import { IPatternTextItem, IFormState, IPattern } from '@/types';
import { useRouter } from 'next/navigation';
import WriteImagePattern from './writeImagePattern';

export default function PatternsWrite() {
    const { uid } = useAuth();
    const [items, setItems] = useState<IPatternTextItem[]>([]);
    const [form, setForm] = useState<IFormState>({
        title: '',
        category: '',
        content: '',
    });
    const router = useRouter();

    const handleChange = (key: keyof IFormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!uid) return;

        try {
            const patternRef = collection(db, 'patterns');

            const docRef = await addDoc(patternRef, {
                author: uid,
                ...form,
                items,
                createdAt: new Date().toLocaleDateString(),
            });

            router.push(`/patterns/${docRef.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="Content">
            <h2 className="Title  mb-8">코바늘 도안 작성하기</h2>

            <form onSubmit={handleSubmit}>
                <div className="text-xl space-y-6">
                    {/* 제목 */}
                    <div className="flex items-center gap-5">
                        <label className="shrink-0">제목</label>
                        <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="도안 제목을 입력하세요." className="w-full py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40" />
                    </div>

                    {/* 설명 */}
                    <div className="">
                        <label className="shrink-0">설명</label>
                        <textarea value={form.content} onChange={(e) => handleChange('content', e.target.value)} placeholder="도안 설명을 적어주세요." className="w-full py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40" />
                    </div>

                    {/* 카테고리 */}
                    <div>
                        <p className="mb-2">카테고리</p>
                        <SelectButtonGroup options={CATEGORIES} value={form.category} onChange={(val) => handleChange('category', val)} />
                    </div>

                    {/* 도안 */}
                    <div className="">
                        <p className="mb-2">도안</p>
                        {/* <WritePattern items={items} setItems={setItems} /> */}
                        <WriteImagePattern items={items} setItems={setItems} />
                    </div>

                    {/* 버튼 */}
                    <div>
                        <Button type="submit">등록</Button>
                    </div>
                </div>
            </form>
        </section>
    );
}
