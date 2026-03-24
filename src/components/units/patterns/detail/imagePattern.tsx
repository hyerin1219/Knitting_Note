import { useRef, useState } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { IimagePattern } from '@/types';
import { Button } from '@/components/ui/button';

type IProps = {
    data: IimagePattern[];
};

export default function ImagePattern({ data }: IProps) {
    const captureRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // 캠쳐 함수
    const handleCapture = async () => {
        if (!captureRef.current) return;

        const el = captureRef.current;

        const canvas = await html2canvas(el, {
            backgroundColor: '#ffffff',
            scale: 2,
            width: el.scrollWidth,
            height: el.scrollHeight,
        });

        const image = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'pattern.png';
        link.click();
    };

    return (
        <div className="w-[62%]">
            <Button onClick={() => setIsActive(true)}>크게보기</Button>
            <div className="w-full overflow-x-auto p-2">
                {data.map((el) => (
                    <div key={el.id} className="flex gap-1 min-w-max">
                        {el.stitches.map((stitch, idx) => (
                            <img className="inline-block  w-5 shrink-0" key={`${el.id}-${idx}`} alt={stitch} src={`/images/stitch/${stitch}.png`} />
                            // <Image key={`${el.id}-${idx}`} src={`/images/stitch/${stitch}.png`} alt={stitch} width={20} height={20} className="object-contain" />
                        ))}
                    </div>
                ))}
            </div>

            {/* 배경 오버레이 */}
            <div
                className={`fixed flex items-center justify-center  inset-0 bg-black/40 transition-opacity duration-300
                ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="bg-white rounded p-3 max-w-[90%] max-h-[90%] overflow-x-auto overflow-y-auto">
                    <div className="flex items-center justify-between gap-2 mb-5">
                        <Button onClick={handleCapture} className="">
                            이미지 저장하기
                        </Button>
                        <Button onClick={() => setIsActive(false)} variant="close">
                            닫기
                        </Button>
                    </div>

                    <div ref={captureRef}>
                        {data.map((el) => (
                            <div key={el.id} className="flex gap-1 min-w-max">
                                {el.stitches.map((stitch, idx) => (
                                    <img className="inline-block w-10 shrink-0" key={`${el.id}-${idx}`} alt={stitch} src={`/images/stitch/${stitch}.png`} />
                                    // <Image key={`${el.id}-${idx}`} src={`/images/stitch/${stitch}.png`} alt={stitch} width={20} height={20} className="object-contain" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
