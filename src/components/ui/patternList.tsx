'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib';
import { IPattern } from '@/types';

interface IProps {
    data: IPattern[];
}

export default function PatternCard({ data }: IProps) {
    return (
        <div className=" space-y-3">
            {data.map((el) => (
                <Link href={`/patterns/${el.id}`} key={el.id} className="group block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#8FD3C3] hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                        {/* 왼쪽 */}
                        <div className="flex flex-col">
                            <h3 className="text-base font-semibold text-gray-900 transition group-hover:text-[#8FD3C3]">{el.title}</h3>

                            <span className="mt-1 text-sm text-gray-500">{CATEGORIES.find((category) => category.value === el.category)?.label}</span>
                        </div>

                        {/* 오른쪽 */}
                        <span className="shrink-0 text-xs text-gray-400">{new Date(el.createdAt).toLocaleDateString()}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
