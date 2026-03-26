import { useRef } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { IimagePattern } from '@/types';
import { Button } from '@/components/ui/button';

type IProps = {
    data: IimagePattern[];
};

export default function ImagePattern({ data }: IProps) {
    const captureRef = useRef<HTMLDivElement>(null);

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
        <div className="p-2">
            {/* <Button onClick={() => setIsActive(true)}>크게보기</Button> */}
            <Button onClick={handleCapture} className="">
                이미지 저장하기
            </Button>

            <div className="w-full overflow-auto mt-3 py-2">
                <div ref={captureRef}>
                    {/* 코바늘 도안 형식에 맞게 순서 변경 */}
                    {[...data].reverse().map((el) => (
                        <div key={el.id} className="grid gap-1 justify-items-center mt-0.5" style={{ gridTemplateColumns: `repeat(${el.stitches.length}, 1fr)` }}>
                            {el.stitches.map((stitch, idx) => (
                                <img className=" " key={`${el.id}-${idx}`} alt={stitch} src={`/images/stitch/${stitch}.png`} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
