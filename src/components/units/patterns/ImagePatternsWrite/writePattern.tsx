import { useState } from 'react';
import { useRef } from 'react';
import { IPatternItem, IPatternUnit } from '@/types';
import { CrochetSymbol } from '@/lib';
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
    // 기술 횟수
    const [counts, seCounts] = useState<string>('1');
    // 기술
    const [skills, setSkills] = useState<string>('');
    // 입력된 최종 도안
    const [patterns, setPatterns] = useState<IPatternUnit[]>([]);

    const { showAlert, alertValue, triggerAlert } = useAlert();

    const inputRef = useRef<HTMLInputElement>(null);

    // 최종 도안 입력하기
    const handleAdd = () => {
        // const cleaned = patterns.trim();

        if (!rows) {
            triggerAlert('단을 입력해주세요.');
            return;
        }
        if (!patterns) {
            triggerAlert('도안을 추가해주세요.');
            return;
        }

        setItems((prev) => [
            ...prev,
            {
                id: `${Date.now()}`,
                rows,
                patterns,
            },
        ]);

        // 초기화
        setPatterns([]);
        seRows('');
    };

    // 삭제하기
    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // 스킬,횟수 추가하기
    const handleAppend = () => {
        if (!skills) {
            triggerAlert('기술을 입력해주세요.');
            return;
        }

        if (!counts) {
            triggerAlert('횟수를 입력하세요.');
            return;
        }

        const chunk = counts ? `${skills} ${counts}번` : skills;

        setPatterns((prev) => [
            ...prev,
            {
                skill: skills,
                count: Number(counts),
            },
        ]);

        // 입력 초기화
        setSkills('');
        seCounts('1');
    };

    const handleAddSymbol = (value: string) => {
        setSkills((prev) => prev + value);
    };

    return (
        <div className=" bg-white p-4 rounded-xl  border border-gray-100 shadow-sm">
            <div className="space-y-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {/* 코바늘 기술 예시 */}
                <div className="flex items-center  flex-wrap gap-2">
                    {CrochetSymbol.map((el) => (
                        <Button onClick={() => handleAddSymbol(el.value)} className="relative rounded-full group" key={el.label}>
                            <span> {el.value}</span>
                            <span className="absolute top-[110%] left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded z-[1]">
                                {el.label}
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-black " />
                            </span>
                        </Button>
                    ))}
                </div>

                {/* rows */}
                <div className="">
                    <Input type="text" value={rows} onChange={(e) => seRows(e.target.value)} placeholder="1"></Input> 단
                </div>

                {/* 기술 */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Input ref={inputRef} type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-40" placeholder="짧은뜨기"></Input>,{/*  */}
                        <Input type="number" value={counts} onChange={(e) => seCounts(e.target.value)} placeholder="1"></Input>번
                    </div>
                    <Button type="button" size="sm" onClick={handleAppend}>
                        추가
                    </Button>
                </div>

                {/* 도안 */}
                <div className="flex items-center gap-3">
                    {/* <Input value={patterns} onChange={(e) => setPatterns(e.target.value)} type="text" className="flex-1" placeholder=""></Input>
                    <Button type="button" size="sm" onClick={handleAdd}>
                        확인
                    </Button> */}

                    <div className="flex flex-wrap gap-2 flex-1">
                        {patterns.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-full text-sm">
                                <span>
                                    {p.skill} {p.count}번
                                </span>

                                <button onClick={() => setPatterns((prev) => prev.filter((_, i) => i !== idx))} className="ml-1 text-red-500">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

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
                                <p className="text-gray-600">{el.patterns.map((p) => `${p.skill} ${p.count}번`).join(', ')}</p>
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
