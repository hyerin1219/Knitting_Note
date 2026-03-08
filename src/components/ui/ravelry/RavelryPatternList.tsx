'use client';

import { useState, useEffect } from 'react';
import { RavelryCard } from './ravelryCard';
import { usePatterns } from '@/hooks/useRavelry';
import { useRavelryBookmarks } from '@/hooks/useRavelryBookmarks';
import { IRavelryPattern } from '@/types';
import { Button } from '@/components/ui/button';

interface RavelryPatternListProps {
    itemCount?: number;
    pagination?: boolean;
}

export function RavelryPatternList({ itemCount = 10, pagination = false }: RavelryPatternListProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [page, setPage] = useState(1);

    const { data: RavelryBookmarks = [] } = useRavelryBookmarks();
    const { data: crochet, isLoading: isLoadingCrochet, isError: isErrorCrochet, refetch: refetchCrochet } = usePatterns('crochet');
    const { data: knitting, isLoading: isLoadingKnitting, isError: isErrorKnitting, refetch: refetchKnitting } = usePatterns('knitting');

    const categories = [{ name: '코바늘' }, { name: '대바늘' }];
    const currentData = activeTab === 0 ? crochet : knitting;

    const isLoading = isLoadingCrochet || isLoadingKnitting;
    const isError = isErrorCrochet || isErrorKnitting;

    // page 관련
    const totalPages = Math.ceil((currentData?.length || 0) / itemCount) || 1;
    const paginatedData = pagination ? currentData?.slice((page - 1) * itemCount, page * itemCount) : currentData?.slice(0, itemCount);

    useEffect(() => {
        setPage(1);
    }, [activeTab]);

    const hasData = (currentData?.length || 0) > 0;

    return (
        <section>
            <div className="flex items-center gap-3 mb-5">
                {categories.map((el, idx) => (
                    <button
                        key={el.name}
                        onClick={() => setActiveTab(idx)}
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300
                        ${activeTab === idx ? 'bg-[#8FD3C3] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-[#8FD3C3] hover:text-white'}`}
                    >
                        {el.name}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-around flex-wrap gap-6 w-full min-h-[220px]">
                {/* 로딩중 */}
                {isLoading && (
                    <>
                        {Array.from({ length: Math.min(itemCount, 8) }).map((_, idx) => (
                            <div key={idx} className="w-[220px] h-[240px] rounded-xl border-[3px] border-dashed border-[#8FD3C3]/40 bg-gray-100 animate-pulse" />
                        ))}
                    </>
                )}

                {!isLoading && !isError && hasData && paginatedData?.map((item: IRavelryPattern) => <RavelryCard RavelryBookmarks={RavelryBookmarks} key={item.id} pattern={item} activeTab={activeTab} />)}
            </div>

            {/* pagination */}
            {pagination && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 text-white">
                    <Button size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                        이전
                    </Button>
                    <span className="px-4 py-2 text-gray-600">
                        {page} / {totalPages}
                    </span>
                    <Button size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                        다음
                    </Button>
                </div>
            )}
        </section>
    );
}
