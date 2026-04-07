'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib';
import { IPattern, IImagePattern } from '@/types';

type IProps = { type: 'written'; data: IPattern[] } | { type: 'image'; data: IImagePattern[] };

export default function PatternCard({ data, type }: IProps) {
    return (
        <div className="space-y-3">
            {data.map((el) => (
                <Link key={el.id} href={type === 'written' ? `/patterns/${el.id}` : `/imagePatterns/${el.id}`} className="w-full group flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#8FD3C3] hover:shadow-md">
                    {/* 왼쪽 */}
                    <p className="flex flex-col">
                        <span className="text-base font-semibold text-gray-900 transition group-hover:text-[#8FD3C3]">{el.title}</span>

                        <span className="mt-1 text-sm text-gray-500">{CATEGORIES.find((category) => category.value === el.category)?.label}</span>
                    </p>

                    {/* 오른쪽 */}
                    <span className="flex flex-col shrink-0 text-xs text-gray-400">{new Date(el.createdAt).toLocaleDateString()}</span>
                </Link>
            ))}
        </div>
    );
}
