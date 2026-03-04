'use client';

import { useState } from 'react';
import { RavelryCard } from '@/components/ui/ravelryCard';

interface IProps {
    initialData: {
        crochet: any[];
        knitting: any[];
    };
}

export default function RavelrySection({ initialData }: IProps) {
    // 0은 코바늘 1은 대바늘
    const [activeTab, setActiveTab] = useState(0);

    const categories = [
        { name: '코바늘', data: initialData.crochet },
        { name: '대바늘', data: initialData.knitting },
    ];

    const currentData = categories[activeTab].data;

    return (
        <section>
            {/* 타이틀 */}
            <h2 className="text-3xl mb-3 font-bold text-gray-800">ravelry 최신 도안 확인하기</h2>

            {/* 카테고리 버튼 */}
            <div className="flex items-center gap-3 mb-6">
                {categories.map((el, idx) => (
                    <button
                        key={el.name}
                        onClick={() => setActiveTab(idx)} // 클릭 시 인덱스 변경
                        className={`
              px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${activeTab === idx ? 'bg-[#8FD3C3] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-[#8FD3C3]/20'}
            `}
                    >
                        {el.name}
                    </button>
                ))}
            </div>

            {/* 카드 영역 */}
            <div className="flex items-center justify-around flex-wrap gap-6 w-full ">
                {currentData?.slice(0, 5).map((item: any) => (
                    <RavelryCard key={item.id} pattern={item} activeTab={activeTab} />
                ))}
                {currentData.length === 0 && <p className="col-span-full text-center py-10 text-gray-400">데이터가 없습니다.</p>}
            </div>
        </section>
    );
}
