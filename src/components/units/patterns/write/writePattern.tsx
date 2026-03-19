import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IPatternTextItem } from '@/types';

type IProps = {
    items: IPatternTextItem[];
    setItems: React.Dispatch<React.SetStateAction<IPatternTextItem[]>>;
};

export default function WritePattern({ items, setItems }: IProps) {
    const reactId = useId();
    const [rows, seRows] = useState<string>('1');
    const [text, setText] = useState<string>('');

    const handleAdd = () => {
        const cleaned = text.trim();

        if (!cleaned) return;

        setItems((prev) => [
            ...prev,
            {
                id: `${reactId}-${Date.now()}-${prev.length}`,
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

    return (
        <div className=" bg-white p-4 rounded-xl  border border-gray-100 shadow-sm">
            <div className="space-y-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1 ">
                    <input type="text" value={rows} onChange={(e) => seRows(e.target.value)} placeholder="1" className="w-20 py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40" />단
                </div>

                <div className="flex items-center gap-3">
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="예 (짧은뜨기 3번 늘려뜨기 2번) 3번 반복" className="flex-1 py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40" />
                    <Button type="button" size="sm" onClick={handleAdd}>
                        확인
                    </Button>
                </div>
            </div>

            <div className="mt-5 space-y-2 h-[300px] overflow-y-auto">
                {items.length === 0 ? (
                    <p className="text-gray-400 text-sm">아직 추가된 도안이 없어요.</p>
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
        </div>
    );
}
