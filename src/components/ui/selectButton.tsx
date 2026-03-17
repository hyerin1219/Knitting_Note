type Option<T> = {
    value: T;
    label: string;
};

type Props<T> = {
    options: readonly Option<T>[];
    value: T | '';
    onChange: (value: T) => void;
};

export function SelectButtonGroup<T extends string>({ options, value, onChange }: Props<T>) {
    return (
        <div className="flex items-center gap-3 flex-wrap ">
            {options.map((el) => (
                <button
                    key={el.value}
                    type="button"
                    onClick={() => onChange(el.value)}
                    className={` px-3 py-1 rounded-full font-medium transition-all duration-200 text-lg
            ${value === el.value ? 'bg-[#8FD3C3] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-[#8FD3C3] hover:text-white'}
          `}
                >
                    {el.label}
                </button>
            ))}
        </div>
    );
}
