import { HexColorPicker } from 'react-colorful';

interface IColorProps {
    color: string;
    handleColorChange: (newColor: string) => void;
}

export default function ColorBox({ color, handleColorChange }: IColorProps) {
    return (
        <div>
            <HexColorPicker color={color} onChange={handleColorChange} />

            <div className="flex items-center justify-center gap-2 mt-5">
                <p>색 미리보기</p>
                <div style={{ backgroundColor: color ? color : '#FAF3BE' }} className="w-[50px] h-[50px] border-2 rounded "></div>
            </div>
        </div>
    );
}
