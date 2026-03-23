import { CrochetSymbol } from '@/lib';
import { IimagePattern } from '@/types';
import Image from 'next/image';
type IProps = {
    data: IimagePattern[];
};

export default function ImagePattern({ data }: IProps) {
    return (
        <div className="space-y-2 w-[49%]">
            {data.map((el) => (
                <div key={el.id}>
                    <div className="flex gap-1">
                        {el.stitches.map((stitch, idx) => (
                            <Image key={idx} src={`/images/stitch/${stitch}.png`} alt={stitch} width={24} height={24} className="object-contain" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
