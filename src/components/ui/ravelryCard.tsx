import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { IRavelryPattern } from '@/types';
import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

export function RavelryCard({ pattern, activeTab, RavelryBookmarks }: { pattern: IRavelryPattern; activeTab: number; RavelryBookmarks: string[] }) {
    const isActive = RavelryBookmarks.includes(String(pattern.id));

    const { user } = useAuth();

    const handlePinClick = async (patternData: IRavelryPattern) => {
        if (!user) {
            window.alert('로그인 하셍요');
            return;
        }

        const docRef = doc(db, 'RavelryBookmarks', user.uid, 'patterns', `${patternData.id}`);

        try {
            if (isActive) {
                await deleteDoc(docRef);
            } else {
                await setDoc(docRef, {
                    ravelry_id: patternData.id,
                    name: patternData.name,
                    image: patternData.first_photo?.medium_url || '',
                    link: patternData.permalink,
                    craft_type: activeTab === 0 ? 'crochet' : 'knitting',
                    createdAt: serverTimestamp(),
                });
            }
        } catch (error) {
            console.error('Firestore 저장 실패:', error);
        }
    };

    const handleCardClick = (permalink: string) => {
        window.open(`https://www.ravelry.com/patterns/library/${permalink}`, '_blank');
    };

    return (
        <div
            onClick={() => handleCardClick(pattern.permalink)}
            role="button"
            className="group w-[220px] border-[3px] border-dashed border-[#8FD3C3] p-3 rounded-xl 
                        transition-all duration-300 ease-out cursor-pointer bg-white
                        hover:-translate-y-2 hover:shadow-xl hover:shadow-[#8FD3C3]/30"
        >
            <div className="relative w-full h-[180px] overflow-hidden mb-3 rounded-lg ">
                <img src={pattern.first_photo?.medium_url || '/api/placeholder/400/300'} alt={pattern.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePinClick(pattern);
                    }}
                    className={`absolute top-3 right-3 flex items-center justify-center 
                                w-9 h-9 rounded-full transition-all duration-300 shadow-sm
                                ${
                                    isActive ? 'bg-[#8FD3C3] opacity-100 scale-100' : 'bg-white/90 backdrop-blur-sm opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100' // 기본: 호버 시 노출
                                }`}
                >
                    <button
                        className={`w-6 h-6 bg-[url('/images/icons/icon_pin.png')] bg-contain bg-center bg-no-repeat
                                   transition-transform duration-200 
                                   ${isActive ? 'brightness-0 invert' : 'hover:scale-110'}`}
                    />
                </div>
            </div>

            {/* 텍스트 영역 */}
            <div className="space-y-1">
                <p className="text-xl font-medium truncate" title={pattern.name}>
                    {pattern.name}
                </p>
                <p className="text-[#aaa] text-sm">{activeTab === 0 ? '코바늘' : '대바늘'}</p>
            </div>
        </div>
    );
}
