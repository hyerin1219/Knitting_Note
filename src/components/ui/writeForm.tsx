import { Dispatch, SetStateAction } from 'react';

import { CATEGORIES } from '@/lib';
import { IFormState } from '@/types';

import { SelectButtonGroup } from '@/components/ui/selectButton';
import { Input } from '@/components/ui/input';

interface IWriteFormProps {
    form: IFormState;
    setForm: Dispatch<SetStateAction<IFormState>>;
}

export default function WriteForm({ form, setForm }: IWriteFormProps) {
    const handleChange = (key: keyof IFormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div>
            <div className="text-xl space-y-6">
                {/* 제목 */}
                <div className="flex items-center gap-5">
                    <label className="shrink-0">제목</label>
                    <Input variant="full" value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="도안 제목을 입력하세요." />
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
            </div>
        </div>
    );
}
