'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import WritePatternImage from './writePatternImage';
import WriteForm from '../writeForm';

import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/hooks/useAlert';
import { db } from '@/lib/firebase';
import { IPatternItem, IFormState, IPatternImageItem } from '@/types';

import { Button } from '@/components/ui/button';
import Alert from '@/components/ui/alert';

export default function PatternsWriteImage() {
    const { uid } = useAuth();
    const { showAlert, alertValue, triggerAlert } = useAlert();

    const [items, setItems] = useState<IPatternImageItem[]>([]);
    const [form, setForm] = useState<IFormState>({
        title: '',
        category: '',
        content: '',
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!uid) return;

        if (!form.title || !form.category || !form.content || !items) {
            triggerAlert('모든 칸을 입력해주세요.');
            return;
        }

        try {
            const patternRef = collection(db, 'ImagePatterns');

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
                    <WriteForm form={form} setForm={setForm} />

                    {/* 도안 */}
                    <div className="">
                        <p className="mb-2">도안</p>

                        <WritePatternImage key="text" items={items} setItems={setItems} />
                    </div>

                    {/* 버튼 */}
                    <Button type="submit">등록</Button>
                </div>
            </form>

            {showAlert && <Alert alertValue={alertValue} />}
        </section>
    );
}
