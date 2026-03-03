import Image from 'next/image';

export function Card(crochet: any) {
    console.log('crochet', crochet.crochet.patterns);
    return (
        <div
            role="button"
            className="group w-[220px] border-[3px] border-dashed border-[#8FD3C3] p-3 rounded-xl 
                        transition-all duration-300 ease-out cursor-pointer
                        hover:-translate-y-2 hover:shadow-xl hover:shadow-[#8FD3C3]/30"
        >
            {/* 이미지 영역 */}
            <div className="relative w-full h-[180px] overflow-hidden mb-3 rounded-lg">
                <Image src={'/images/image.png'} alt="" fill priority className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" />

                {/* 핀 버튼 */}
                <div
                    className="absolute top-3 right-3 flex items-center justify-center 
                                w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
                                transition-all duration-300 
                                opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                >
                    <button
                        className="w-6 h-6 
                                       bg-[url('/images/icons/icon_pin.png')] 
                                       bg-contain bg-center bg-no-repeat
                                       transition-transform duration-200
                                       hover:scale-110 active:scale-95"
                    />
                </div>
            </div>

            {/* 텍스트 영역 */}
            <div className="space-y-1 text-lg">
                <p className="text-xl font-semibold transition-colors duration-300 group-hover:text-[#5FBFAF]">Title</p>
                <p className="text-[#aaa]">코바늘 + 대바늘</p>
                <p className="text-gray-600">간단한 도안 설명글</p>
            </div>
        </div>
    );
}
