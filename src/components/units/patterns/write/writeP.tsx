import { CrochetSymbol } from '@/lib';

export type StitchKey = keyof typeof CrochetSymbol;
export type PatternRow = { round: number; stitches: StitchKey[] };

export default function WritePatternsDetail({ data }: { data: PatternRow[] }) {
    return (
        <div className="h-full bg-white p-4 rounded-xl overflow-y-auto border border-gray-100 shadow-sm">
            <div className="space-y-3">
                {data.map((row) => (
                    <div key={row.round} className="flex items-start gap-4">
                        <span className="shrink-0 px-3 py-1 rounded-full bg-[#8FD3C3]/20 text-[#2f7f6b] font-medium">{row.round}단</span>
                        <div className="flex flex-wrap gap-2">
                            {row.stitches.map((stitch, idx) => (
                                <span key={`${row.round}-${idx}-${stitch}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-800 shadow-sm" title={stitch}>
                                    {CrochetSymbol[stitch]}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
