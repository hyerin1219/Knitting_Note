'use client';

import { useState } from 'react';
import { type NeedleType, type Category } from '@/types';
import { SelectButtonGroup } from '@/components/ui/selectButton';

import { Button } from '@/components/ui/button';
import { CATEGORIES, NEEDLE_TYPES } from '@/lib';

type FormState = {
    title: string;
    content: string;
    needleSize: string;
    needleType: NeedleType | '';
    category: Category | '';
};

export default function PatternsWrite() {
    const [form, setForm] = useState<FormState>({
        title: '',
        needleSize: '',
        needleType: '',
        category: '',
        content: '',
    });

    const handleChange = (key: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section>
            <h2 className="text-3xl mb-8 text-center">코바늘 도안 작성하기</h2>

            <form onSubmit={handleSubmit}>
                <div className="text-xl space-y-6">
                    {/* 제목 */}
                    <div className="flex items-center gap-5">
                        <label className="shrink-0">제목</label>
                        <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="도안 제목을 입력하세요." className="w-full py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40" />
                    </div>

                    {/* 바늘 크기 */}
                    {/* <div className="flex items-center gap-5">
                        <label className="shrink-0">바늘 크기</label>
                        <div>
                            <input value={form.needleSize} onChange={(e) => handleChange('needleSize', e.target.value)} placeholder="예) 3.5" className="w-24 py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40 mr-1" />
                            mm
                        </div>
                    </div> */}

                    {/* 설명 */}
                    {/* <div className="">
                        <label className="shrink-0">설명</label>
                        <textarea value={form.content} onChange={(e) => handleChange('content', e.target.value)} placeholder="도안 설명을 적어주세요." className="w-full py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40" />
                    </div> */}

                    {/* 바늘 종류 */}
                    {/* <div>
                        <p className="mb-2">바늘 종류</p>
                        <SelectButtonGroup options={NEEDLE_TYPES} value={form.needleType} onChange={(val) => handleChange('needleType', val)} />
                    </div> */}

                    {/* 카테고리 */}
                    <div>
                        <p className="mb-2">카테고리</p>
                        <SelectButtonGroup options={CATEGORIES} value={form.category} onChange={(val) => handleChange('category', val)} />
                    </div>

                    {/* 도안 */}
                    <div className="">
                        <p className="mb-2">도안</p>
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
