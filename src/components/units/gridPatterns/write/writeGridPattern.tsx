import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ColorBox from '@/components/ui/colorBox';
import SelectCrochetSymbol from '@/components/ui/selectCrochetSymbol';
import { IPatternGridItem } from '@/types';

type IProps = {
    items: IPatternGridItem[][];
    setItems: Dispatch<SetStateAction<IPatternGridItem[][]>>;
};

export default function WriteGridPattern({ setItems }: IProps) {
    const [grid, setGrid] = useState<IPatternGridItem[][]>(
        // 기본 5x5
        Array(5)
            .fill(null)
            .map(() =>
                Array(5)
                    .fill(null)
                    .map(() => ({ color: '#ffffff', symbol: null }))
            )
    );
    // 색깔 선택
    const [color, setColor] = useState('#FAF3BE');
    // 기호 선택
    const [symbol, setSymbol] = useState('');
    // 현재 도구 모드
    const [tool, setTool] = useState<'paint' | 'stitch'>('paint');

    // 행 추가
    const addRow = () => {
        const newRow = Array(grid[0].length)
            .fill(null)
            .map(() => ({
                color: '#ffffff',
                symbol: null,
            }));
        setGrid([...grid, newRow]);
    };

    // 열 추가
    const addCol = () => {
        setGrid(grid.map((row) => [...row, { color: '#ffffff', symbol: null }]));
    };

    // 색상을 바꿀 때 실행할 함수
    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        setTool('paint'); // 색칠 모드
    };

    // 기호를 바꿀 때 실행할 함수
    const handleSymbolChange = (newSymbol: string) => {
        setSymbol(newSymbol);
        setTool('stitch'); // 기기호 모드
    };

    // 칸 클릭 시 상태 변경
    const handleCell = (rIdx: number, cIdx: number) => {
        const newGrid = [...grid];
        const targetCell = { ...newGrid[rIdx][cIdx] };

        if (tool === 'paint') {
            // 색칠 모드: 배경색 업데이트 (이미 있으면 하얀색)
            targetCell.color = targetCell.color === color ? '#ffffff' : color;
        } else {
            // 기호 모드: 기호 업데이트 (이미 있으면 제거)
            targetCell.symbol = targetCell.symbol === symbol ? null : symbol;
        }

        newGrid[rIdx][cIdx] = targetCell;
        setGrid(newGrid);
    };

    // 초기화
    const handleReset = () => {
        setGrid(
            Array(5)
                .fill(null)
                .map(() =>
                    Array(5)
                        .fill(null)
                        .map(() => ({ color: '#ffffff', symbol: null }))
                )
        );
    };
    console.log(grid);
    useEffect(() => {
        setItems(grid);
    }, [grid, setItems]);

    return (
        <div>
            {/* 컨트롤러 */}
            <div className="flex items-start justify-center gap-10 mb-5">
                <ColorBox color={color} handleColorChange={handleColorChange} />

                <div className="grid grid-cols-7  gap-2  p-2">
                    <SelectCrochetSymbol clickEvent={handleSymbolChange} />
                </div>
            </div>

            {/* 버튼들 */}
            <div className="text-right mb-5">
                <div className="flex items-center justify-center gap-5">
                    <button type="button" onClick={addRow}>
                        <img className="inline-block w-5 " src="/images/icons/icon_arrow_bot.png" alt="" />행 추가
                    </button>
                    <button type="button" onClick={addCol}>
                        <img className="inline-block w-5 " src="/images/icons/icon_arrow.png" alt="" />열 추가
                    </button>
                    <button type="button" onClick={handleReset}>
                        <img className="inline-block w-5" src="/images/icons/icon_reset.png" alt="" />
                        초기화
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto p-2">
                <div
                    className="grid justify-center"
                    style={{
                        gridTemplateColumns: `repeat(${grid[0].length}, 25px)`,
                    }}
                >
                    {grid.map((row, rIdx) =>
                        row.map((cell, cIdx) => (
                            <div
                                role="button"
                                className="flex items-center justify-center  w-[25px] h-[25px] border border-[#ccc] p-1 cursor-pointer"
                                key={`${rIdx}-${cIdx}`}
                                onClick={() => handleCell(rIdx, cIdx)}
                                style={{
                                    backgroundColor: cell.color,
                                }}
                            >
                                {cell.symbol && <img src={`/images/stitch/${cell.symbol}.png`} className="w-[80%] h-[80%] object-contain pointer-events-none drop-shadow-[0px_0px_2px_rgba(255,255,255,0.8)]" alt="stitch" />}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
