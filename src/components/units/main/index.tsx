'use client';

import Link from 'next/link';
import PatternList from '@/components/ui/patternList';
import { useImagePattern } from '@/hooks/useImagePattern';
import { usePattern } from '@/hooks/usePattern';
import { useGridPattern } from '@/hooks/useGridPattern';

export default function Main() {
    const { data, loading } = usePattern();
    const { data: imageData, loading: imageLoading } = useImagePattern();
    const { data: gridData, loading: gridLoading } = useGridPattern();

    console.log('data', data.length);
    console.log('imageData', imageData);
    console.log('gridData', gridData);

    return (
        <section className="Content">
            <h2 className="Title sr-only">도안</h2>

            {/* 버튼 모음 */}
            <div className="flex items-center gap-3 mb-8">
                <Link className="bg-[#8FD3C3] text-white shadow-md hover:bg-[#7fcbbb] active:scale-[0.97] h-10 px-4 py-2 rounded-lg" href="/patterns/write">
                    서술 도안 작성하기
                </Link>
                <Link className="bg-[#8FD3C3] text-white shadow-md hover:bg-[#7fcbbb] active:scale-[0.97] h-10 px-4 py-2 rounded-lg" href="/imagePatterns/write">
                    기호 도안 작성하기
                </Link>
                <Link className="bg-[#8FD3C3] text-white shadow-md hover:bg-[#7fcbbb] active:scale-[0.97] h-10 px-4 py-2 rounded-lg" href="/gridPatterns/write">
                    배색 도안 작성하기
                </Link>
            </div>

            {/* 서술 도안 */}
            <div className="flex items-start justify-between gap-2 mt-8 ">
                <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-center">서술 도안</h3>
                    {data.length !== 0 ? (
                        loading ? (
                            <div className="space-y-3">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                                ))}
                            </div>
                        ) : (
                            <PatternList type="written" data={data} />
                        )
                    ) : (
                        <div className="text-center text-[#999]">도안을 등록해 보세요.</div>
                    )}
                </div>

                {/* 이미지 도안 */}
                <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-center">기호 도안</h3>
                    {imageData.length !== 0 ? (
                        imageLoading ? (
                            <div className="space-y-3">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                                ))}
                            </div>
                        ) : (
                            <PatternList type="image" data={imageData} />
                        )
                    ) : (
                        <div className="text-center text-[#999]">도안을 등록해 보세요.</div>
                    )}
                </div>

                {/* 배색 도안 */}
                <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-center">배색 도안</h3>
                    {gridData.length !== 0 ? (
                        gridLoading ? (
                            <div className="space-y-3">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                                ))}
                            </div>
                        ) : (
                            <PatternList type="grid" data={gridData} />
                        )
                    ) : (
                        <div className="text-center text-[#999]">도안을 등록해 보세요.</div>
                    )}
                </div>
            </div>
        </section>
    );
}
