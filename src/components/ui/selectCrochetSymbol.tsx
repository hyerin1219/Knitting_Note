import { CROCHETSYMBOL } from '@/lib';

interface IProps {
    clickEvent: any;
}

export default function SelectCrochetSymbol({ clickEvent }: IProps) {
    return (
        <>
            {CROCHETSYMBOL.map((el) => (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        clickEvent(el.label);
                    }}
                    className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full group bg-[var(--color02)]"
                    key={el.label}
                >
                    <img className="w-full h-full object-contain" src={`/images/stitch/${el.label}.png`} alt="" />
                    <span className="absolute top-[110%] left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded z-[1]">
                        {el.value}
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-black " />
                    </span>
                </button>
            ))}
        </>
    );
}
