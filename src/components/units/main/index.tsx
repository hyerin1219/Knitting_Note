import { Card } from '@/components/ui/card';
import { fetchPatternsByCraft } from '@/lib/api/ravelry';

export default async function Main() {
    const crochet = await fetchPatternsByCraft('crochet');

    const Category = [{ name: '코바늘+대바늘' }, { name: '코바늘' }, { name: '대바늘' }];

    return (
        <section className="">
            {/* 타이틀 */}
            <h2 className="text-3xl  mb-6">최신 도안 확인하기</h2>

            {/* 카테고리 */}
            <div className="flex items-center gap-3 mb-8">
                {Category.map((el, idx) => (
                    <button
                        key={el.name}
                        className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-300
              ${idx === 0 ? 'bg-[#8FD3C3] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-[#8FD3C3]/20 hover:scale-105'}
            `}
                    >
                        {el.name}
                    </button>
                ))}
            </div>

            {/* 카드 영역 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card crochet={crochet} />
            </div>
        </section>
    );
}
