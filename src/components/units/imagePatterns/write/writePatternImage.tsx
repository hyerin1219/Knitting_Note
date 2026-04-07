import { useState } from 'react';

import { IPatternImageItem } from '@/types';
import { CrochetSymbol } from '@/lib';
import { useAlert } from '@/hooks/useAlert';
import { Button } from '@/components/ui/button';
import Alert from '@/components/ui/alert';

type IProps = {
    items: IPatternImageItem[];
    setItems: React.Dispatch<React.SetStateAction<IPatternImageItem[]>>;
};

export default function WritePatternImage({ items, setItems }: IProps) {
    const [rows, setRows] = useState<{ id: string; symbols: string[] }[]>([{ id: `${Date.now()}`, symbols: [] }]);

    const { showAlert, alertValue, triggerAlert } = useAlert();

    // 최종 도안 입력하기
    const handleAdd = () => {
        const isEmpty = rows.every((row) => row.symbols.length === 0);

        if (isEmpty) {
            triggerAlert('도안을 입력해주세요.');
            return;
        }

        setItems((prev) => [...prev, ...rows]);

        setRows([{ id: `${Date.now()}`, symbols: [] }]);
    };

    // 삭제하기
    const handleRemoveSymbol = (rowIdx: number, symbolIdx: number) => {
        setRows((prev) =>
            prev.map((row, i) =>
                i === rowIdx
                    ? {
                          ...row,
                          symbols: row.symbols.filter((_, j) => j !== symbolIdx),
                      }
                    : row
            )
        );
    };

    // 단 추가
    const handleAddSymbol = (value: string) => {
        setRows((prev) => {
            const newRows = [...prev];
            const last = newRows[newRows.length - 1];

            newRows[newRows.length - 1] = {
                ...last,
                symbols: [...last.symbols, value],
            };

            return newRows;
        });
    };

    // 확인
    const handleAddRow = () => {
        setRows((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, symbols: [] }]);
    };

    return (
        <div className="bg-white p-4 rounded-xl  border border-gray-100 shadow-sm">
            <div className="flex justify-between gap-2">
                {/* 코바늘 기술 예시 */}
                <div className="grid grid-cols-3  gap-2  p-2">
                    {CrochetSymbol.map((el) => (
                        <button type="button" onClick={() => handleAddSymbol(el.label)} className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full group bg-[var(--color02)]" key={el.label}>
                            <img className="w-full h-full object-contain" src={`/images/stitch/${el.label}.png`} alt="" />
                            <span className="absolute top-[110%] left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded z-[1]">
                                {el.value}
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-black " />
                            </span>
                        </button>
                    ))}
                </div>

                {/* 단수 */}
                <div className="flex-1 space-y-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex flex-col gap-2">
                        {rows.map((row, rowIdx) => (
                            <div key={rowIdx} className="flex items-center gap-2">
                                {/* 단수 */}
                                <span className="text-sm text-gray-500 w-6">{rowIdx + 1}단</span>

                                {/* 심볼 */}
                                <div className="flex items-center gap-1 flex-wrap">
                                    {row.symbols.map((el, idx) => (
                                        <div key={idx}>
                                            <p className="text-center text-sm">{idx + 1}</p>

                                            <div className="relative w-10 h-10 p-1 rounded bg-gray-100 group">
                                                <button type="button" onClick={() => handleRemoveSymbol(rowIdx, idx)} className="absolute -top-1 -right-1 w-4 h-4 text-xs text-center leading-[18px] bg-black text-white rounded-full hidden group-hover:block">
                                                    ×
                                                </button>

                                                <img src={`/images/stitch/${el}.png`} className="w-full h-full object-contain" alt={el} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/* 단 추가 버튼 */}
                        <Button type="button" size="sm" onClick={handleAddRow}>
                            단 추가
                        </Button>
                    </div>
                </div>
            </div>

            <Button type="button" size="sm" onClick={handleAdd}>
                확인
            </Button>

            {showAlert && <Alert alertValue={alertValue} />}
        </div>
    );
}
