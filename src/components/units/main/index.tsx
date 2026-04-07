'use client';
import { Button } from '@/components/ui/button';
import PatternList from '@/components/ui/patternList';
import { useImagePattern } from '@/hooks/useImagePattern';
import { usePattern } from '@/hooks/usePattern';

import Link from 'next/link';

export default function Main() {
    const { data, loading } = usePattern();
    const { data: imageData, loading: imageLoading } = useImagePattern();
    return (
        <section className="Content">
            <h2 className="Title ">Patterns</h2>

            {/* 버튼 모음 */}
            <div className="flex items-center gap-3 mb-8">
                <Link className="bg-[#8FD3C3] text-white shadow-md hover:bg-[#7fcbbb] active:scale-[0.97] h-10 px-4 py-2 rounded-lg" href="/patterns/write">
                    서술 도안 작성하기
                </Link>
                <Link className="bg-[#8FD3C3] text-white shadow-md hover:bg-[#7fcbbb] active:scale-[0.97] h-10 px-4 py-2 rounded-lg" href="/ImagePatterns/write">
                    기호 도안 작성하기
                </Link>
            </div>

            {/* 서술 도안 */}
            <div>
                <h3 className="text-2xl mb-2">서술 도안</h3>
                {loading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                        ))}
                    </div>
                ) : (
                    <PatternList type="written" data={data} />
                )}
            </div>

            {/* 이미지 도안 */}
            <div className="mt-8">
                <h3 className="text-2xl mb-2">기호 도안</h3>
                {imageLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                        ))}
                    </div>
                ) : (
                    <PatternList type="image" data={imageData} />
                )}
            </div>
        </section>
    );
}
