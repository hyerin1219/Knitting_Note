import { useState } from 'react';
import { IPatternItem } from '@/types';
import { useAlert } from '@/hooks/useAlert';
import { Button } from '@/components/ui/button';
import Alert from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

type IProps = {
    items: IPatternItem[];
    setItems: React.Dispatch<React.SetStateAction<IPatternItem[]>>;
};

export default function WritePattern({ items, setItems }: IProps) {
    // 단수
    const [rows, seRows] = useState<string>('1');
    // 설명
    const [text, setText] = useState<string>('');

    const { showAlert, alertValue, triggerAlert } = useAlert();

    // 최종 도안 입력하기
    const handleAdd = () => {
        const cleaned = text.trim();

        if (!rows) {
            triggerAlert('단을 입력해주세요.');
            return;
        }
        if (!text) {
            triggerAlert('설명을 추가해주세요.');
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
        // 초기화
        setText('');
        seRows('');
    };

    // 삭제하기
    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className=" bg-white p-4 rounded-xl  border border-gray-100 shadow-sm">
            <div className="space-y-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {/* rows */}
                <div className="">
                    <Input type="text" value={rows} onChange={(e) => seRows(e.target.value)} placeholder="1"></Input> 단
                </div>

                {/* 도안 */}
                <div className="flex items-center gap-3">
                    <Input value={text} onChange={(e) => setText(e.target.value)} type="text" className="flex-1" placeholder="예) 짧은뜨기 1번"></Input>

                    <Button type="button" size="sm" onClick={handleAdd}>
                        확인
                    </Button>
                </div>
            </div>

            <div className="mt-5 space-y-2 h-[300px] overflow-y-auto p-3">
                {items.length === 0 ? (
                    <p className="text-gray-400 text-sm">도안을 작성해 보세요.</p>
                ) : (
                    items.map((el) => (
                        <div key={el.id} className="p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                            <div>
                                <p className="font-bold">{el.rows} 단</p>
                                <p className="text-[#888]">{el.text}</p>
                            </div>

                            <div className="flex items-center justify-end gap-1">
                                <button type="button" className="" onClick={() => handleDelete(el.id)}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showAlert && <Alert alertValue={alertValue} />}
        </div>
    );
}
