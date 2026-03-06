'use client';
import { RavelryCard } from '@/components/ui/ravelryCard';
import { usePatterns } from '@/hooks/useRavelry';
import { useRavelryBookmarks } from '@/hooks/useRavelryBookmarks';
import { IRavelryPattern } from '@/types';
import { useState } from 'react';

export default function Ravelry() {
    const [activeTab, setActiveTab] = useState(0);

    const { data: crochet } = usePatterns('crochet');
    const { data: knitting } = usePatterns('knitting');

    const categories = [{ name: '코바늘' }, { name: '대바늘' }];
    const currentData = activeTab === 0 ? crochet : knitting;

    const { data: RavelryBookmarks = [] } = useRavelryBookmarks();

    return (
        <section>
            <h2 className="text-3xl mb-3">ravelry 도안 살펴보기</h2>
            <div className="flex items-center gap-3 mb-5">
                {categories.map((el, idx) => (
                    <button
                        key={el.name}
                        onClick={() => setActiveTab(idx)}
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300
            ${activeTab === idx ? 'bg-[#8FD3C3] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-[#8FD3C3]/20'}`}
                    >
                        {el.name}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-around flex-wrap gap-6 w-full">
                {currentData?.slice(0, 10).map((item: IRavelryPattern) => (
                    <RavelryCard RavelryBookmarks={RavelryBookmarks} key={item.id} pattern={item} activeTab={activeTab} />
                ))}
            </div>
        </section>
    );
}
