import { useId, useState } from 'react';
import { IPatternTextItem } from '@/types';
import { useAlert } from '@/hooks/useAlert';
import { Button } from '@/components/ui/button';
import Alert from '@/components/ui/alert';
import { CrochetSymbol } from '@/lib';
import { useRef } from 'react';
import { Input } from '@/components/ui/input';

type IProps = {
    items: IPatternTextItem[];
    setItems: React.Dispatch<React.SetStateAction<IPatternTextItem[]>>;
};

export default function WriteImagePattern({ items, setItems }: IProps) {
    const [rows, seRows] = useState<string>('1');
    const [counts, seCounts] = useState<string>('1');
    const [text, setText] = useState<string>('');
    const { showAlert, alertValue, triggerAlert } = useAlert();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        const cleaned = text.trim();

        if (!rows) {
            triggerAlert('단을 입력해주세요.');
            return;
        }
        if (!text) {
            triggerAlert('설명을 입력해주세요.');
            return;
        }
        setItems((prev) => [
            ...prev,
            {
                id: `${Date.now()}`,
                rows,
                text: cleaned,
            },
        ]);

        setText('');
        seRows('');
    };

    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddSymbol = (value: string) => {
        setText((prev) => prev + value);
    };

    return (
        <div className=" bg-white p-4 rounded-xl  border border-gray-100 shadow-sm">
            <div className="space-y-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {/* 코바늘 기술 예시 */}
                <div className="flex items-center  flex-wrap gap-2">
                    {CrochetSymbol.map((el) => (
                        <Button onClick={() => handleAddSymbol(el.label)} className="relative rounded-full group" key={el.label}>
                            <span> {el.value}</span>
                            <span className="absolute top-[110%] left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded z-[1]">
                                {el.label}
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-black " />
                            </span>
                        </Button>
                    ))}
                </div>

                {/* rows */}
                <div className="flex items-center gap-1 ">
                    <Input type="text" value={rows} onChange={(e) => seRows(e.target.value)} placeholder="1"></Input>
                </div>

                {/* 도안 */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        {/* 기술 */}
                        <Input ref={inputRef} type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-50" placeholder="짧은뜨기"></Input>
                        <Input type="number" value={counts} onChange={(e) => seCounts(e.target.value)} placeholder="1"></Input>
                    </div>
                    <Button type="button" size="sm">
                        추가
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Input readOnly type="text" variant="readyOnly" className="flex-1" placeholder=""></Input>
                    <Button type="button" size="sm" onClick={handleAdd}>
                        확인
                    </Button>
                </div>
            </div>

            <div className="mt-5 space-y-2 h-[300px] overflow-y-auto">
                {items.length === 0 ? (
                    <p className="text-gray-400 text-sm">도안을 작성해 보세요.</p>
                ) : (
                    items.map((el) => (
                        <div key={el.id} className="p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                            <div>
                                <p className="font-bold">{el.rows} 단</p>
                                <p className="text-gray-600">{el.text}</p>
                            </div>

                            <button className="block ml-auto" onClick={() => handleDelete(el.id)}>
                                삭제
                            </button>
                        </div>
                    ))
                )}
            </div>

            {showAlert && <Alert alertValue={alertValue} />}
        </div>
    );
}
